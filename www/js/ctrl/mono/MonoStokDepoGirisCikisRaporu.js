function MonoStokDepoGirisCikisRaporu($scope, srv, $rootScope)
{
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $rootScope.PageName = "DEPO GİRİŞ ÇIKIŞ RAPORU"
    }
}
