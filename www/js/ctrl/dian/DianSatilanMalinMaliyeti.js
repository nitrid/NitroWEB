function DianSatilanMalinMaliyeti($scope, srv) 
{
    function InitObj()
    {
        $scope.CmbDonemYil = 
        {
            datasource : 
            {
                data : 
                [
                    {key: "1399"},{key: "1400"},{key: "1401"},{key: "1402"},{key: "1403"},{key: "1404"},{key: "1405"},{key: "1406"}
                ]
            },
            key : "key",
            value : "key",
            defaultVal : "1399",
            selectionMode : "key",
            return : "1399",
            onSelected : function(pSelected)
            {
                console.log(pSelected)
            }
        } 
        $scope.CmbDonemAy = 
        {
            datasource : 
            {
                data : 
                [
                    {key: "1"},{key: "2"},{key: "3"},{key: "4"},{key: "5"},{key: "6"},{key: "7"},{key: "8"},{key: "9"},{key: "10"},{key: "11"},{key: "12"}
                ]
            },
            key : "key",
            value : "key",
            defaultVal : "1",
            selectionMode : "key",
            return : "1",
            onSelected : function(pSelected)
            {
                console.log(pSelected)
            }
        }
        $scope.BteDepo = 
        {
            title : "Depo Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : "SELECT dep_no AS KODU,dep_adi AS ADI FROM DEPOLAR "
            },
            selection : "KODU",
            columns :
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
            onSelected : async function(pSelected)
            {
                $scope.DepoKodu = pSelected.KODU
            },
            onKeyPress : async function(pKey)
            {
            }
        }
    }
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 500,
                width: "100%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                columns :
                [
                    {
                        caption : "KODU",
                        dataField: "KODU",
                        width: 100
                    }, 
                    {
                        dataField: "ADI",
                        width: 200
                    }, 
                    {
                        dataField: "YABANCI_ADI",
                        width: 400
                    }, 
                    {
                        dataField: "SATILAN_TUTAR",
                        width: 200
                    },
                    {
                        dataField: "SATILAN_MIKTAR",
                        width: 200
                    },
                    {
                        dataField: "IADE_ALINAN_TUTAR",
                        width: 200
                    },
                    {
                        dataField: "IADE_ALINAN_MIKTAR",
                        width: 200
                    },
                    {
                        dataField: "IADE_EDILEN_TUTAR",
                        width: 200
                    },
                    {
                        dataField: "IADE_EDILEN_MIKTAR",
                        width: 200
                    }, 
                    {
                        dataField: "SATILAN_MALIYET",
                        width: 200
                    }, 
                    {
                        dataField: "IADE_ALINAN_MALIYET",
                        width: 200
                    },
                    {
                        dataField: "IADE_EDILEN_MALIYET",
                        width: 200
                    },
                    {
                        dataField: "NET_SATIS_TUTAR",
                        width: 200
                    },
                    {
                        dataField: "NET_SATIS_MALIYET",
                        width: 200
                    },
                    {
                        dataField: "NET_KAR",
                        width: 200
                    },
                    {
                        dataField: "KAR_ORAN",
                        width: 200
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

                }
            }
        )
    }
    function GetSemsiPeriod()
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT * FROM TERP_SEMSI_PERIOD WHERE YEAR = @YEAR AND MONTH = @MONTH",
                param : ['YEAR:int','MONTH:int'],
                value : [$scope.CmbDonemYil.return,$scope.CmbDonemAy.return]
            }

            let TmpData = await srv.Execute(TmpQuery)

            if(TmpData.length > 0)
            {
                $scope.Data.PERIOD = TmpData;
                resolve(true);
                return;
            }

            $scope.Data.PERIOD = [];
            resolve(false)
            return;
        });
    }
    function GetMaliyet(pDepo,pIlkTarih,pSonTarih)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "*, " +
                        "ROUND(SATILAN_TUTAR - IADE_ALINAN_TUTAR,2) AS NET_SATIS_TUTAR, " +
                        "ROUND(SATILAN_MALIYET - IADE_ALINAN_MALIYET,2) AS NET_SATIS_MALIYET, " +
                        "ROUND((SATILAN_TUTAR - IADE_ALINAN_TUTAR) - (SATILAN_MALIYET - IADE_ALINAN_MALIYET),2) AS NET_KAR, " +
                        "ROUND(CASE WHEN ((SATILAN_TUTAR - IADE_ALINAN_TUTAR) - (SATILAN_MALIYET - IADE_ALINAN_MALIYET)) <= 0 OR (SATILAN_MALIYET - IADE_ALINAN_MALIYET) <= 0 THEN 0 " +
                        "ELSE (((SATILAN_TUTAR - IADE_ALINAN_TUTAR) - (SATILAN_MALIYET - IADE_ALINAN_MALIYET)) / (SATILAN_MALIYET - IADE_ALINAN_MALIYET)) * 100 END,4) AS KAR_ORAN " +
                        "FROM (SELECT " +
                        "sto_kod AS KODU, " +
                        "sto_isim AS ADI, " +
                        "sto_yabanci_isim AS YABANCI_ADI, " +
                        "ROUND(ISNULL((SELECT SUM(sth_tutar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 0 AND sth_stok_kod = STOK.sto_kod),0),2) AS SATILAN_TUTAR, " +
                        "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO OR @DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 0 AND sth_stok_kod = STOK.sto_kod),0) AS SATILAN_MIKTAR, " +
                        "ROUND(ISNULL((SELECT SUM(sth_tutar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_ALINAN_TUTAR, " +
                        "ROUND(ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_ALINAN_MIKTAR, " +
                        "ROUND(ISNULL((SELECT SUM(sth_tutar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (3,13) AND sth_tip = 0 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_EDILEN_TUTAR, " +
                        "ROUND(ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (3,13) AND sth_tip = 0 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_EDILEN_MIKTAR, " +
                        "ROUND(ISNULL((SELECT SUM(sth_miktar) * COST.COST FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 0 AND sth_stok_kod = STOK.sto_kod),0),2) AS SATILAN_MALIYET, " +
                        "ROUND(ISNULL((SELECT SUM(sth_miktar) * COST.COST FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (1,4) AND sth_tip = 1 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_ALINAN_MALIYET, " +
                        "ROUND(ISNULL((SELECT SUM(sth_miktar) * COST.COST FROM STOK_HAREKETLERI WHERE ((sth_cikis_depo_no = @DEPO) OR (@DEPO = @DEPO)) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_evraktip IN (3,13) AND sth_tip = 0 AND sth_normal_iade = 1 AND sth_stok_kod = STOK.sto_kod),0),2) AS IADE_EDILEN_MALIYET " +
                        "FROM STOKLAR AS STOK " +
                        "INNER JOIN TERP_COST AS COST ON " +
                        "STOK.sto_kod = COST.CODE AND [MONTH] = @MONTH AND [YEAR] = @YEAR) AS MALIYET " ,
                param : ['DEPO:string|25','ILKTARIH:date','SONTARIH:date','MONTH:int','YEAR:int'],
                value : [pDepo,pIlkTarih,pSonTarih,$scope.CmbDonemAy.return,$scope.CmbDonemYil.return],
                loading : false
            }
            
            let TmpData = await srv.Execute(TmpQuery)
            
            if(TmpData.length > 0)
            {
                resolve(TmpData);
                return;
            }

            resolve([])
            return;
        });
    }
    $scope.Init = function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));

        $scope.Data = {};
        $scope.Data.PERIOD = [];
        $scope.GridData = [];

        $scope.TxtStatus = "";
        $scope.DepoKodu = "";

        InitObj();
        InitGrd([]);
    }
    $scope.BtnCalistir = async function()
    {
        $scope.TxtLog = "";
        $scope.TxtStatus = "";
        
        $scope.TxtStatus = "Şemsi Tarih Periyod Getiriliyor.";
        $scope.TxtLog += $scope.TxtStatus + '\n';
        await GetSemsiPeriod();        
        $scope.TxtLog += $scope.TxtStatus + '\n';
        
        if($scope.Data.PERIOD.length == 0)
        {
            return;
        }

        $scope.TxtStatus = "Satılan Malın Maliyeti Raporu Başladı.";
        $scope.TxtLog += $scope.TxtStatus + '\n';

        $scope.GridData = await GetMaliyet($scope.BteDepo.txt,moment($scope.Data.PERIOD[0].START_DATE).format("DD.MM.YYYY"),moment($scope.Data.PERIOD[0].END_DATE).format("DD.MM.YYYY"));
        
        InitGrd($scope.GridData)

        $scope.TxtStatus = "Satılan Malın Maliyeti Raporu Tamamlandı.";
        $scope.TxtLog += $scope.TxtStatus + '\n';
    }
    $scope.BtnExcelImport = function()
    {
        let ExcelDataListe = [];
        let ExcelHeaderListe = [];

        for(i = 0; i < Object.keys($scope.GridData[0]).length; i++)
        {
            let a = {};
            
            a.text = Object.keys($scope.GridData[0])[i];
            ExcelHeaderListe.push(a)
        }

        ExcelDataListe.push(ExcelHeaderListe)

        for(i = 0; i < $scope.GridData.length; i++)
        {
            let Dizi = [];

            for(m = 0;m < Object.keys($scope.GridData[i]).length;m++)
            {
                let b = {};
                b.text = $scope.GridData[i][Object.keys($scope.GridData[i])[m]]
                Dizi.push(b);
            }
            
            ExcelDataListe.push(Dizi)
        }
        var RaporListeData = 
        [
            {
                "sheetName":"Sayfa",
                "data":  ExcelDataListe
            }
        ];
        var options = {
            fileName:"SatilanMalinMaliyeti",
            extension:".xlsx",
            sheetName:"Sayfa",
            fileFullName:"report.xlsx",
            header:true,
            maxCellWidth: 20
        };

        Jhxlsx.export(RaporListeData, options);

        var url ='data.json';
        $.get(url, {},function (data) 
        {
            Jhxlsx.export(data.RaporListeData, data.options);
            db.Connection(function(data)
            {
            });
        })
    }
}