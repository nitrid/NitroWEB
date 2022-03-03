let fs = require('fs');
let _sql = require("./sqllib");
let lic = require('./license');
let devprint = new (require('../devprint/devprint'));
var sharp = require('sharp'); 
//var ftpClient = require('ftp-client');
const ftp = require("basic-ftp")

let msql;
let tsql;

let LicKullanici = 0;
let LicMenu = "";

// FTP CONNECT CONFIG
// config = {
//     host: 'ftp.tone.ist',
//     port: 21,
//     user: 'metin@teknoerp.com.tr',
//     password: 'Syncmaster750s'
// }
// options = {
//     logging: 'basic'
// }
// client = new ftpClient(config, options);

// BASIC FTP


function dbengine(config,io)
{    
    this.config = config;
    //BELİRLİ ZAMANLARDA LİSANS DURUMU KONTROL EDİLİYOR. 
    setInterval(function()
    {
        lic.LicenseCheck(function(data)
        {
            if(data != "")
            {
                if(typeof(data.result.err) == 'undefined')
                {
                    if(data.result.length == 0)
                    {
                        console.log("Lisansınız geçerli değil. lütfen ürün sorumlusuyla görüşünüz !");
                        io.close();
                    }
                }
                else
                {
                    console.log("Lisans server da data hatası !");
                    io.close();
                }
            }
            else
            {
                console.log("Lisans server'a ulaşılmıyor !");
                io.close();
            }
        })
    },3600000);
    //NORMAL LİSANS KONTROL İŞLEMİ
    lic.LicenseCheck(function(data)
    {
        if(data != "")
        {
            if(typeof(data.result.err) == 'undefined')
            {
                if(data.result.length > 0)
                {
                    LicKullanici = data.result[0].KULLANICISAYISI;
                    LicMenu = data.result[0].MENUDATA;
                }
                else
                {
                    console.log("Lisansınız geçerli değil. lütfen ürün sorumlusuyla görüşünüz !");
                    io.close();
                }
            }
            else
            {
                console.log("Lisans server da data hatası !");
                io.close();
            }
        }
        else
        {
            console.log("Lisans server'a ulaşılmıyor !");
            io.close();
        }
    });
    io.on('connection', function(socket) 
    {
        if(Object.keys(io.sockets.connected).length > LicKullanici)
        {
            socket.emit('MaxUserCounted');
        }
        else
        {
            socket.emit('MaxUserCounted',LicMenu);
        }

        socket.on('GetMenu',function(pParam,pFn)
        {
            if(Object.keys(io.sockets.connected).length > LicKullanici)
            {
                pFn('');
            }
            else
            {
                pFn(LicMenu);
            }
        });
        socket.on('TryConnection', function(name,fn)
        {
            msql = new _sql(config.server, '',config.uid,config.pwd,config.trustedConnection);
            msql.TryConnection(function(status)
            {
                if(status == true)
                    fn(true);
                else
                    fn(false);
            });
        });
        socket.on('QMikroDb',function(pQuery,fn) 
        {   
            try
            {
                let TmpDb = config.database;

                if (typeof(pQuery.db) != "undefined") 
                {
                    if(pQuery.db.indexOf("{M}.") > -1)
                        TmpDb = config.database + '_' + pQuery.db.replace('{M}.','');
                    else
                        TmpDb = pQuery.db;            
                }
                msql = new _sql(config.server,TmpDb,config.uid,config.pwd,config.trustedConnection);
                msql.QueryPromise(pQuery,function(data)
                {
                    let obj = JSON.parse(data);
                    socket.emit('RMikroDb',
                    {
                        tag : pQuery.tag, 
                        result : obj
                    });   
                    fn({tag : pQuery.tag,result : obj});
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error dbengine.js QMikroDb errCode : 107 - ' + err} 
                socket.emit('RMikroDb',
                {
                    tag : pQuery.tag, 
                    result : tmperr
                });  

                fn({tag : pQuery.tag,result : tmperr});
                console.log(tmperr);
            }
        });
        socket.on("QSMikroDb",function(pQuery)
        {
            try
            {
                msql = new _sql(config.server, pQuery.db,config.uid,config.pwd,config.trustedConnection);
                msql.QueryStream(pQuery,function(data)
                {
                    var obj = JSON.parse(data);
                    socket.emit('RSMikroDb',
                    {
                        tag : pQuery.tag, 
                        result : obj
                    });   
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error dbengine.js QSMikroDb errCode : 108 - ' + err} 
                socket.emit('RSMikroDb',
                {
                    tag : pQuery.tag, 
                    result : tmperr
                });  
                console.log(tmperr);
            }
        });
        socket.on('QToneDb',function(pQuery) 
        {   
            try
            {
                tsql = new _sql(config.server,config.tonedb,config.uid,config.pwd,config.trustedConnection);
                tsql.QueryPromise(pQuery,function(data)
                {
                    var obj = JSON.parse(data);
                    socket.emit('RToneDb',
                    {
                        tag : pQuery.tag, 
                        result : obj
                    });   
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error dbengine.js QToneDb errCode : 107 - ' + err} 
                socket.emit('RToneDb',
                {
                    tag : pQuery.tag, 
                    result : tmperr
                });  
                console.log(tmperr);
            }
        });
        socket.on("QSToneDb",function(pQuery)
        {
            try
            {
                tsql = new _sql(config.server,config.tonedb,config.uid,config.pwd,config.trustedConnection);
                tsql.QueryStream(pQuery,function(data)
                {
                    var obj = JSON.parse(data);
                    socket.emit('RSToneDb',
                    {
                        tag : pQuery.tag, 
                        result : obj
                    });   
                });
            }
            catch(err)
            {
                var tmperr = { err : 'Error dbengine.js QSToneDb errCode : 108 - ' + err} 
                socket.emit('RSToneDb',
                {
                    tag : pQuery.tag, 
                    result : tmperr
                });  
                console.log(tmperr);
            }
        });
        socket.on("ParamSave",function(pParam,fn)
        {
            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/.";
            }
            
            fs.writeFile(FilePath + pParam[1],'var Param = ' + JSON.stringify(pParam[0], null, '\t'),function(err)
            {
                if(typeof(err) != "undefined")
                    fn(true);
                else
                    fn(false);
            });
        });
        socket.on("JsonSave",function(pParam,fn)
        {
            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/.";
            }
            fs.writeFile(FilePath + pParam[1],'var ' + pParam[2]  + '= ' + JSON.stringify(pParam[0], null, '\t'),function(err)
            {
                if(typeof(err) != "undefined")
                    fn(true);
                else
                    fn(false);
            });
        });
        socket.on("DevPrint",function(pParam,fn)
        {
            console.log(pParam)
            devprint.Print(pParam,function(pData)
            {
                fn(pData)
            });
        });
        socket.on("DesingList",function(pParam,fn)
        {
            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/.";
            }
            fs.readdir(FilePath + "./printdesing/Desing/", (err, files) => 
            {
                fn(files)
            });
        });
        socket.on("PDFUpload",function(pParam,fn)
        {
            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/../";
            }
            let Img = pParam['Img' + 1]

            let data = Img.replace(/^data:application\/\w+;base64,/, "");
            let buf = Buffer.from(data, 'base64');
            fs.writeFile(FilePath + "upload/" + pParam.Code+".pdf", buf,function(err, result) 
            {
                if(err)
                {
                    console.log('error', err);
                }
                else
                {
                    fn(true)
                    sharp.cache(false);
                    client.connect(function () {
                        client.upload([FilePath +'upload/**'], '/', {
                            baseDir: 'uploadPDF',
                            overwrite: 'older'
                        }, function (result) {
                            console.log(result);
                        });
                    });
                }
                   
                   
            });
           
        });
        socket.on("ImgUpload",function(pParam,fn)
        {
            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/../";
            }
            if(typeof pParam['Img' + 1] != 'undefined')
            {
                let Img = pParam['Img'  + 1]
                let data = Img.replace(/^data:image\/\w+;base64,/, "");
                let buf = Buffer.from(data, 'base64');
                let inputFile  = FilePath + "../NitrogenB2B/www/upload/product/picture/" + pParam.Code + "-"  + pParam.Short + ".jpg";
                let outputFile = FilePath + "../NitrogenB2B/www/upload/product/picture/thumb/" + pParam.Code + "-"  + pParam.Short + ".jpg";
                fs.writeFile(FilePath + "../NitrogenB2B/www/upload/product/picture/" + pParam.Code + "-"  + pParam.Short + ".jpg", buf,async function(err, result) 
                {
                    if(err)
                        console.log('error', err);
                    else
                    {
                        fn(true)
                        sharp.cache(false);
                        sharp(inputFile).resize({ height: 323, width: 215, fit: 'contain' }).toFile(outputFile)
                        .then(function(newFileInfo) {
                            //console.log(newFileInfo);
                        })
                        .catch(function(err) 
                        {
                            console.log(err);
                        });
                        // const clients = new ftp.Client()

                        // clients.ftp.verbose = true
                        
                        // try 
                        // {
                        //     await clients.access({
                        //         host: "ftp.tone.ist",
                        //         user: "metin@teknoerp.com.tr",
                        //         password: "Syncmaster750s",
                        //     })
                        //     await clients.uploadFrom(FilePath + "www/upload/product/" + pParam.Code + "-"  + pParam.Short + ".jpg", "picture/" + pParam.Code + "-"  + pParam.Short + ".jpg")
                        //     clients.close()
                        //     fs.unlinkSync(inputFile);
                        // }
                        // catch(err) 
                        // {
                        //     console.log(err)
                        // }
                    }
                });
            }
        });
        socket.on("ImgDelete",async function(pParam,fn)
        {
            const clients = new ftp.Client()

            let FilePath = "";
            if(typeof process.env.APP_DIR_PATH != 'undefined')
            {
                FilePath = process.env.APP_DIR_PATH + "/../";
            }
            let DeleteFile  = FilePath + "../NitrogenB2B/www/upload/product/picture/" +pParam+ ".jpg";
            let DeleteFileThumb  = FilePath + "../NitrogenB2B/www/upload/product/picture/thumb/" +pParam+ ".jpg";

            // clients.ftp.verbose = true
            // try {
            //     await clients.access({
            //         host: "ftp.tone.ist",
            //         user: "metin@teknoerp.com.tr",
            //         password: "Syncmaster750s",
            //     })
            //     await clients.remove("picture/"+pParam+ ".jpg")
            // }
            // catch(err) {
            //     console.log(err)
            // }
            // clients.close()
            fs.unlinkSync(DeleteFile);
            fs.unlinkSync(DeleteFileThumb);
            
        });
    });
}



module.exports = dbengine;