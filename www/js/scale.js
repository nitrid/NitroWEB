var Scale = 
(
    function()
    {
        if(typeof require == 'undefined')
        {
            return Scale;
        }
        const SerialPort = require('serialport');        
        function Scale()
        {
           
        }        
        function _Send(pPort)
        {
            return new Promise(resolve =>
            {
                let TmpData = "";
                let port = new SerialPort(pPort,{baudRate:9600,dataBits:8,parity:'none',stopBits:1,xon:true,xoff:true});
                //TERAZİYE İSTEK GÖNDERİLİYOR.
                port.on('data',line =>
                {
                    TmpData +=  line.toString('utf8');

                    if(TmpData.indexOf('kg') > -1)
                    {
                        console.log(TmpData)
                        TmpData = Number(TmpData.substring(TmpData.indexOf('kg') - 8, TmpData.indexOf('kg')))
                        resolve(TmpData);
                        port.close();
                    }
                   
                   
                });

                return port.on("close", resolve)
            });
        }
        
        Scale.prototype.Send = _Send;
        Scale.prototype.Start = function (pPort,pCallback)
        {
            if(typeof Port == 'undefined')
            {
                Port = new SerialPort(pPort,{baudRate:9600,dataBits:8,parity:'none',stopBits:1,xon:true,xoff:true});
            }

            let TmpData = "";
            //TERAZİYE İSTEK GÖNDERİLİYOR.
            Port.on('data',line =>
            {
                TmpData += line.toString('utf8');
                console.log(TmpData)
                if(line.length == 2 && line[0] == 13 && line[1] == 10)
                {
                    if(TmpData.indexOf('IRLIK') > -1)
                    {
                        TmpData = Number(TmpData.substring(TmpData.indexOf('IRLIK') + 11, TmpData.indexOf('IRLIK') + 19));
                        if(!isNaN(TmpData))
                        {
                            pCallback(TmpData);
                        }
                        else
                        {
                            pCallback(0);
                        }
                        TmpData = "";                       
                    }
                }
            });
        }
        return Scale;
    }
)();