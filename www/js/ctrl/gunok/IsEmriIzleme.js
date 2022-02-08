function IsEmriIzleme($scope,srv,$rootScope,$filter)
{
    function IsEmriGetir()
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_IsEmriKodu AS [IS_EMRI_KODU], " +
                        "RtP_UrunKodu AS [URUN_KODU], " +
                        "ISNULL((SELECT MAX(Op_Aciklama) FROM URETIM_OPERASYONLARI WHERE Op_Kodu = RtP_OperasyonKodu),'') AS [OPERASYON_ADI], " +
                        "RtP_PlanlananMiktar AS [PLANLANAN_MIKTAR], " +
                        "RtP_TamamlananMiktar AS [TAMAMLANAN_MIKTAR], " +
                        "RtP_BozukMiktar AS [BOZUK_MIKTAR], " +
                        "RtP_PlanlananSure AS [PLANLANAN_SURE], " +
                        "RtP_TamamlananSure AS [TAMAMLANAN_SURE], " +
                        "CONVERT(NVARCHAR(50),Rtp_PlanlananBaslamaTarihi,102) AS [PLANLANAN_BASLAMA_TARIHI], " +
                        "CONVERT(NVARCHAR(50),Rtp_PlanlananBitisTarihi,102) AS [PLANLANAN_BITIS_TARIHI], " +
                        "CASE WHEN RtP_PlanlananMiktar = RtP_TamamlananMiktar THEN 'TAMAMLANMIŞ' ELSE 'TAMAMLANMAMIŞ' END AS [DURUM] " +
                        "FROM URETIM_ROTA_PLANLARI " +
                        "ORDER BY RtP_IsEmriKodu DESC " ,
            }

            $scope.IsEmriList = await srv.Execute(TmpQuery);

            resolve();
        });
    }
    function IsEmriGrid()
    {
        $("#TblIsEmriGrid").dxDataGrid({
            height: 800,
            dataSource: $scope.IsEmriList,
            columnMinWidth: 20,
            showBorders: true,
            sorting: 
            {
                mode: "none"
            },
            searchPanel: 
            {
                visible: true,
                highlightCaseSensitive: true,
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
            columns: 
            [
                {
                    dataField: "IS_EMRI_KODU",
                    caption: "İŞ EMRİ KODU",
                    alignment: "center"
                },
                {
                    dataField: "URUN_KODU",
                    caption: "ÜRÜN KODU",
                    alignment: "center"
                },
                {
                    dataField: "OPERASYON_ADI",
                    caption: "OPERASYON ADI",
                    alignment: "center"
                },
                {
                    dataField: "PLANLANAN_MIKTAR",
                    caption: "PLANLANAN MİKTAR",
                    alignment: "center"
                },
                {
                    dataField: "TAMAMLANAN_MIKTAR",
                    caption: "TAMAMLANAN MİKTAR",
                    alignment: "center"
                },
                {
                    dataField: "PLANLANAN_SURE",
                    caption: "PLANLANAN SÜRE",
                    alignment: "center"
                },
                {
                    dataField: "TAMAMLANAN_SURE",
                    caption: "TAMAMLANAN SÜRE",
                    alignment: "center"
                },
                {
                    dataField: "DURUM",
                    caption: "DURUM",
                    alignment: "center"
                },
            ],
            onSelectionChanged: function(e) 
            {
                e.component.repaint();
            },
            onRowPrepared(e) 
            {  
                if(e.rowType == 'data')
                {
                    if(e.data.PLANLANAN_MIKTAR == e.data.TAMAMLANAN_MIKTAR)
                    {
                        e.rowElement.css("background-color", "#4ef037");
                    }
                    else
                    {
                        e.rowElement.css("background-color", "#bef2ff");
                    }
                }
            },
        }).dxDataGrid("instance");
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "İŞ EMRİ İZLEME";
        $scope.IsEmriKodu = "";

        $scope.IsEmriList = [];

        await IsEmriGetir();
        IsEmriGrid();
    }
}