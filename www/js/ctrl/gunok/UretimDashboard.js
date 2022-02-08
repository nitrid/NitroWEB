function UretimDashboard($scope,srv, $rootScope)
{
    async function VeriGetir()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT " +
                    "ISNULL((SELECT upl_miktar FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),0) AS AKTIF " +
                    "FROM ISEMIRLERI " +
                    "WHERE is_EmriDurumu = 1 " 
        }
        
        let TmpData = await srv.Execute(TmpQuery)
        $scope.Aktif = srv.SumColumn(TmpData,"AKTIF")

        let TmpQuery2 = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT ISNULL(sum(sth_miktar),0) AS TAMAMLANAN " +
                    "FROM STOK_HAREKETLERI " +
                    "WHERE " +
                    "sth_tarih = CONVERT(varchar,GETDATE(),110) AND " +
                    "sth_tip = 0 AND sth_evraktip = 12 ", 
        }
        
        let TmpData2 = await srv.Execute(TmpQuery2)
        $scope.Tamamlanan = TmpData2[0].TAMAMLANAN;
        $scope.Kalan = ($scope.Aktif - $scope.Tamamlanan);

        $(function()
        {
            $("#pie").dxPieChart({
                palette: ['#0dcaf0', '#4cae4c', '#007bff'],
                dataSource: dataSource,
                //title: "Olympic Medals in 2008",
                legend: {
                    orientation: "horizontal",
                    itemTextPosition: "right",
                    horizontalAlignment: "center",
                    verticalAlignment: "bottom",
                    columnCount: 4
                },
                "export": {
                    enabled: false
                },
                series: [{
                    argumentField: "uretim",
                    valueField: "medals",
                    label: {
                        visible: true,
                        font: {
                            size: 20
                        },
                        connector: {
                            visible: true,
                            width: 1.5
                        },
                        position: "columns",
                        customizeText: function(arg) {
                            return arg.valueText + " (" + arg.percentText + ")";
                        }
                    }
                }]
            });
        }); 
        var dataSource = 
        [
            {
                uretim: "KALAN",
                medals: $scope.Kalan,
            }, 
            {
                uretim: "ÜRETİM",
                medals: $scope.Tamamlanan
            }
        ];

        console.log(window)

        
        setTimeout(VeriGetir,3600000)
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "ÜRETİM DASHBOARD"
        
        setTimeout(await VeriGetir(),3600000)
    }
}