function MonoStokSeviyeleriRaporu($scope, srv, $rootScope)
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
        $rootScope.PageName = "STOK SEVİYELERİ RAPORU"
        $scope.DepoNo = "0";
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT dep_adi AS ADI ,dep_no AS KODU FROM DEPOLAR",
           
        }
        $scope.DepoListe = await srv.Execute(TmpQuery)

        if($rootScope.GeneralParamList.MonoStokSeviyeleriRaporu != "true")
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
                        dataField: "ADI",
                        width: 800
                    }, 
                    {
                        caption : "KODU",
                        dataField: "KODU",
                        width: 500
                    }, 
                    {
                        dataField: "DEPOMIKTAR",
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
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sto_isim as ADI, " +
            "sto_kod AS KODU, " +
            "ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@depo,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR " +
            "FROM STOKLAR ORDER BY ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@depo,CONVERT(VARCHAR(10),GETDATE(),112))),0) DESC",
            param : ['depo:int'],
            value : [$scope.DepoNo]
        }
        console.log(TmpQuery)
        let TmpData = await srv.Execute(TmpQuery)
        $scope.DataList = TmpData
        InitGrd(TmpData)
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
            fileName:"StokSeviyeleriRaporu",
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
