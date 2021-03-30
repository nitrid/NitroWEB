function Login($scope,$state,srv)
{
    
    $scope.Init = function()
    {
        $scope.Kullanici = ""
        $scope.Sifre = ""
        $scope.CmbFirma = 
        {
            datasource : 
            {
                db: "MikroDB_V16",
                query: "SELECT DB_kod AS FIRM FROM VERI_TABANLARI"
            },
            key : "FIRM",
            value : "FIRM"
        }
        
    }
    function Login()
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
    $scope.BtnLogin = function()
    {
        if($scope.Kullanici == '')
        {
            console.log("Lütfen Kullanıcı Adınızı Giriniz !")
            return;
        }
        if($scope.Sifre == '')
        {
            console.log("Lütfen Şifrenizi Giriniz !")
            return;
        }
        if(typeof $scope.CmbFirma.return == 'undefined')
        {
            console.log("Lütfen Firma Seçiniz !")
            return;
        }

        if(Login())
        {
            localStorage.setItem("login",btoa($scope.Kullanici))
            localStorage.setItem("firm",$scope.CmbFirma.return)
            $state.go('main');
        }
        else
        {
            console.log("geçersiz kullanıcı")
        }
    }
}