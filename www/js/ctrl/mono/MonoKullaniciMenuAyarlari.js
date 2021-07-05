function MonoKullaniciMenuAyarlari($scope, srv, $rootScope)
{
    let File = "./www/js/param.js"
    function InitGrd()
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: Param,
                allowColumnResizing: true,
                height: 400,
                width: "40%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                columns :
                [
                    {      
                        caption: "DÜZENLE",
                        width: 90,
                        type: "buttons",
                        buttons: [ {
                            icon: "edit",
                            onClick: function (e) {
                                $scope.EditUser(e.row.data)
                            }
                        }]
                    },
                    {
                        caption : "KULLANICI",
                        dataField: "Kullanici",
                    }, 
                ],
                hoverStateEnabled: true,
                showBorders: true,
                paging: 
                {
                    pageSize: 15
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
    $scope.EditUser = function(pData)
    {
        $scope.Menu = {}
        for(let i = 0; i < Object.keys(pData.Menu).length; i++)
        {
            $scope.MenuKeys[i] = Object.keys(pData.Menu)[i]
            for(let x = 0; x < Object.values(pData.Menu).length; x++)
            {
                if([i][0] == [x][0])
                {
                    if(Object.values(pData.Menu)[x] == 1)
                    {
                        pData.Menu[$scope.MenuKeys[i]] = true
                        $scope.Menu[i] = {Menu: Object.keys(pData.Menu)[i], Durum: true, Sayi: i }
                    }
                    else
                    {
                        pData.Menu[$scope.MenuKeys[i]] = false
                        $scope.Menu[i] = {Menu: Object.keys(pData.Menu)[i], Durum: false, Sayi: i }
                    }
                }
               
                
            }
        }
        $("#TbUserEdit").addClass('show active');
        $("#TbUserList").removeClass('show active');
    }
    $scope.Init = function()
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "KULLANICI MENÜ AYARLARI"

        $scope.MenuKeys = [];
        $scope.MenuValues = [];
        $scope.Check = {}
        InitGrd([]);
    }
    $scope.CheckChange = function(Index)
    {
        console.log($scope.Menu)
    }
}
