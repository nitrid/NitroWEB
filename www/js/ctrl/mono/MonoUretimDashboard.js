function MonoUretimDashboard($scope,srv, $rootScope)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "ÜRETİM"
    }
    $(function(){
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
    var dataSource = [{
        uretim: "KALAN",
        medals: 200,
    }, {
        uretim: "ÜRETİM",
        medals: 100
    }];
}