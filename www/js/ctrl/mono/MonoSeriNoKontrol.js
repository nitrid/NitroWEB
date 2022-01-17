function MonoSeriNoKontrol($scope, srv, $rootScope) 
{
    function InitObj() 
    {
        $scope.BteSeriNo = 
        {            
            title : "",
            txt : "",
            datasource : 
            {
                db : "{M}." + $scope.Firma,
                query : " SELECT chz_serino AS SERINO, chz_stok_kodu AS KODU, (SELECT sto_isim FROM STOKLAR WHERE sto_kod = chz_stok_kodu) AS ADI FROM STOK_SERINO_TANIMLARI" 
                        
            },
            selection : "SERINO",
            columns :
            [
                {                 
                    title : "SERI NO",   
                    dataField: "SERINO",
                    width: 200
                }, 
                {                    
                    dataField: "ADI",
                    width: 200
                }, 
                {
                    title : "KODU",
                    dataField: "KODU",
                    width: 200
                }, 
            ],
            onSelected : async function(pData)
            {
                $scope.SeriNoGetir(pData.SERINO)
            }
        }
    }
    // function InitGrd(pData)
    // {
    //     $("#GrdList").dxDataGrid
    //     (
    //         {
    //             dataSource: pData,
    //             allowColumnResizing: true,
    //             height: 350,
    //             width: "100%",
    //             columnWidth: 100,
    //             selection: 
    //             {
    //                 mode: "single"
    //             },
    //             editing: {
    //                 mode: "row",
    //                 allowDeleting: true,
    //                 useIcons: true
    //             },
    //             columns :
    //             [
    //                 {
    //                     width: 100,
    //                     type: "buttons",
    //                     buttons: ["delete",{
    //                     }]
    //                 },
    //                 {
    //                     dataField: "IS EMRI",
    //                     name : "ISEMRI",
    //                     width: 150
    //                 }, 
    //                 {
    //                     caption : "STOKKOD",
    //                     dataField: "STOKKOD",
    //                     width: 200
    //                 }, 
    //                 {
    //                     dataField: "STOKADI",
    //                     width: 500
    //                 }, 
    //                 {
    //                     dataField: "MIKTAR",
    //                     width: 100
    //                 },             
    //             ],
    //             hoverStateEnabled: true,
    //             showBorders: true,
    //             paging: 
    //             {
    //                 pageSize: 10
    //             },
    //             filterRow: 
    //             {
    //                 visible: true,
    //                 applyFilter: "auto"
    //             },
    //             headerFilter: 
    //             {
    //                 visible: true
    //             },
    //             onSelectionChanged: function (selectedItems) 
    //             {
    //                 SelectionRow = selectedItems.selectedRowsData[0];
    //             },
    //             onRowRemoved: async function(e) 
    //             {
    //                 await UretimSil(e.data)
    //             },
    //         }
    //     )
    // }
    async function UretimSil(pData)
    {
        let DeleteData = [
            pData.ISEMRI
        ]
        await srv.Execute($scope.Firma,'DeleteUretim',DeleteData);
        await srv.Execute($scope.Firma,'DeleteOperasyon',DeleteData);
        await srv.Execute($scope.Firma,'UpdateMalzemePlani',DeleteData);
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "SERİ NO KONTROL"
        $scope.SeriNo = '' 
        $scope.OlusturmaTarih = '' 
        $scope.OlusturmaEvrak = '' 
        $scope.SatisTarih = '' 
        $scope.SatisEvrak = '' 
        $scope.CariAdi = '' 



        InitObj()

    }   
    $scope.SeriNoGetir = async function(pKodu)
    {
        let TmpQuery = 
        {
            db: "{M}." + $scope.Firma,
            query : "SELECT  chz_serino AS SERINO, " +
            "CONVERT(VARCHAR,chz_al_tarih,104) AS ALTARIH, " +
            " chz_al_evr_seri + ' - ' + CONVERT(VARCHAR,chz_al_evr_sira) AS ALISEVRAK, " +
            "ISNULL((SELECT TOP 1 CONVERT(VARCHAR,sth_tarih,104) FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = chz_st_evr_seri and sth_evrakno_sira = chz_st_evr_sira and sth_evraktip = 1),'') AS  SATTARIH ," +
            " chz_st_evr_seri + ' - ' + CONVERT(VARCHAR,chz_st_evr_sira) AS SATISEVRAK, " +
            "ISNULL((Select TOP 1 cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = (SELECT TOP 1 sth_cari_kodu FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = chz_st_evr_seri and sth_evrakno_sira = chz_st_evr_sira and sth_evraktip = 1)),'') AS CARIADI " +
            "FROM  STOK_SERINO_TANIMLARI WHERE chz_serino = @chz_serino " ,
            param : ['chz_serino:string|50'],
            value : [pKodu]
        }
        let TmpData = await srv.Execute(TmpQuery)
        console.log(TmpData)  
        if(TmpData.length > 0)
        {
            $scope.SeriNo = TmpData[0].SERINO
            $scope.OlusturmaTarih = TmpData[0].ALTARIH
            $scope.OlusturmaEvrak = TmpData[0].ALISEVRAK
            $scope.SatisTarih = TmpData[0].SATTARIH
            $scope.SatisEvrak = TmpData[0].SATISEVRAK
            $scope.CariAdi = TmpData[0].CARIADI

        }
        else
        {
            swal("Dikkat", "Seri No Bulunamadı  .",icon="warning");
            $scope.SeriNo = '' 
            $scope.OlusturmaTarih = '' 
            $scope.OlusturmaEvrak = '' 
            $scope.SatisTarih = '' 
            $scope.SatisEvrak = '' 
            $scope.CariAdi = '' 
        }
    }
    
}
