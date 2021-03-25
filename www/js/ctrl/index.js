function Index ($scope,$state,srv)
{
    $scope.Init = async function()
    {
        let ConStatus = await srv.Connection()
        
        if(ConStatus)
        {
            let m = 
            {
                db: '{M}.TEST',
                query : "SELECT * FROM STOKLAR"
            }
            let x = await srv.Execute()
            console.log(x)
            // if(localStorage.getItem("login") == null)
            // {
            //     $state.go('login')
            // }
            // else
            // {
            //     $state.go('main')
            // }
        }
    }    
}