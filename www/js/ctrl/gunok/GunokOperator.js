function GunokOperator($scope,srv, $rootScope)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        //$rootScope.PageName = "PUNCH"
        $rootScope.PageName = "OPERATOR";
        $scope.TestMiktar = 4
        $scope.TxtAcikSiparisler = "Açık Siparişler("+$scope.TestMiktar+")"
        $scope.TxtIsEmirleriListesi = "İş Emirleri Listesi("+$scope.TestMiktar+")"
        $scope.TxtPlanlananlar = "Planlananlar("+$scope.TestMiktar+")"
        $scope.TxtTamamlananlar = "Tamamlananlar("+$scope.TestMiktar+")"

        $(function(){
            var dataGrid = $("#AcikSiparisler").dxDataGrid({
                height: 540,
                dataSource: $scope.employees,
                keyExpr: "ID",
                scrolling: {
                    mode: "virtual"
                },
                sorting: {
                    mode: "none"
                },
                selection: {
                    mode: "multiple"
                },
                rowDragging: {
                    allowReordering: true,
                    onReorder: function(e) {
                        var visibleRows = e.component.getVisibleRows(),
                            toIndex = $scope.employees.indexOf(visibleRows[e.toIndex].data),
                            fromIndex = $scope.employees.indexOf(e.itemData);
                            $scope.employees.splice(fromIndex, 1);
                            $scope.employees.splice(toIndex, 0, e.itemData);
                        console.log(e.component)
                        e.component.refresh();
                        console.log($scope.employees)
                    }
                },
                showBorders: true,
                filterRow: 
                {
                    visible: true,
                    applyFilter: "auto"
                },
                headerFilter: 
                {
                    visible: true
                },
                columns: [
                {
                    dataField: "ID",
                    width: 55,
                    alignment: "center"
                },
                {
                    dataField: "FullName",
                    caption: "Full Name",
                    alignment: "center"
                }, 
                {
                    dataField: "Department",
                    caption: "Department",
                    alignment: "center"
                },
                {
                    dataField: "Title",
                    caption: "Title",
                    alignment: "center"
                },
                {      
                    caption: "İŞLEMLER",
                    width: 90,
                    type: "buttons",
                    buttons: 
                    [ 
                        {
                            icon: "file",
                            onClick: function (e) 
                            {
                                GetDetail(e.row.data)
                            }
                        },
                        {
                            icon: "print",
                            text: "ETİKES BAS",
                            onClick: function (e) 
                            {
                                GetDetail(e.row.data)
                            }
                        }
                    ]
                }]
            }).dxDataGrid("instance");
        });
        $scope.employees = [{
            ID: 1,
            FullName: "John Heart",
            Department: "Management",
            Title: "CEO",
        }, {
            ID: 2,
            FullName: "Samantha Bright",
            Department: "Management",
            Title: "COO",
        }, {
            ID: 3,
            FullName: "Arthur Miller",
            Department: "Management",
            Title: "CTO",
        }, {
            ID: 4,
            FullName: "Robert Reagan",
            Department: "Management",
            Title: "CMO",
        }, {
            ID: 5,
            FullName: "Greta Sims",
            Department: "Human Resources",
            Title: "HR Manager",
        }, {
            ID: 6,
            FullName: "Brett Wade",
            Department: "IT",
            Title: "IT Manager",
        }, {
            ID: 7,
            FullName: "Sandra Johnson",
            Department: "Human Resources",
            Title: "Controller",
        }, {
            ID: 8,
            FullName: "Ed Holmes",
            Department: "Sales",
            Title: "Sales Manager",
        }, {
            ID: 9,
            FullName: "Barb Banks",
            Department: "Support",
            Title: "Support Manager",
        }, {
            ID: 10,
            FullName: "Kevin Carter",
            Department: "Shipping",
            Title: "Shipping Manager",
        }]

        $scope.CmbPlanlamaSayfa =
        {
            datasource : 
            {
                data : [{KODU : '01',ADI: 'PUNCH'},{KODU : '02',ADI: 'ABKANT'},{KODU : '03',ADI: 'KAYNAK'},{KODU : '04',ADI: 'BOYA'},{KODU : '05',ADI: 'MONTAJ'}]
            },
            key : "KODU",
            value : "ADI",
            defaultVal : "PUNCH",
            selectionMode : "row",
            return : "PUNCH",
            onSelected : function(pSelected)
            {
                $rootScope.PageName = JSON.parse(pSelected).ADI
                console.log(JSON.parse(pSelected).KODU)
                $rootScope.GeneralParamList.AcilisSayfasi = pSelected
            },

        }
    }
    function GetDetail(pData)
    {
        $('#MdlIsEmriDetay').modal('show')
        console.log(pData)
    }
}
