function MonoBarkodEtiketBasimi($scope, srv) 
{
    function InitGrid() 
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: [],
                allowColumnResizing: true,
                height: 490,
                width: "auto",
                columnWidth: 100,
                selection:
                {
                    mode: "single"
                },
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
            title: "Barkod Seçim",
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
                    $scope.TxtMiktar = "";
                    $scope.TxtBMiktar = "";
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
                        $scope.TxtMiktar = "";
                        $scope.TxtBMiktar = "";
                    }
                }
            }
        }
        $scope.BteParti =
        {
            title: "Parti Seçim",
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
        }
        $scope.BteStok =
        {
            title: "Stok Seçim",
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
                console.log($scope.BteParti)
            }
        }
        $scope.CmbEtiketTasarim1 =
        {
            datasource:
            {
                data: $scope.Param.Mono.BarkodBasimiEtiket
            },
            key: "special",
            value: "name",
            defaultVal: "1",
            selectionMode: "key",
            return: "1",
            onSelected: function (pSelected) {
                $scope.CmbEtiketList.return = pSelected
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
                    swal("Hatalı Giriş!", "Lütfen Barkod Giriniz",icon="error");
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
                if(TmpData.length > 0)
                {
                    $scope.BteBarkod.txt = TmpData[0].BARKOD
                    $scope.BteStok.txt = TmpData[0].STOKKODU
                    $scope.BteParti.txt = TmpData[0].PARTI
                    $scope.TxtLot = TmpData[0].LOT
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
                let TmpData = await srv.Execute(TmpQuery)
                if(TmpData.length > 0)
                {
                    $scope.BteBarkod.txt = TmpData[0].BARKOD
                    $scope.BteStok.txt = TmpData[0].STOKKODU
                    $scope.BteParti.txt = TmpData[0].PARTI
                    $scope.TxtLot = TmpData[0].LOT
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
                $scope.Param.MikroId,
                $scope.Param.MikroId,
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
                $scope.Param.MikroId,
                $scope.Param.MikroId,
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
    $scope.Init = function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.TxtLot = "";
        $scope.Skt = "";
        $scope.TxtMiktar = "";
        $scope.TxtBMiktar = "";
        InitGrid();
        InitObj();
    }    
}
