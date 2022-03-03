function Index ($scope,$state,srv)
{
    $scope.Init = async function()
    {
        let ConStatus = await srv.Connection()
        if(ConStatus)
        {
            if(localStorage.getItem("login") == null)
            {
                $state.go('login')
            }
            else
            {
                $state.go('main')
            }
        }
    }  

}