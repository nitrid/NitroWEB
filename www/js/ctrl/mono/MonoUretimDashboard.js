function MonoUretimDashboard($scope,srv, $rootScope)
{
    $(function(){
        $("#pie").dxPieChart({
            palette: ['#007bff', '#4cae4c', '#dc3545'],
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
        uretim: "HEDEFLENEN",
        medals: 300,
    }, {
        uretim: "ÜRETİM",
        medals: 100
    }];
}