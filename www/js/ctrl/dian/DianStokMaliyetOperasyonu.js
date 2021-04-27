function DianStokMaliyetOperasyonu($scope, srv) 
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
    function GetStok()
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT sto_kod AS KODU FROM STOKLAR",
            }

            let TmpData = await srv.Execute(TmpQuery)

            if(TmpData.length > 0)
            {
                $scope.Data.STOK = TmpData;
                resolve(true);
                return;
            }

            $scope.Data.STOK = [];
            resolve(false)
            return;
        });
    }
    function GetStokMaliyet(pKodu,pIlkTarih,pSonTarih)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " + 
                        "SUM(sth_tutar) / SUM(sth_miktar) AS MALIYET, " + 
                        "dbo.fn_DepolardakiMiktar(@KODU,'',@SONTARIH) AS KALAN " + 
                        "FROM STOK_HAREKETLERI WHERE sth_evraktip IN(0,1,2,11,12) AND sth_tip = 0 " + 
                        "AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_stok_kod = @KODU",
                param : ['KODU:string|25','ILKTARIH:date','SONTARIH:date'],
                value : [pKodu,pIlkTarih,pSonTarih],
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
    function InsertStokMaliyet(pMonth,pYear,pCode,pCost,pLastQuantity)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "DECLARE @TMP AS NVARCHAR(25) " +
                        "SET @TMP = ISNULL((SELECT [CODE] FROM [TERP_COST] WHERE [MONTH] = @MONTH AND [YEAR] = @YEAR AND [CODE] = @CODE),'') " +
                        "IF @TMP = '' " +
                        "BEGIN " +
                        "INSERT INTO [dbo].[TERP_COST] ( " +
                        " [MONTH] " +
                        ",[YEAR] " +
                        ",[CODE] " +
                        ",[COST] " +
                        ",[LAST_QUANTITY] " +
                        ") VALUES ( " +
                        " @MONTH				    --<MONTH, smallint,>\n" +
                        ",@YEAR				    --<YEAR, smallint,>\n" +
                        ",@CODE				    --<CODE, nvarchar(50),>\n" +
                        ",@COST				    --<COST, float,>\n" +
                        ",@LAST_QUANTITY		--<LAST_QUANTITY, float,>\n" +
                        ") " +
                        "END " +
                        "ELSE " +
                        "BEGIN " +
                        "UPDATE [TERP_COST] SET [COST] = @COST, [LAST_QUANTITY] = @LAST_QUANTITY WHERE [MONTH] = @MONTH AND [YEAR] = @YEAR AND [CODE] = @CODE " +
                        "END",
                param : ['MONTH:int','YEAR:int','CODE:string|25','COST:float','LAST_QUANTITY:float'],
                value : [pMonth,pYear,pCode,pCost,pLastQuantity],
                loading : false
            }

            let TmpResult = await srv.Execute(TmpQuery)

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
    function UpdateStokHar(pKodu,pIlkTarih,pSonTarih,pMaliyet)
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "UPDATE STOK_HAREKETLERI SET sth_tutar = @MALIYET WHERE sth_evraktip IN (0,2,6,12) AND sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND sth_stok_kod = @KODU",
                param : ['KODU:string|25','ILKTARIH:date','SONTARIH:date','MALIYET:float'],
                value : [pKodu,pIlkTarih,pSonTarih,pMaliyet],
                loading : false
            }

            let TmpResult = await srv.Execute(TmpQuery)

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
    $scope.Init = function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));

        $scope.Data = {};
        $scope.Data.PERIOD = [];
        $scope.Data.STOK = [];

        $scope.TxtLog = "";
        $scope.TxtStatus = "";

        InitObj();
    }
    $scope.BtnCalistir = async function()
    {
        $scope.TxtLog = "";
        $scope.TxtStatus = "";
        
        $scope.TxtStatus = "Şemsi Tarih Periyod Getiriliyor.";
        $scope.TxtLog += $scope.TxtStatus + '\n';
        await GetSemsiPeriod();        
        $scope.TxtStatus = "Stok Listesi Getiriliyor.";
        $scope.TxtLog += $scope.TxtStatus + '\n';
        await GetStok()
        
        if($scope.Data.PERIOD.length == 0 || $scope.Data.STOK.length == 0)
        {
            return;
        }

        $scope.TxtStatus = "Stok Maliyet Hesaplama Başladı.";
        $scope.TxtLog += $scope.TxtStatus + '\n';

        for (let i = 0; i < $scope.Data.STOK.length; i++) 
        {
            let TmpPercent = (((i+1) / $scope.Data.STOK.length) * 100).toFixed(2);
            $('#PrBar').text(TmpPercent + '%')
            $('#PrBar').width(TmpPercent + '%')
            
            let TmpDr = await GetStokMaliyet($scope.Data.STOK[i].KODU,moment($scope.Data.PERIOD[0].START_DATE).format("DD.MM.YYYY"),moment($scope.Data.PERIOD[0].END_DATE).format("DD.MM.YYYY"));
            
            if(TmpDr.length > 0)
            {
                if(await InsertStokMaliyet($scope.Data.PERIOD[0].MONTH,$scope.Data.PERIOD[0].YEAR,$scope.Data.STOK[i].KODU,TmpDr[0].MALIYET,TmpDr[0].KALAN))
                {
                    $scope.TxtStatus = $scope.Data.STOK[i].KODU + " Kodlu Stoğun Maliyeti Hesaplanıp Tabloya Kayıt Ediliyor.";
                    $scope.TxtLog += $scope.TxtStatus + '\n';
                    if(await UpdateStokHar($scope.Data.STOK[i].KODU,moment($scope.Data.PERIOD[0].START_DATE).format("DD.MM.YYYY"),moment($scope.Data.PERIOD[0].END_DATE).format("DD.MM.YYYY"),TmpDr[0].MALIYET))
                    {
                        // $scope.TxtStatus = $scope.Data.STOK[i].KODU + " Kodlu Stoğun Maliyeti Stok Hareket Evraklarına Güncelleniyor.";
                        // $scope.TxtLog += $scope.TxtStatus;
                    }
                    else
                    {
                        $scope.TxtStatus = $scope.Data.STOK[i].KODU + " Kodlu Stoğun Hareket Evraklarına Güncelleme İşleminde Problem Oluştu.";
                        $scope.TxtLog += $scope.TxtStatus + '\n';
                    }
                }
                else
                {
                        $scope.TxtStatus = $scope.Data.STOK[i].KODU + " Kodlu Stoğun Maliyet Hesaplamasında Problem Oluştu.";
                        $scope.TxtLog += $scope.TxtStatus + '\n';
                }
            }
        }

        $scope.TxtStatus = "Stok Maliyet Hesaplama Tamamlandı.";
        $scope.TxtLog += $scope.TxtStatus + '\n';
    }
}
