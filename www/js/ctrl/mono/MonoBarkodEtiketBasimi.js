function MonoBarkodEtiketBasimi($scope, srv, $rootScope) 
{
    function InitGrid(pData) 
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 490,
                width: "100%",
                columnWidth: 100,
                selection:
                {
                    mode: "single"
                },
                columns :
                [
                    {
                        dataField: "BARKOD",
                        width: 200
                    }, 
                    {
                        dataField: "KODU",
                        width: 200
                    }, 
                    {
                        dataField: "ADI",
                        width: 500
                    }, 
                    {
                        dataField: "DESI",
                        width: 100
                    }, 
                    {
                        dataField: "AGIRLIK",
                        width: 100
                    }, 
                    {
                        dataField: "PARTI",
                        width: 100
                    }, 
                    {
                        dataField: "LOT",
                        width: 100
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 75
                    }, 
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging:
                {
                    pageSize: 10
                },
                filterRow:
                {
                    visible: true,
                    applyFilter: "auto"
                },
                headerFilter:
                {
                    visible: true
                },
                onSelectionChanged: function (selectedItems) {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
    function InitObj() 
    {
        $scope.BteBarkod =
        {
            title: "Barkod Se??im",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query:  "SELECT " +
                        "bar_kodu As BARKOD, " +
                        "bar_stokkodu AS KODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS ADI," +
                        "bar_partikodu AS PARTI, " +
                        "bar_lotno As LOT " +
                        "FROM BARKOD_TANIMLARI"
            },
            selection: "BARKOD",
            columns:
            [
                {
                    dataField: "BARKOD",
                    width: 200
                },
                {
                    dataField: "KODU",
                    width: 200
                },
                {
                    dataField: "ADI",
                    width: 500
                },
                {
                    dataField: "PARTI",
                    width: 100
                },
                {
                    dataField: "LOT",
                    width: 500
                },
            ],
            onSelected : async function(pData)
            {
                if(await BarkodGetir(pData.KODU,pData.PARTI,pData.LOT) == false)
                {
                    $scope.BteBarkod.txt = "";
                    $scope.BteParti.txt = "";
                    $scope.BteStok.txt = "";
                    $scope.TxtLot = "";
                    $scope.TxtMiktar = 0;
                    $scope.TxtBMiktar = 1;
                    $scope.StokAdi = "";
                    document.getElementById("Skt").value = "";
                } 
            },
            onKeyPress : async function(pKey)
            {
                if(pKey.which == 13)
                {
                    if(await BarkodGetir($scope.BteBarkod.txt) == false)
                    {
                        $scope.BteBarkod.txt = "";
                        $scope.BteParti.txt = "";
                        $scope.BteStok.txt = "";
                        $scope.TxtLot = "";
                        $scope.TxtMiktar = 0;
                        $scope.TxtBMiktar = 1;
                        $scope.StokAdi = "";
                        document.getElementById("Skt").value = "";
                    }
                }
            }
        }
        $scope.BteParti =
        {
            title: "Parti Se??im",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu",
                param: ['pl_stokkodu:string|25'],
                value: []
            },
            selection: "PARTI",
            columns:
            [
                {
                    dataField: "PARTI",
                    width: 200
                },
                {
                    dataField: "LOT",
                    width: 200
                },
            ],
            onSelected : async function(pData)
            {
                $scope.TxtLot = pData.LOT;
                if($scope.BteParti.txt != "" && $scope.TxtLot != "")
                {
                    await PartiLotSktGetir($scope.BteStok.txt,$scope.BteParti.txt,$scope.TxtLot)
                }
            },
        }
        $scope.BteStok =
        {
            title: "Stok Se??im",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT " +
                    "sto_kod AS KODU, " +
                    "sto_isim AS ADI " +
                    "FROM STOKLAR "
            },
            selection: "KODU",
            columns:
            [
                {
                    dataField: "KODU",
                    width: 200
                },
                {
                    dataField: "ADI",
                    width: 200
                },
            ],
            onSelected : async function(pData)
            {
                $scope.BteParti.datasource.value.push(pData.KODU)
                $scope.StokAdi = pData.ADI;
            }
        }
        $scope.CmbEtiketTasarim =
        {
            datasource:
            {
                data: [{name: "Barkod Basimi Etiket - 1", special: $rootScope.GeneralParamList.BarkodBasimiEtiket}] 
            },
            key: "special",
            value: "name",
            defaultVal: $rootScope.GeneralParamList.BarkodBasimiEtiket,
            selectionMode: "key",
            return: $rootScope.GeneralParamList.BarkodBasimiEtiket,
            onSelected: function (pSelected) 
            {
                $scope.CmbEtiketTasarim.return = pSelected
            }
        }
    }
    function BarkodGetir(pBarkod, pParti, pLot)
    {
        return new Promise(async resolve => 
        {
            if(typeof pParti == 'undefined')
            {
                if(pBarkod == "")
                {
                    swal("Hatal?? Giri??!", "L??tfen Barkod Giriniz",icon="error");
                    resolve(false);
                    return;
                }
                if(pBarkod.substring(0,2) == "27")
                {
                    if(pBarkod.length < 7)
                    {
                        resolve(false);
                        return;
                    }
                    pBarkod = pBarkod.txt.substring(0,7)
                }
    
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT " +
                            "bar_kodu AS BARKOD, " +
                            "ISNULL((SELECT TOP 1 URN.bar_kodu FROM BARKOD_TANIMLARI AS URN WHERE URN.bar_stokkodu = BARKOD_TANIMLARI.bar_stokkodu AND URN.bar_birimpntr = 3 AND URN.bar_partikodu = '' AND URN.bar_lotno = 0),'') AS URNBARKOD, " +
                            "bar_stokkodu AS STOKKODU, " +
                            "ISNULL((SELECT TOP 1 sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS STOKADI, " +
                            "bar_partikodu AS PARTI, " +
                            "bar_lotno AS LOT, " +
                            "ISNULL((SELECT STOK_ISIM__TURKCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADITR, " +
                            "ISNULL((SELECT STOK_ISIM__INGILIZCE FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIENG, " +
                            "ISNULL((SELECT STOK_ISIM__RUSCA_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIRU, " +
                            "ISNULL((SELECT STOK_ISIM__RUMENCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIRO, " +
                            "ISNULL((SELECT FLOOR((sto_birim3_en * sto_birim3_boy * sto_birim3_yukseklik) / 3000) FROM STOKLAR WHERE sto_kod = bar_stokkodu),1) AS DESI, " +
                            "ISNULL((SELECT sto_birim3_agirlik FROM STOKLAR WHERE sto_kod = bar_stokkodu),1) AS AGIRLIK, " +
                            "ISNULL((SELECT TOP 1 pl_son_kullanim_tar FROM PARTILOT WHERE pl_stokkodu = bar_stokkodu AND pl_partikodu = bar_partikodu AND pl_lotno = bar_lotno),'19000101') AS SKT " +
                            "FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu",
                    param : ['bar_kodu:string|50'],
                    value : [pBarkod]
                }

                let TmpData = await srv.Execute(TmpQuery)
                $scope.Data.BARKODLIST = TmpData;

                if(TmpData.length > 0)
                {
                    $scope.BteBarkod.txt = TmpData[0].BARKOD
                    $scope.BteStok.txt = TmpData[0].STOKKODU
                    $scope.BteParti.txt = TmpData[0].PARTI
                    $scope.TxtLot = TmpData[0].LOT
                    $scope.StokAdi = TmpData[0].STOKADI
                    document.getElementById("Skt").value = moment(TmpData[0].SKT).format("YYYY-MM-DD");

                    resolve(true)
                    return;
                }
                resolve(false)
                return;
            }
            else
            {
                let TmpQuery = 
                {
                    db: "{M}." + $scope.Firma,
                    query : "SELECT " +
                            "bar_kodu AS BARKOD, " +
                            "ISNULL((SELECT TOP 1 URN.bar_kodu FROM BARKOD_TANIMLARI AS URN WHERE URN.bar_stokkodu = BARKOD_TANIMLARI.bar_stokkodu AND URN.bar_birimpntr = 3 AND URN.bar_partikodu = '' AND URN.bar_lotno = 0),'') AS URNBARKOD, " +
                            "bar_stokkodu AS STOKKODU, " +
                            "ISNULL((SELECT TOP 1 sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS STOKADI, " +
                            "bar_partikodu AS PARTI, " +
                            "bar_lotno AS LOT, " +
                            "ISNULL((SELECT STOK_ISIM__TURKCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADITR, " +
                            "ISNULL((SELECT STOK_ISIM__INGILIZCE FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIENG, " +
                            "ISNULL((SELECT STOK_ISIM__RUSCA_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIRU, " +
                            "ISNULL((SELECT STOK_ISIM__RUMENCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = bar_stokkodu)),'') AS ADIRO, " +
                            "ISNULL((SELECT FLOOR((sto_birim3_en * sto_birim3_boy * sto_birim3_yukseklik) / 3000) FROM STOKLAR WHERE sto_kod = bar_stokkodu),1) AS DESI, " +
                            "ISNULL((SELECT sto_birim3_agirlik FROM STOKLAR WHERE sto_kod = bar_stokkodu),1) AS AGIRLIK, " +
                            "ISNULL((SELECT TOP 1 pl_son_kullanim_tar FROM PARTILOT WHERE pl_stokkodu = bar_stokkodu AND pl_partikodu = bar_partikodu AND pl_lotno = bar_lotno),'19000101') AS SKT " +
                            "FROM BARKOD_TANIMLARI WHERE bar_stokkodu = @bar_stokkodu AND ((bar_partikodu = @bar_partikodu) OR (@bar_partikodu = '')) AND bar_lotno = @bar_lotno",
                    param : ['bar_stokkodu:string|50','bar_partikodu:string|50','bar_lotno:string|50'],
                    value : [pBarkod,pParti,pLot]
                }

                let TmpData = await srv.Execute(TmpQuery);
                $scope.Data.BARKODLIST = TmpData;

                if(TmpData.length > 0)
                {                    
                    $scope.BteBarkod.txt = TmpData[0].BARKOD
                    $scope.BteStok.txt = TmpData[0].STOKKODU
                    $scope.BteParti.txt = TmpData[0].PARTI
                    $scope.TxtLot = TmpData[0].LOT
                    $scope.StokAdi = TmpData[0].STOKADI
                    document.getElementById("Skt").value = moment(TmpData[0].SKT).format("YYYY-MM-DD");

                    resolve(true)
                    return;
                }
                resolve(false)
                return;                
            }
            
        });

    }
    async function PartiLotSktGetir(pStok, pParti, pLot)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT pl_son_kullanim_tar AS SKT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu AND pl_partikodu = @pl_partikodu AND pl_lotno = @pl_lotno",
                param : ['pl_stokkodu:string|50','pl_partikodu:string|50','pl_lotno:string|50'],
                value : [pStok,pParti,pLot]
            }

            let TmpData = await srv.Execute(TmpQuery)
            
            if(TmpData.length > 0)
            {
                $scope.Skt = TmpData[0].SKT
    
                resolve(true)
                return;
            }
            resolve(false)
            return;
        });
    }
    async function MaxLot(pParti)
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT ISNULL(MAX(pl_lotno),0) AS LOT FROM PARTILOT WHERE pl_partikodu = @pl_partikodu",
            param : ['pl_partikodu:string|50'],
            value : [pParti]
        }
        let TmpData = await srv.Execute(TmpQuery)
        if(TmpData.length > 0)
        {
            $scope.TxtLot = TmpData[0].LOT + 1
            resolve(true)
            return;
        }
        else
        {
            $scope.TxtLot = 1;
        }
        resolve(false)
        return;
    }
    function BarkodOlustur(pBarkod,pStokKodu,pParti,pLot)
    {
        return new Promise(async resolve => 
        {
            if(await GetBarkod(pBarkod))
            {
                resolve(true);
                return;
            }

            let TmpParam =
            [
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                pBarkod,
                pStokKodu,
                pParti,
                pLot,
                5,
                1,
                0,
                3
            ]

            let TmpResult = await srv.Execute($scope.Firma,'BarkodInsert',TmpParam);

            if(typeof TmpResult != 'undefined')
            {
                resolve(true);
                return
            }
            else
            {
                resolve(false);
                return
            }
        });
    }
    function GetBarkod(pBarkod)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT * FROM BARKOD_TANIMLARI WHERE bar_kodu = @bar_kodu",
                param : ['bar_kodu:string|50'],
                value : [pBarkod]
            }
            let TmpData = await srv.Execute(TmpQuery)
            if(TmpData.length > 0)
            {
                $scope.Data.BARKODLIST = TmpData;
                resolve(true);
                return;
            }

            $scope.Data.BARKODLIST = [];
            resolve(false)
            return;
        });
    }
    function PartiLotOlustur(pParti,pLot,pStok)
    {
        return new Promise(async resolve => 
        {
            if(await GetPartiLot(pStok,pParti,pLot))
            {
                resolve(true)
                return
            }
            
            let TmpParam =
            [
                $rootScope.GeneralParamList.MikroId,
                $rootScope.GeneralParamList.MikroId,
                pParti,
                pLot,
                pStok,
                moment(new Date()).format("DD.MM.YYYY")
            ]
            let TmpResult = await srv.Execute($scope.Firma,'PartiLotInsert',TmpParam);
            if(typeof TmpResult != 'undefined')
            {
                resolve(true);
                return
            }
            else
            {
                resolve(false);
                return
            }
            
        });
    }
    function GetPartiLot(pStokKodu,pParti,pLot)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT * FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu AND pl_partikodu = @pl_partikodu AND pl_lotno = @pl_lotno",
                param : ['pl_stokkodu:string|25','pl_partikodu:string|25','pl_lotno:int'],
                value : [pStokKodu,pParti,pLot]
            }
            let TmpData = await srv.Execute(TmpQuery)
            if(TmpData.length > 0)
            {
                resolve(true);
                return;
            }

            resolve(false)
            return;
        });
    }
    async function EtiketInsert(pMiktar,pStokkodu,pBarkod)
    {
        let InsertData = 
        [
            1,                               //CREATE_USER
            1,                               //LASTUP_USER
            "1",     //SPECIAL1
            $rootScope.GeneralParamList.BarkodEtiketSeri ,//SERI
            $scope.EtkSira,                    //SIRA
            '',                              //A??IKLAMA
            '',                              //BELGENO
            0,                               //ET??KETT??P
            0,                               //BAS??MT??P??
            (pMiktar <= 32000 ? pMiktar : 32000),                         //BAS??MADET
            1,                               //DEPONO
            pStokkodu,                       //STOKKODU
            pMiktar,                               //RENKKODU
            1,                               //BEDENKODU
            pBarkod,                         //BARKOD
            $scope.TxtBMiktar                //BASILACAKMIKTAR
        ]
        let InsertControl = await srv.Execute($scope.Firma,'EtiketInsert',InsertData);


        if(InsertControl == "")
        {
            swal("????lem Ba??ar??l??!", "Etiket Yazd??rma ????lemi Ger??ekle??tirildi.",icon="success");
        }
        else
        {
            swal("????lem Ba??ar??s??z!", "Etiket Yazd??rma ????leminde Hata Olu??tu.",icon="error");
        }
    }
    async function MaxEtiketSira(pSeri)
    {
        return new Promise(async resolve => 
        {
            resolve((await srv.Execute($scope.Firma,'MaxEtiketSira',[pSeri]))[0].MAXEVRSIRA)
        })
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "BARKOD ET??KET BASIM"
        $scope.TxtLot = "";
        $scope.TxtMiktar = 0;
        $scope.TxtBMiktar = 1;
        $scope.StokAdi = "";
        $scope.BteBarkodText = ""
        document.getElementById("Skt").value = "";

        $scope.Data = {};
        $scope.Data.DATA = [];
        $scope.Data.BARKODLIST = [];
        console.log($rootScope.GeneralParamList.MonoBarkodEtiketBasimi)
        if($rootScope.GeneralParamList.MonoBarkodEtiketBasimi != "true")
        {
            swal("Dikkat", "Bu Sayfaya Giri?? Yetkiniz Bulunmamaktad??r..",icon="warning");
            var url = "index.html";
            window.location.href = url;
            event.preventDefault();        
        }

        $scope.EtkSira = await MaxEtiketSira($rootScope.GeneralParamList.BarkodEtiketSeri)

        InitGrid([]);
        InitObj();
    }   
    $scope.BtnEkle = async function()
    {
        let TmpBarkod = ""
        if ($scope.BteStok.txt == "")
        {
            swal("Dikkat", "L??tfen stok kodu se??meden ge??meyin.",icon="warning");
            return;
        }
        if($scope.BteParti.txt == '')
        {
            await $scope.SeriBarkodOlustur()
            
            let TmpInsertData =
            [
                'BEB',
                1,
                $scope.SeriBarkod,
                $scope.BteStok.txt,
                $scope.TxtMiktar,
                '1'
            ]
           
            let TmpResult = await srv.Execute($scope.Firma,'SeriNoInsert',TmpInsertData);
            console.log(TmpResult)  
            $scope.BteBarkodText = $scope.SeriBarkod
        }
        else
        {
            $scope.BteBarkodText =  $scope.BteBarkod.txt 
        }

        if ($scope.TxtLot == "")
        {
            if($scope.BteParti.txt != "")
            {
                let TmpLot = MaxLot($scope.BteParti.txt)
                if(await PartiLotOlustur($scope.BteParti.txt,$scope.TxtLot,$scope.BteStok.txt,moment(document.getElementById("Tarih").value).format("DD.MM.YYYY")))
                {
                    $scope.TxtLot = TmpLot;
                    if($scope.BteBarkod.txt == "")
                    {
                        TmpBarkod = $scope.BteParti.txt.padStart(10, "0") + TmpLot.ToString().padStart(6, "0");
                        if(await BarkodOlustur(TmpBarkod,$scope.BteStok.txt,$scope.BteParti.txt,$scope.TxtLot))
                        {
                            $scope.BteBarkodText = TmpBarkod;
                        }
                    }
                    else
                    
                    swal("Ba??ar??l??", "Parti lot Ve Barkod Olu??turuldu.",icon="success");
                }
            }
        }
        else
        {
            if(await BarkodGetir($scope.BteStok.txt,$scope.BteParti.txt,$scope.TxtLot) == false)
            {
                swal("Dikkat", "Getirmeye ??al????t??????n??z parti lot barkodu bulunamam????t??r!",icon="warning");
            }
        }

        let TmpData = {};
        TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
        TmpData.BARKOD = $scope.BteBarkodText;
        TmpData.PARTIBARKOD = $scope.BteBarkodText;
        TmpData.URNBARKOD = $scope.Data.BARKODLIST[0].URNBARKOD;
        TmpData.KODU = $scope.BteStok.txt;
        TmpData.ADI = $scope.StokAdi;
        TmpData.ADITR = $scope.Data.BARKODLIST[0].ADITR;
        TmpData.ADIENG = $scope.Data.BARKODLIST[0].ADIENG;
        TmpData.ADIRU = $scope.Data.BARKODLIST[0].ADIRU;
        TmpData.ADIRO = $scope.Data.BARKODLIST[0].ADIRO;
        TmpData.DESI = $scope.Data.BARKODLIST[0].DESI;
        TmpData.AGIRLIK = $scope.Data.BARKODLIST[0].AGIRLIK;
        TmpData.ISEMRI = "";
        TmpData.DARA = 0;
        TmpData.PARTI = $scope.BteParti.txt;
        TmpData.LOT = $scope.TxtLot;
        TmpData.SKT = moment(document.getElementById("Skt").value).format("DD.MM.YYYY");
        TmpData.MIKTAR = $scope.TxtMiktar;

        $scope.Data.DATA.push(TmpData);  

        InitGrid($scope.Data.DATA)
    } 
    $scope.BtnBarkodBas = async function()
    {
        if($scope.Data.DATA.length > 0)
        {
            for (let i = 0; i < $scope.Data.DATA.length; i++) 
            {
                await EtiketInsert($scope.Data.DATA[i].MIKTAR,$scope.Data.DATA[i].KODU,$scope.Data.DATA[i].PARTIBARKOD);  
            }
        }
        else
        {
            swal("Hatal?? ????lem!", "L??tfen Stok Se??imi Yap??n??z",icon="error");
        }
    }
    $scope.SeriBarkodOlustur = async function()
    {
        $scope.SeriBarkod = ''
        let length = 7;
        let chars = '0123456789'.split('');
        let AutoStr = "";
        
        if (! length) 
        {
            length = Math.floor(Math.random() * chars.length);
        }
        for (let i = 0; i < length; i++) 
        {
            AutoStr += chars[Math.floor(Math.random() * chars.length)];
        }
        $scope.Tarih = moment(new Date()).format("YYYYMMGG")
        $scope.SeriBarkod = $scope.Tarih.padStart(8, "0")   + AutoStr
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT chz_serino FROM STOK_SERINO_TANIMLARI WHERE chz_serino = @chz_serino ",
            param : ['chz_serino:string|50'],
            value : [$scope.SeriBarkod]
        }
        let SeriKontrol = await srv.Execute(TmpQuery)
        if(SeriKontrol.length > 0)
         {
            $scope.SeriBarkodOlustur()
            console.log(11123)
         }
    }
}
