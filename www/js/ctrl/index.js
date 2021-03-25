function Index ($scope,$state)
{
    $scope.Init = function()
    {
        $state.go('main')
    }
}