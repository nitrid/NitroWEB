function Index ($scope,$state,srv)
{
    $scope.Init = async function()
    {

        let ConStatus = await srv.Connection()
        
        if(ConStatus)
        {
            $scope.BteTest = 
            {
                title : "MODAL 1",
                datasource : 
                {
                    //data : [{sto_kod : '001',sto_isim: 'KALEM'}]
                    db: "{M}.TEST",
                    // tag: "StokGetir",
                    // values: ['','',0,'']
                    query:"SELECT sto_kod AS KODU,sto_isim AS ADI FROM STOKLAR"
                },
                selection : "ADI",
                columns :
                [
                    {
                        caption: "STOK KODU",
                        dataField: "KODU",
                        width: 150
                    }, 
                    {
                        dataField: "ADI",
                        width: 500
                    }, 
                    {
                        dataField: "BARKOD",
                        width: 100
                    }, 
                    {
                        dataField: "DEPOMIKTAR",
                        width: 100
                    }, 
                ],
                onSelected : function(pData)
                {
                    console.log(pData)
                }
            }
            // let m = 
            // {
            //     db: '{M}.TEST',
            //     query : //"DECLARE @UIDTABLE table([RECID] [int]) " + 
            //             "INSERT INTO TERP_SOFOR (TC,ADI) " + 
            //             //"OUTPUT INSERTED.[RECID] INTO @UIDTABLE " +
            //             "VALUES ('112233','AA') "  
            //             //"SELECT [RECID] FROM @UIDTABLE "
            // }
            // let x = await srv.Execute(m)
            // console.log(x)
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