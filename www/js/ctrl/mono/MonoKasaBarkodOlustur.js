function MonoKasaBarkodOlustur($scope, srv)
{
    function InitObj()
    {
        $scope.BtnStokList =
        {
            title: "Stok Seçimi",
            datasource:
            {
                db: "{M}." + $scope.Firma,
                query: ""
            },
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
                    width: 200
                },
                {
                    dataField: "BIRIM",
                    width: 100
                },
            ],
             onClick: async function (pStatus)
             {
                TmpQuery = "SELECT " +
                                "bar_kodu AS [BARKOD], " +
                                "bar_stokkodu AS [KODU], " +
                                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = bar_stokkodu),'') AS [ADI], " +
                                "(SELECT dbo.fn_StokBirimi(bar_stokkodu,bar_birimpntr)) AS [BIRIM] " +
                                "FROM BARKOD_TANIMLARI "

                $scope.BtnStokList.datasource.query = TmpQuery;
                pStatus(true)
            },
            onSelected: async function (pData) {
                if (typeof pData != 'undefined') {
                    $scope.LblBarkod = pData.BARKOD;
                    $scope.LblStokKodu = pData.KODU;
                    $scope.LblAdi = pData.ADI;
                }
            }
        }
        $scope.CmbEtiketTasarim = 
        {
            datasource : 
            {
                data : $scope.Param.Mono.KasaBarkodOlusturEtiket
            },
            key : "special",
            value : "name",
            defaultVal : "1",
            selectionMode : "key",
            return : "",
            onSelected : function(pSelected)
            {
                $scope.CmbEtiketTasarim.return = pSelected
            }
        } 
    }
        $scope.Init = function ()
        {
            $scope.Firma = localStorage.getItem('firm');
            $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
            InitObj()
            
        }
}


