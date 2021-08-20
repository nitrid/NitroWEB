function MonoDepoTransferRaporu($scope, srv, $rootScope)
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
        if($rootScope.GeneralParamList.MonoDepoTransferRaporu != "true")
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
                        dataField: "TARIH",
                        width: 150
                    }, 
                    {
                        caption : "STOK KODU",
                        dataField: "STOKKODU",
                        width: 300
                    }, 
                    {
                        caption : "STOK ADI",
                        dataField: "STOKADI",
                        width: 500
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 100
                    }, 
                    {
                        caption : "GIRIS DEPO ADI",
                        dataField: "GIRISDEPOADI",
                        width: 350
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
                query : "select CONVERT(varchar,sth_tarih,104) AS TARIH,  " +
                "sth_stok_kod AS STOKKODU, " +
                "(select sto_isim from STOKLAR where sto_kod = sth_stok_kod) AS STOKADI, " +
                "sth_giris_depo_no AS GIRISDEPONO, " +
                "sth_cikis_depo_no AS CIKISDEPONO, " +
                "[dbo].[fn_DepoIsmi](sth_giris_depo_no) AS GIRISDEPOADI, " +
                "[dbo].[fn_DepoIsmi](sth_cikis_depo_no) AS CIKISDEPOADI, " +
                "sth_miktar AS MIKTAR " +
                " FROM STOK_HAREKETLERI WHERE sth_evraktip = 2 and ((sth_giris_depo_no = @depo) OR (@depo = 0)) AND  sth_tarih  >= @tarih and sth_tarih <= @sontarih",
                param : ['depo:int','tarih:dateclock','sontarih:dateclock'],
                value : [$scope.DepoNo,$scope.BaslangicData,$scope.BitisData]
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
                query : "select CONVERT(varchar,sth_tarih,104) AS TARIH,  " +
                "sth_stok_kod AS STOKKODU, " +
                "(select sto_isim from STOKLAR where sto_kod = sth_stok_kod) AS STOKADI, " +
                "sth_giris_depo_no AS GIRISDEPONO, " +
                "sth_cikis_depo_no AS CIKISDEPONO, " +
                "[dbo].[fn_DepoIsmi](sth_giris_depo_no) AS GIRISDEPOADI, " +
                "[dbo].[fn_DepoIsmi](sth_cikis_depo_no) AS CIKISDEPOADI, " +
                "sth_miktar AS MIKTAR " +
                " FROM STOK_HAREKETLERI WHERE sth_evraktip = 2 and ((sth_giris_depo_no = @depo) OR (@depo = 0)) AND  sth_tarih  >= @tarih and sth_tarih <= @sontarih",
                param : ['depo:int','tarih:date','sontarih:date'],
                value : [$scope.DepoNo,$scope.BaslangicDataDate[0],$scope.BitisDataDate[0]]
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
            fileName:"DepolarArasıTransferRaporu",
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