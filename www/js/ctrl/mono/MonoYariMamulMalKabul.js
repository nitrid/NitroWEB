function MonoYariMamulMalKabul($scope,srv)
{
$scope.Init = function()
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: [],
                allowColumnResizing: true,
                height: 450,
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
                onSelectionChanged: function (selectedItems) 
                {
                    SelectionRow = selectedItems.selectedRowsData[0];
                }
            }
        )
    }
}