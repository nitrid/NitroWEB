function MonoBarkodEtiketBasimi($scope, srv) {
    $scope.Init = function () {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        InitGrid();
        InitObj();
    }
    function InitGrid() {
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
    function InitObj() {
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
}
