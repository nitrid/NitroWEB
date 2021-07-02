function MonoYariMamulBarkodIptal($scope, srv, $rootScope) {
    $scope.Init = function () {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "YARI MAMÜL BARKOD İPTAL"

        InitObj();
        InitGrd();
    }
    function InitGrd() {
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
        $scope.BteIsEmri1 =
        {
            title: "İş Emri Seçim",
            txt: "",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: "SELECT " +
                    "ISNULL((SELECT TOP 1 bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AND bar_birimpntr = 1 AND bar_partikodu = '' AND bar_lotno = 0),'') AS BARKOD, " +
                    "is_Kod AS KODU,is_Ismi AS ADI, " +
                    "ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'') AS STOKKODU, " +
                    "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod = ISNULL((SELECT TOP 1 upl_kodu FROM URETIM_MALZEME_PLANLAMA WHERE upl_isemri = is_Kod AND upl_uretim_tuket = 1),'')),'') AS STOKADI " +
                    "FROM ISEMIRLERI WHERE is_EmriDurumu = 1 AND is_Kod LIKE '%AYD-%'"
            },
            selection: "KODU",
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
                    title: "STOK KODU",
                    dataField: "STOKKODU",
                    width: 100
                },
                {
                    title: "STOK ADI",
                    dataField: "STOKADI",
                    width: 500
                },
            ],
        }
    }
}