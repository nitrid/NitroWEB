angular.module('app').component('buttonModal', 
{
    templateUrl: 'js/component/button-modal.html',
    controller: function ButtonModal($scope,$attrs,srv) 
    {
        console.log($attrs.id)
        let SelectionRow;
        var ctrl = this
        ctrl.Txt = ""
        ctrl.Id = $attrs.id

        async function ModalShow()
        {
            ctrl.SelectedRow = {};
            let GrdResult = await Init()

            if(GrdResult)
            {
                $('#Mdl' + ctrl.Id).modal("show");
            }      
        }
        $scope.$watch("$ctrl.Txt", function () 
        {
            if(typeof ctrl.option != 'undefined')
            {
                ctrl.option.txt = ctrl.Txt
            }
        });

        function Init()
        {
            return new Promise(async resolve => 
            {
                if(srv.SocketConnected)
                {
                    let TmpDataSource = ctrl.option.datasource;
                    let TmpData = [];
                    let TmpColumns = [];
                    
                    if(typeof TmpDataSource == 'undefined')
                    {
                        resolve(false)
                        return 
                    }
                    // DATASOURCE İÇERSİNDEKİ DURUMA GÖRE QUERY VEYA TAG VEYA DATA UYGULANIYOR.
                    if(typeof TmpDataSource.tag != 'undefined')
                    {
                        TmpData = await srv.Execute(TmpDataSource.db,TmpDataSource.tag,TmpDataSource.values)
                    }
                    else if(typeof TmpDataSource.query != 'undefined')
                    {
                        TmpData = await srv.Execute(TmpDataSource)
                    }
                    else if(typeof TmpDataSource.data != 'undefined')
                    {
                        TmpData = TmpDataSource.data
                    }
                    //******************************************** */
                    if(typeof TmpData == 'undefined' && TmpData.length == 0)
                    {
                        resolve(false)
                        return;
                    }
                    // OPTION DAKİ COLUMNS ALANLARI UYGULANIYOR.
                    if(typeof ctrl.option.columns == 'undefined')
                    {
                        for (let i = 0; i < Object.keys(TmpData[0]).length; i++) 
                        {
                            TmpColumns.push({dataField: Object.keys(TmpData[0])[i]})                               
                        }
                    }
                    else
                    {
                        TmpColumns = ctrl.option.columns
                    }
                    //**************************************** */
                    console.log(TmpData)
                    $("#Grd"  + ctrl.Id).dxDataGrid
                    (
                        {
                            dataSource: TmpData,
                            allowColumnResizing: true,
                            width: "100%",
                            columnWidth: 100,
                            
                            selection: 
                            {
                                mode: "single"
                            },
                            hoverStateEnabled: true,
                            showBorders: true,
                            columns: TmpColumns,
                            paging: 
                            {
                                pageSize: 18
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

                    resolve(true)
                }
                else
                {
                    resolve(false)
                }
            });
        }
        ctrl.$onInit = function() 
        {

        }
        ctrl.Show = function()
        {
            if(typeof ctrl.option.onClick != 'undefined')
            {
                ctrl.option.onClick(function(pStatus)
                {
                    if(pStatus)
                    {
                        ModalShow();        
                    }
                });
            }
            else
            {
                ModalShow();
            }                        
        }
        ctrl.Select = function()
        {
            $('#Mdl' + ctrl.Id).modal("hide");
            if(typeof SelectionRow != 'undefined')
            {
                ctrl.Txt = SelectionRow[ctrl.option.selection]
                if(typeof ctrl.option.onSelected != 'undefined')
                {
                    ctrl.option.onSelected(SelectionRow);
                }
            }
        }
    },
    bindings : 
    {
        option : '<'
    }
});

/* ÖRNEK KULLANIM ŞEKLİ 
<button-modal id="1" option="BteTest"></button-modal>
$scope.BteTest = 
{
    title : "MODAL 1",
    datasource : 
    {
        //data : [{sto_kod : '001',sto_isim: 'KALEM'}],
        db: "TEST",
        tag: "StokGetir",
        values: ['','',0,'']
    },
    selection : "KODU",
    columns :
    [
        {
            dataField: "KODU",
            width: 150
        }, 
        {
            dataField: "ADI",
            width: 500
        }, 
        {
            dataField: "BARKOD",
            width: 100
        }, 
        {
            dataField: "DEPOMIKTAR",
            width: 100
        }, 
    ],
    onSelected : function(pData)
    {
        console.log(pData)
    }
}
*/