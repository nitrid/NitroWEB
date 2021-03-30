function Index ($scope,$state,srv)
{
    $scope.Init = async function()
    {
<<<<<<< Updated upstream

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
=======
        $state.go('login')
    }
>>>>>>> Stashed changes
}