function MonoBarkodEtiketBasimi($scope, srv) 
{
    function InitGrid() 
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: [],
                allowColumnResizing: true,
                height: 490,
                width: "auto",
                columnWidth: 100,
                selection:
                {
                    mode: "single"
                },
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
                onSelectionChanged: function (selectedItems) {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
    function InitObj() 
    {
        $scope.BteParti =
        {
            title: "Parti Seçim",
            txt: moment(new Date()).format("YYYYMMGG"),
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu",
                param: ['pl_stokkodu:string|25'],
                value: []
            },
            selection: "PARTI",
            columns:
            [
                {
                    dataField: "PARTI",
                    width: 200
                },
                {
                    dataField: "LOT",
                    width: 200
                },
            ],
        }
        $scope.BteBarkod =
        {
            title: "Barkod Seçim",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query:  "SELECT " +
                        "bar_kodu As BARKOD, " +
                        "bar_stokkodu AS KODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS ADI," +
                        "bar_partikodu AS PARTI, " +
                        "bar_lotno As LOT " +
                        "FROM BARKOD_TANIMLARI"
            },
            selection: "BARKOD",
            columns:
            [
                {
                    dataField: "BARKOD",
                    width: 200
                },
                {
                    dataField: "KODU",
                    width: 200
                },
                {
                    dataField: "ADI",
                    width: 500
                },
                {
                    dataField: "PARTI",
                    width: 100
                },
                {
                    dataField: "LOT",
                    width: 500
                },
            ],
            onSelected : async function(pData)
            {
                
            },
            onKeyPress : function(pKey)
            {
                console.log(pKey)
            }
        }
        $scope.BteParti =
        {
            title: "Parti Seçim",
            txt: moment(new Date()).format("YYYYMMGG"),
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT pl_partikodu AS PARTI, pl_lotno AS LOT FROM PARTILOT WHERE pl_stokkodu = @pl_stokkodu",
                param: ['pl_stokkodu:string|25'],
                value: []
            },
            selection: "PARTI",
            columns:
                [
                    {
                        dataField: "PARTI",
                        width: 200
                    },
                    {
                        dataField: "LOT",
                        width: 200
                    },
                ],
        }
        $scope.BteStok =
        {
            title: "Stok Seçim",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT " +
                    "sto_kod AS KODU, " +
                    "sto_isim AS ADI " +
                    "FROM STOKLAR "
            },
            selection: "KODU",
            columns:
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
        }
        $scope.CmbEtiketTasarim1 =
        {
            datasource:
            {
                data: $scope.Param.Mono.BarkodBasimiEtiket
            },
            key: "special",
            value: "name",
            defaultVal: "1",
            selectionMode: "key",
            return: "1",
            onSelected: function (pSelected) {
                $scope.CmbEtiketList.return = pSelected
            }
        }
    }
    $scope.Init = function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        InitGrid();
        InitObj();
    }    
}
