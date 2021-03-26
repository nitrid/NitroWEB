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
                query : //"DECLARE @UIDTABLE table([RECID] [int]) " + 
                        "INSERT INTO TERP_SOFOR (TC,ADI) " + 
                        //"OUTPUT INSERTED.[RECID] INTO @UIDTABLE " +
                        "VALUES ('112233','AA') "  
                        //"SELECT [RECID] FROM @UIDTABLE "
            }
            let x = await srv.Execute(m)
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
    $scope.Show = function()
    {
        $("#alo").modal("show");
    }
}