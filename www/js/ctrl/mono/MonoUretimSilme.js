function MonoUretimSilme($scope, srv, $rootScope) 
{
    function InitObj() 
    {
        $scope.BteIsEmri = 
        {            
            title : "İş Emri Seçim",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " SELECT  is_Kod AS KODU,is_Ismi AS ADI FROM ISEMIRLERI " 
                        
            },
            selection : "KODU",
            columns :
            [
                {                    
                    dataField: "ADI",
                    width: 200
                }, 
                {
                    title : "İŞ EMRİ KODU",
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onSelected : async function(pData)
            {
                $scope.UretimGetir(pData.KODU)
            }
        }
    }
    function InitGrd(pData)
    {
        $("#GrdList").dxDataGrid
        (
            {
                dataSource: pData,
                allowColumnResizing: true,
                height: 350,
                width: "100%",
                columnWidth: 100,
                selection: 
                {
                    mode: "single"
                },
                editing: {
                    mode: "row",
                    allowDeleting: true,
                    useIcons: true
                },
                columns :
                [
                    {
                        width: 100,
                        type: "buttons",
                        buttons: ["delete",{
                        }]
                    },
                    {
                        dataField: "IS EMRI",
                        name : "ISEMRI",
                        width: 150
                    }, 
                    {
                        caption : "STOKKOD",
                        dataField: "STOKKOD",
                        width: 200
                    }, 
                    {
                        dataField: "STOKADI",
                        width: 500
                    }, 
                    {
                        dataField: "MIKTAR",
                        width: 100
                    },             
                ],
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
                },
                onRowRemoved: async function(e) 
                {
                    await UretimSil(e.data)
                },
            }
        )
    }
    async function UretimSil(pData)
    {
        let DeleteData = [
            pData.ISEMRI
        ]
        let DeleteUretim = await srv.Execute($scope.Firma,'DeleteUretim',DeleteData);
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "ÜRETİM SİLME"

        InitObj()
        InitGrd()

    }   
    $scope.UretimGetir = async function(pKodu)
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT sth_isemri_gider_kodu AS ISEMRI, " +
            "sth_stok_kod AS STOKKOD, " +
            "(SELECT sto_isim FROM STOKLAR WHERE sto_kod = sth_stok_kod) AS STOKADI, " +
            "sth_miktar AS MIKTAR, " +
            "sth_tarih AS TARIH FROM STOK_HAREKETLERI WHERE sth_tip= 0 and sth_cins = 7 and sth_evraktip = 12 and sth_isemri_gider_kodu = @sth_isemri_gider_kodu " ,
            param : ['sth_isemri_gider_kodu:string|50'],
            value : [pKodu]
        }
        console.log(TmpQuery)
        let TmpData = await srv.Execute(TmpQuery)
        $scope.DataList = TmpData
        InitGrd(TmpData) 
    }
    
}
