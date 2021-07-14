function MonoDepoTransferRaporu($scope, srv, $rootScope)
{
    function InitDatePicker()
    {
        var start = new Date();
        start.setHours(9);
        start.setMinutes(0);

        $('#BasTarih').datepicker({
            timepicker: true,
            language: 'tr',
            startDate: start,
            minHours: 0,
            maxHours: 24,
            onSelect: function (fd, d, picker) {
                $scope.BaslangicData = fd.split(" ")
            }
        })

        $('#BitTarih').datepicker({
            timepicker: true,
            language: 'tr',
            startDate: start,
            minHours: 0,
            maxHours: 24,
            onSelect: function (fd, d, picker) {
                $scope.BitisData = fd.split(" ")
            }
        })
    }
    $scope.Init = async function () 
    {
        $scope.Firma = localStorage.getItem('firm');
        $scope.Param = srv.GetParam(atob(localStorage.getItem('login')));
        $scope.SaatDurum = true
        $scope.BaslangicData = ""
        $scope.BitisData = ""
        $rootScope.PageName = "DEPO TRANSFER RAPORU"

        InitDatePicker()
    }
    $scope.BtnGetir = function()
    {
        if($scope.SaatDurum == true)
        {
            console.log($scope.BaslangicData[0])
            console.log($scope.BaslangicData[1]) 

            console.log($scope.BitisData[0])
            console.log($scope.BitisData[1]) 
        }
        else
        {
            console.log($scope.BaslangicData[0])
            console.log($scope.BitisData[0])

        }
    }
}