function Login($scope,$state,srv)
{
    $scope.Init = async function()
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
            value : "FIRM",
            return : Param[0].Firma,
            defaultVal : Param[0].Firma
        }

        let TmpQuery = 
        {
            db: "MikroDB_V16",
            query : "SELECT * FROM TERP_NITROWEB_PARAM WHERE TYPE = @TYPE",
            param : ['TYPE'],
            type :  ['int'],
            value : ['0']
        }
        $scope.KullaniciList = await srv.Execute(TmpQuery)
    }
    function Login()
    {
        let TmpStatus = false;

        for (let i = 0; i < $scope.KullaniciList.length; i++) 
        {
            if($scope.KullaniciList[i].ACCOUNT == $scope.Kullanici && $scope.KullaniciList[i].VALUE == $scope.Sifre)
            {
                localStorage.setItem("LoginNo",(i))
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
        }
    }
}