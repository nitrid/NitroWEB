function MonoUretimDashboard($scope,srv, $rootScope)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "ÜRETİM"
        $scope.VeriGetir()
        

       

        // Sortable.create(demo1, 
        // { 
        //     animation: 100,
        //     multiDrag: true, 
        //     group: 'list-1', 
        //     draggable: '.list-group-item', 
        //     handle: '.list-group-item', 
        //     sort: true, 
        //     filter: '.sortable-disabled', 
        //     chosenClass: 'active',
        //     onChange: function(/**Event*/evt) {
        //         evt.newIndex // most likely why this event is used is to get the dragging element's current index
        //         // same properties as onEnd
        //         console.log(evt.newIndex)
        //     },
        //     onAdd: function (/**Event*/evt) {
        //         // same properties as onEnd
        //         //console.log(evt.to.outerText)
        //         //console.log(evt)
        //         //console.log(evt.to.children[0].id)
        //         console.log(evt.to.children)

        //     },
        //     onChange: function(/**Event*/evt) {
        //         evt.newIndex // most likely why this event is used is to get the dragging element's current index
        //         // same properties as onEnd
        //         //console.log(evt.path)
        //     }
        // });
        // Sortable.create(demo2, 
        // { 
        //     animation: 100, 
        //     group: 'list-1', 
        //     draggable: '.list-group-item', 
        //     handle: '.list-group-item', 
        //     sort: true, 
        //     filter: '.sortable-disabled', 
        //     chosenClass: 'active',
        //     // onChange: function(/**Event*/evt) {
        //     //     evt.newIndex // most likely why this event is used is to get the dragging element's current index
        //     //     // same properties as onEnd
        //     //     console.log(evt)
        //     // } 
        // });

    }

    $scope.VeriGetir = async function()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT ISNULL((SELECT  upl_miktar FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_kod and upl_uretim_tuket = 1),0) AS AKTIF from ISEMIRLERI where is_EmriDurumu = 1 and is_Kod like 'M-%' ", 
        }
        
        let TmpData = await srv.Execute(TmpQuery)
        $scope.Aktif = srv.SumColumn(TmpData,"AKTIF")
        console.log($scope.Aktif)
        let TmpQuery2 = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT ISNULL(sum(sth_miktar),0) AS TAMAMLANAN FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu like'M-%' and sth_tarih = CONVERT(varchar,GETDATE(),110) and sth_tip = 0 and sth_evraktip = 12            ", 
        }
        
        let TmpData2 = await srv.Execute(TmpQuery2)
        $scope.Tamamlanan = TmpData2[0].TAMAMLANAN
        $scope.Kalan = ($scope.Aktif - $scope.Tamamlanan) 
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
            medals: $scope.Kalan,
        }, {
            uretim: "ÜRETİM",
            medals: $scope.Tamamlanan
        }];
    }
   
}