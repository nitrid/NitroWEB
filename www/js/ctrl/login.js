function Login($scope,$state,srv)
{
    
    $scope.Init = function()
    {
        $scope.Kullanici = "Admin"
        $scope.Sifre = "1"
        $scope.CmbFirma = 
        {
            datasource : 
            {
                db: "TEST",
                tag: "Firma"
            },
            key : "FIRM",
            value : "FIRM"
        }

        if($scope.Login())
        {
            localStorage.setItem("login",btoa($scope.Kullanici))
        }
        else
        {
            console.log("geçersiz kullanıcı")
        }
    }

    $scope.Login = function()
    {
        let TmpStatus = false;
        for (let i = 0; i < Param.length; i++) 
        {
            if(Param[i].Kullanici == $scope.Kullanici && Param[i].Sifre == $scope.Sifre)
            {
                TmpStatus = true;
            }
        }
        return TmpStatus;
    }
}