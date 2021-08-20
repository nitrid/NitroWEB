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
                db: "MikroDB_V15",
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
            swal("Hatalı Giriş!", "Lütfen Kullanıcı Adı Giriniz",icon="error");
            return;
        }
        if($scope.Sifre == '')
        {
            swal("Hatalı Giriş!", "Lütfen Şifre Giriniz",icon="error");
            return;
        }
        if(typeof $scope.CmbFirma.return == 'undefined')
        {
            swal("Hatalı Giriş!", "Lütfen Firma Seçiniz",icon="error");
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
            swal("Hatalı Giriş!", "Kullanıcı Adı veya Şifre Yanlış!",icon="error");
            // console.log("geçersiz kullanıcı")
        }
    }
}