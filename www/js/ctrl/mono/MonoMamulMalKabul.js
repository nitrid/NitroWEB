function MonoMamulMalKabul($scope,srv)
{
    function InitGrd(pData)
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
                        title : "TİP",
                        dataField: "TIP",
                        width: 100
                    }, 
                    {
                        dataField: "KODU",
                        width: 200
                    }, 
                    {
                        dataField: "ADI",
                        width: 400
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 100
                    }, 
                    {
                        dataField: "BARKOD",
                        width: 150
                    }, 
                    {
                        dataField: "URETREC",
                        width: 100
                    }, 
                    {
                        dataField: "PARTI",
                        width: 100
                    }, 
                    {
                        dataField: "LOT",
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
                onSelectionChanged: function (selectedItems) 
                {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
    function InitObj()
    {
        $scope.BteIsEmri = 
        {
            title : "İş Emri Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD, " +
                        "is_Kod AS KODU,is_Ismi AS ADI, " +
                        "ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'')),'') AS STOKADI " +
                        "FROM ISEMIRLERI WHERE is_EmriDurumu = 1 AND is_Kod LIKE '%AYD-%'"
            },
            selection : "KODU",
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
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 100
                }, 
                {
                    title: "STOK ADI",
                    dataField: "STOKADI",
                    width: 500
                }, 
            ],
            onSelected : async function(pData)
            {
                if(typeof pData != 'undefined')
                {                    
                    $scope.Data.UMP = await UretimMalzemePlanGetir(pData.KODU);
                    $scope.Data.URP = await UretimRotaPlanGetir(pData.KODU);
                    
                    if($scope.Data.UMP.length > 0)
                    {
                        let TmpDr = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
                        if(TmpDr.length > 0)
                        {
                            $scope.LblUrun = TmpDr[0].KODU
                            $scope.BteParti.datasource.value.push($scope.LblUrun)     
                        }
                    }
                }
            }
        }
        $scope.BteParti = 
        {
            title : "Parti Seçim",
            txt : moment(new Date()).format("YYYYMMGG"),
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu",
                param : ['pl_stokkodu:string|25'],
                value : []
            },
            selection : "PARTI",
            columns :
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
            onClick : function(pCallback)
            {                                
                if($scope.BteIsEmri.txt == "")
                {
                    swal("Dikkat", "Lütfen İş Emri Seçiniz",icon="warning");
                    pCallback(false)
                }
                else
                {
                    pCallback(true)
                }
            }
        }        
    }
    function UretimMalzemePlanGetir(pIsEmri)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = upl_kodu AND bar_birimpntr = 1),'') AS BARKOD, " +
                        "upl_kodu AS KODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = upl_kodu),'') AS ADI, " +
                        "ISNULL((SELECT STOK_ISIM__TURKCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADITR, " +
                        "ISNULL((SELECT STOK_ISIM__INGILIZCE FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIENG, " +
                        "ISNULL((SELECT STOK_ISIM__RUSCA_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIRU, " +
                        "ISNULL((SELECT STOK_ISIM__RUMENCE_ FROM STOKLAR_USER WHERE Record_uid = (SELECT TOP 1 sto_Guid FROM STOKLAR WHERE sto_kod = upl_kodu)),'') AS ADIRO, " +
                        "ISNULL((SELECT FLOOR((sto_birim3_en * sto_birim3_boy * sto_birim3_yukseklik) / 3000) FROM STOKLAR WHERE sto_kod = upl_kodu),1) AS DESI, " +
                        "ISNULL((SELECT sto_birim3_agirlik FROM STOKLAR WHERE sto_kod = upl_kodu),1) AS AGIRLIK, " +
                        "{0} AS KATSAYI, " +
                        "upl_isemri AS ISEMRI, " +
                        "CASE WHEN upl_uretim_tuket = 1 THEN 'ÜRETİM' ELSE 'TÜKETİM' END AS TIP, " +
                        "upl_uretim_tuket AS URETTUKET, " +
                        "upl_depno AS DEPO, " +
                        "dbo.fn_DepodakiMiktar(upl_kodu,upl_depno,GETDATE()) AS DEPOMIKTAR, " +
                        "upl_miktar AS PMIKTAR, " +
                        "upl_miktar / ISNULL((SELECT TOP 1 upl_miktar FROM URETIM_MALZEME_PLANLAMA AS UMP2 WHERE UMP2.upl_isemri = UMP1.upl_isemri AND UMP2.upl_uretim_tuket = 1 ORDER BY upl_satirno ASC),0) AS BMIKTAR " +
                        "FROM URETIM_MALZEME_PLANLAMA AS UMP1 WHERE upl_isemri = @upl_isemri",
                param : ['upl_isemri:string|50'],
                value : [pIsEmri]
            }

            if($scope.TxtMiktar == 0)
            {
                TmpQuery.query = TmpQuery.query.replace('{0}', 'ISNULL((SELECT sto_birim3_katsayi * -1 FROM STOKLAR WHERE sto_kod = upl_kodu),1)')
            }
            else
            {
                TmpQuery.query = TmpQuery.query.replace('{0}', $scope.TxtMiktar)
            }                

            let TmpData = await srv.Execute(TmpQuery)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }

            resolve(TmpData);
            return;
        });
    }
    function UretimRotaPlanGetir(pIsEmri)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_Guid AS REC, " +
                        "RtP_IsEmriKodu AS ISEMRI, " +
                        "RtP_OperasyonSafhaNo AS SAFHANO, " +
                        "RtP_OperasyonKodu AS OPERASYONKODU, " +
                        "RtP_PlanlananIsMerkezi AS ISMERKEZI, " +
                        "RtP_UrunKodu AS URUNKODU, " +
                        "CAST((RtP_PlanlananSure / RtP_PlanlananMiktar) AS int) AS SURE " +
                        "FROM URETIM_ROTA_PLANLARI WHERE RtP_IsEmriKodu = @RtP_IsEmriKodu",
                param : ['RtP_IsEmriKodu:string|50'],
                value : [pIsEmri]
            }

            let TmpData = await srv.Execute(TmpQuery)

            if (typeof TmpData == 'undefined')
            {
                TmpData = []
            }

            resolve(TmpData);
            return;
        });
    }
    function MiktarKontrol()
    {
        if($scope.Data.UMP.length > 0)
        {
            let TmpDr = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
            if(TmpDr.length > 0)
            {
                if(TmpDr[0].PMIKTAR <= srv.SumColumn($scope.Data.DATA,"MIKTAR","URETTUKET = 1"))
                {
                    return true;
                }
            }
        }
        return false;
    }
    function MaxLot()
    {
        return new Promise(async resolve => 
        {
            let TmpData = await srv.Execute($scope.Firma,'MaxPartiLot',[$scope.BteParti.txt])
            if(TmpData.length > 0)
            {
                resolve(TmpData[0].LOT)
            }
            resolve(1)
            return
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
                resolve(true);
                return;
            }
            resolve(false)
            return;
        });
    }
    function Ekle(pBarkod,pParti,pLot)
    {
        let TmpDr = $scope.Data.DATA.filter(x => x.PARTIBARKOD == pBarkod);
        if(TmpDr.length > 0)
        {
            swal("Dikkat", "Barkod daha önce eklenmiş !",icon="warning");
            return;
        }

        let TmpDrUret = $scope.Data.UMP.filter(x => x.URETTUKET == 1);
        let TmpUretRec = 0;
        let TmpDrRota = [];
        
        if(TmpDrUret.length > 0)
        {
            TmpDrRota = $scope.Data.UMP.filter(x => x.URUNKODU == TmpDrUret[0].KODU);
        }

        for(let i = 0;i < $scope.Data.UMP.length;i++)
        {
            let TmpRec = 0;
            if($scope.Data.DATA.length > 0)
            {
                TmpRec = srv.Max($scope.Data.DATA,'REC');
            }

            let TmpData = {};
            TmpData.REC = TmpRec + 1;
            TmpData.TARIH = moment(new Date()).format("DD.MM.YYYY");
            TmpData.TIP = $scope.Data.UMP[i].TIP;
            TmpData.URETTUKET = $scope.Data.UMP[i].URETTUKET;
            TmpData.PARTIBARKOD = pBarkod;
            TmpData.URNBARKOD = $scope.Data.UMP[i].BARKOD;
            TmpData.ADITR = $scope.Data.UMP[i].ADITR;
            TmpData.ADIENG = $scope.Data.UMP[i].ADIENG;
            TmpData.ADIRU = $scope.Data.UMP[i].ADIRU;
            TmpData.ADIRO = $scope.Data.UMP[i].ADIRO;
            TmpData.DESI = $scope.Data.UMP[i].DESI;
            TmpData.AGIRLIK = $scope.Data.UMP[i].AGIRLIK;
            TmpData.ISEMRI = $scope.Data.UMP[i].ISEMRI;
            TmpData.KODU = $scope.Data.UMP[i].KODU;
            TmpData.ADI = $scope.Data.UMP[i].ADI;

            if($scope.Param.Mono.MamulMalKabulDepo != "")
                TmpData.DEPO = $scope.Param.Mono.MamulMalKabulDepo;
            else
                TmpData.DEPO = $scope.Data.UMP[i].DEPO;

            TmpData.MIKTAR = $scope.Data.UMP[i].BMIKTAR * $scope.Data.UMP[i].KATSAYI;
            TmpData.DEPOMIKTAR = $scope.Data.UMP[i].DEPOMIKTAR;
            TmpData.PARTI = pParti;
            TmpData.LOT = pLot;

            if($scope.Data.UMP[i].URETTUKET == 1)
            {
                TmpUretRec = TmpData.REC
                TmpData.URETREC = TmpUretRec 
            }
            else
            {
                TmpData.URETREC = TmpUretRec
            }

            if(TmpDrRota.length > 0)
            {
                TmpData.ROTAREC = TmpDrRota[0].REC;
                TmpData.SAFHANO = TmpDrRota[0].SAFHANO;
                TmpData.OPERASYONKODU = TmpDrRota[0].OPERASYONKODU;
                TmpData.ISMERKEZI = TmpDrRota[0].ISMERKEZI;
                TmpData.SURE = TmpDrRota[0].SURE * TmpDrUret[0].KATSAYI;
            }

            $scope.Data.DATA.push(TmpData);
            InitGrd($scope.Data.DATA.filter(x => x.URETTUKET == 1))
        }
    }
    $scope.Init = function()
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.Data = {};
        $scope.Data.UMP = [];
        $scope.Data.URP = [];
        $scope.Data.DATA = [];
        $scope.LblUrun = "";
        $scope.TxtBarkod = "";
        $scope.TxtMiktar = 0;
        
        InitObj();
        InitGrd([]);
    }
    $scope.BtnBarkodBas = async function()
    {
        let TmpBarkod = "";

        if($scope.BteIsEmri.txt == "" || $scope.BteParti.txt == "")
        {
            swal("Dikkat", "Lütfen İş emri ve parti kodu seçmeden geçmeyin.",icon="warning");
            return;
        }
        if(MiktarKontrol())
        {
            swal("Dikkat", "Lütfen başka bir iş emri seçiniz.",icon="warning");
            return;
        }

        let TmpLot = await MaxLot();

        if(await PartiLotOlustur($scope.BteParti.txt,TmpLot,$scope.LblUrun))
        {
            TmpBarkod = $scope.BteParti.txt.padStart(8, "0") + TmpLot.toString().padStart(4, "0")
            if(await BarkodOlustur(TmpBarkod,$scope.LblUrun,$scope.BteParti.txt,TmpLot))
            {
                Ekle(TmpBarkod,$scope.BteParti.txt,TmpLot);
            }
        }
    }
}