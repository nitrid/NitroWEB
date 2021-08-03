function MonoStokDepoGirisCikisRaporu($scope, srv, $rootScope)
{
    function InitDatePicker()
    {
        var start = new Date();
        start.setHours(9);
        start.setMinutes(0);

        $('#BasTarih').datepicker({
            timepicker: true,
            language: 'tr',
            startDate: start,
            minHours: 0,
            maxHours: 24,
            onSelect: function (fd, d, picker) {
                $scope.BaslangicData = fd
                $scope.BaslangicDataDate = fd.split(" ")
            }
        })

        $('#BitTarih').datepicker({
            timepicker: true,
            language: 'tr',
            startDate: start,
            minHours: 0,
            maxHours: 24,
            onSelect: function (fd, d, picker) {
                $scope.BitisData = fd
                $scope.BitisDataDate = fd.split(" ")
            }
        })
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.SaatDurum = true
        $scope.BaslangicData = ""
        $scope.BitisData = ""
        $scope.DataList = ""
        $rootScope.PageName = "DEPO TRANSFER RAPORU"
        $scope.DepoNo = "0";
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT dep_adi AS ADI ,dep_no AS KODU FROM DEPOLAR",
           
        }
        $scope.DepoListe = await srv.Execute(TmpQuery)

        if($rootScope.GeneralParamList.MonoStokDepoGirisCikisRaporu != "true")
        {
            swal("Dikkat", "Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır..",icon="warning");
            var url = "index.html";
            window.location.href = url;
            event.preventDefault();        
        }

        InitDatePicker()
        InitGrd()
    }
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 1000,
                width: "100%",
                columnWidth: 100,
                columns :
                [
                    {
                        dataField: "TIP",
                        width: 150
                    }, 
                    {
                        dataField: "EVRAKTIP",
                        width: 150
                    }, 
                    {
                        dataField: "EVRAKCINS",
                        width: 150
                    }, 
                    {
                        caption : "STOK KODU",
                        dataField: "STOKKOD",
                        width: 300
                    }, 
                    {
                        caption : "STOK ADI",
                        dataField: "STOKADI",
                        width: 400
                    }, 
                    {
                        caption : "CARI",
                        dataField: "CARIADI",
                        width: 400
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 150
                    }, 
                    {
                        caption : "GIRIS DEPO ADI",
                        dataField: "GIRISDEPOADI",
                        width: 250
                    }, 
                    {
                        caption : "CIKIS DEPO ADI",
                        dataField: "CIKISDEPOADI",
                        width: 150
                    }, 
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging: 
                {
                    pageSize: "auto"
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
            }
        )
    }
    $scope.BtnGetir = async function()
    {

        $scope.deneme  = await srv.Scale.Send("COM7");
        console.log($scope.deneme)
        console.log($scope.BaslangicData)
        if($scope.BaslangicData == '' || $scope.BitisData == '')
        {
            swal("Dikkat", "Lütfen Tarih Saat Seçimi Yapınız.",icon="warning");
            return;
        }
        if($scope.SaatDurum == true)
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "select CASE sth_tip WHEN 0 THEN 'GİRİŞ' WHEN 1 THEN 'ÇIKIŞ' WHEN 2 THEN 'DEPO TRANSFER' END AS TIP,  " +
                " sth_stok_kod as STOKKOD, " +
                " (select sto_isim from STOKLAR where sto_kod = sth_stok_kod) AS STOKADI, " +
                " SUM(sth_miktar) AS MIKTAR, " +
                " ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod =sth_cari_kodu),'') AS CARIADI, " +
                " [dbo].[fn_DepoIsmi](sth_giris_depo_no) AS GIRISDEPOADI, " +
                " [dbo].[fn_DepoIsmi](sth_cikis_depo_no) AS CIKISDEPOADI, " +
                " [dbo].[fn_StokHarEvrTip](sth_evraktip) AS EVRAKTIP, " +
                " [dbo].[fn_StokHarCins](sth_cins) AS EVRAKCINS " +
                "  FROM STOK_HAREKETLERI WHERE sth_tip IN(0,1,2) AND  sth_tarih  >= @tarih and sth_tarih <= @sontarih" +
                "  GROUP BY  " +
                "  sth_stok_kod,sth_tip,sth_cari_kodu,sth_evraktip, " +
                "  sth_giris_depo_no,sth_cikis_depo_no,sth_cins " ,
                param : ['tarih:dateclock','sontarih:dateclock'],
                value : [$scope.BaslangicData,$scope.BitisData]
            }
            console.log(TmpQuery)
            let TmpData = await srv.Execute(TmpQuery)
            $scope.DataList = TmpData
            InitGrd(TmpData)
        }
        else
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query :  "select CASE sth_tip WHEN 0 THEN 'GİRİŞ' WHEN 1 THEN 'ÇIKIŞ' WHEN 2 THEN 'DEPO TRANSFER' END AS TIP,  " +
                " sth_stok_kod as STOKKOD, " +
                " (select sto_isim from STOKLAR where sto_kod = sth_stok_kod) AS STOKADI, " +
                " SUM(sth_miktar) AS MIKTAR, " +
                " ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod =sth_cari_kodu),'') AS CARIADI, " +
                " [dbo].[fn_DepoIsmi](sth_giris_depo_no) AS GIRISDEPOADI, " +
                " [dbo].[fn_DepoIsmi](sth_cikis_depo_no) AS CIKISDEPOADI, " +
                " [dbo].[fn_StokHarEvrTip](sth_evraktip) AS EVRAKTIP, " +
                " [dbo].[fn_StokHarCins](sth_cins) AS EVRAKCINS " +
                "  FROM STOK_HAREKETLERI WHERE sth_tip IN(0,1,2) AND  sth_tarih  >= @tarih and sth_tarih <= @sontarih" +
                "  GROUP BY  " +
                "  sth_stok_kod,sth_tip,sth_cari_kodu,sth_evraktip, " +
                "  sth_giris_depo_no,sth_cikis_depo_no,sth_cins " ,
                param : ['tarih:date','sontarih:date'],
                value : [$scope.BaslangicDataDate[0],$scope.BitisDataDate[0]]
            }
            console.log(TmpQuery)
            let TmpData = await srv.Execute(TmpQuery)
            $scope.DataList = TmpData
            InitGrd(TmpData)

        }
    }
    $scope.ExcelExport = function()
    {
        if($scope.DataList == '')
        {
            swal("Dikkat", "Lütfen Önce Raporu Çalıştırınız.",icon="warning");
            return;
        }
        $scope.ExcelDataListesi = $scope.DataList

        let ExcelDataListe = [];
        let ExcelHeaderListe = [];

        for(i = 0; i < Object.keys($scope.ExcelDataListesi[0]).length; i++)
        {
            let a = {};
            
            a.text = Object.keys($scope.ExcelDataListesi[0])[i];
            ExcelHeaderListe.push(a)
        }

        ExcelDataListe.push(ExcelHeaderListe)

        for(i = 0; i < $scope.ExcelDataListesi.length; i++)
        {
            let Dizi = [];

            for(m = 0;m < Object.keys($scope.ExcelDataListesi[i]).length;m++)
            {
                let b = {};
                b.text = $scope.ExcelDataListesi[i][Object.keys($scope.ExcelDataListesi[i])[m]]
                Dizi.push(b);
            }
            
            ExcelDataListe.push(Dizi)
        }
        console.log(ExcelDataListe)
        var RaporListeData = 
        [
            {
                "sheetName":"Sayfa",
                "data":  ExcelDataListe
            },
            
        ];
        var options = {
            fileName:"StokGirisCikisRaporu",
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
