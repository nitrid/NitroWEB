function IstasyonDashboard($scope,srv,$rootScope,$filter)
{
    function IstasyonGetir()
    {
        return new Promise(async resolve => 
        {
            let TmpQuery = 
            {
                db: "{M}." + $scope.Firma,
                query : "SELECT " +
                        "RtP_OperasyonKodu AS [OPERASYON_KODU], " +
                        "ISNULL((SELECT MAX(Op_Aciklama) FROM URETIM_OPERASYONLARI WHERE Op_Kodu = RtP_OperasyonKodu),'') AS [OPERASYON_ADI], " +
                        "SUM(RtP_PlanlananMiktar) AS [PLANLANAN_MIKTAR], " +
                        "SUM(RtP_TamamlananMiktar) AS [TAMAMLANAN_MIKTAR] " +
                        "FROM URETIM_ROTA_PLANLARI " +
                        "GROUP BY RtP_OperasyonKodu " +
                        "ORDER BY RtP_OperasyonKodu " ,
            }

            $scope.IstasyonList = await srv.Execute(TmpQuery);

            console.log($scope.IstasyonList)

            resolve();
        });
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "İSTASYON İZLEME";

        $scope.IstasyonList = [];

        await IstasyonGetir();
    }
}