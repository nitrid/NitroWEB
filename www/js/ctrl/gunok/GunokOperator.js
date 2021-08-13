function GunokOperator($scope,srv, $rootScope)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "OPERATOR"
        $scope.TestMiktar = 4
        $scope.TxtAcikSiparisler = "Açık Siparişler("+$scope.TestMiktar+")"
        $scope.TxtIsEmirleriListesi = "İş Emirleri Listesi("+$scope.TestMiktar+")"
        $scope.TxtPlanlananlar = "Planlananlar("+$scope.TestMiktar+")"
        $scope.TxtTamamlananlar = "Tamamlananlar("+$scope.TestMiktar+")"

        $scope.IsEmriDetay = {}

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
        GetIsEmirleri()
    }
    async function GetIsEmirleri()
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT is_Kod AS KODU,is_Ismi AS ADI," +
                    "UPL.upl_miktar - ISNULL((SELECT TOP 1 ish_uret_miktar FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = is_Kod and ish_plan_sevkmiktar = 0),0) AS PLANMIKTAR, " +
                    "UPL.upl_kodu AS STOKKODU, " +
                    "ISNULL((SELECT sto_isim  FROM STOKLAR WHERE sto_kod =  UPL.upl_kodu),'') AS STOKADI " +
                    "FROM ISEMIRLERI as ISM INNER JOIN URETIM_MALZEME_PLANLAMA AS UPL on ISM.is_Kod =  UPL.upl_isemri " +
                    "WHERE (SELECT TOP 1 (ish_planuretim - ish_uret_miktar) FROM ISEMRI_MALZEME_DURUMLARI WHERE ish_isemri = ISM.is_Kod and ish_plan_sevkmiktar = 0) > 0 " + 
                    "AND UPL.upl_uretim_tuket = 1 ",
            // param : ['depo:int'],
            // value : [$scope.DepoNo]
        }
        console.log(TmpQuery)
        let TmpData = await srv.Execute(TmpQuery)
        $scope.DataList = TmpData
        InitGrid(TmpData)
    }
    function InitGrid(pData)
    {
        $("#AcikSiparisler").dxDataGrid({
            height: 640,
            dataSource: pData,
            columnsAutoWidth: true,
            showBorders: true,
            sorting: {
                mode: "none"
            },
            selection: {
                mode: "multiple"
            },
            showBorders: true,
            filterRow: 
            {
                visible: true,
                applyFilter: "auto"
            },
            scrolling: 
            {
                columnRenderingMode: "horizontal"
            },
            paging: 
            {
                pageSize: 20
            },
            headerFilter: 
            {
                visible: true
            },
            rowDragging: {
                allowReordering: true,
                onReorder: function(e) {
                    var visibleRows = e.component.getVisibleRows(),
                        toIndex = pData.indexOf(visibleRows[e.toIndex].data),
                        fromIndex = pData.indexOf(e.itemData);
                        pData.splice(fromIndex, 1);
                        pData.splice(toIndex, 0, e.itemData);
                    console.log(e.component)
                    e.component.refresh();
                    console.log(pData)
                }
            },
            columns: [
            {  
                width: 50,
                caption: 'SIRA',
                cellTemplate: function(cellElement, cellInfo) {  
                    cellElement.text(cellInfo.row.rowIndex+1) 
                }  
            }, 
            {
                width: 150,
                dataField: "KODU",
                caption: "İş Emri No",
                alignment: "center"
            }, 
            {
                dataField: "ADI",
                caption: "İş Emri Adı",
                alignment: "center"
            },
            {
                width: 100,
                dataField: "PLANMIKTAR",
                caption: "Miktar",
                alignment: "center"
            },
            {
                dataField: "STOKKODU",
                caption: "Stok Kodu",
                alignment: "center"
            },
            {
                dataField: "STOKADI",
                caption: "Stok Adı",
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
                        text: "DETAYLAR",
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
                    },
                ]
            }]
        }).dxDataGrid("instance");
    }
    function GetDetail(pData)
    {
        $('#MdlIsEmriDetay').modal('show')
        $scope.IsEmriDetay.Kodu = pData.KODU
        $scope.IsEmriDetay.Adi = pData.ADI
        $scope.IsEmriDetay.Miktar = pData.PLANMIKTAR
        $scope.IsEmriDetay.StokAdi = pData.STOKADI
        $scope.IsEmriDetay.StokKodu = pData.STOKKODU
    }
}