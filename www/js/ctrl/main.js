function Main($scope,$state,srv,$rootScope)
{
    $scope.Init = async function()
    {
        $scope.Firm = localStorage.getItem('firm');
        $scope.User = atob(localStorage.getItem('login'))
        $scope.LoginNo = localStorage.getItem('LoginNo')
        $rootScope.PageName = "ANA SAYFA"
        
        setInterval(() => 
        {
            srv.SafeApply($scope,function()
            {
                $scope.DateTime = moment().format('DD.MM.YYYY - h:mm:ss')
            })
        }, 1000);

        Menu();
        if(srv.SocketConnected)
        {
            $scope.Menu = await srv.Execute($scope.Firm,'GetParam',['1',$scope.User])
            console.log($scope.Menu)
            $scope.MenuYonetim = await srv.Execute($scope.Firm,'GetParam',['2',$scope.User])
            $scope.MenuRapor = await srv.Execute($scope.Firm,'GetParam',['3',$scope.User])

            //******  YÖNETİM  ******//

            let TmpHtmlYonetim = ""
            let Sayac = 0

            TmpHtmlYonetim += '<li><a class="dropdown-item" href="#"> Yönetim &raquo; </a><ul class="submenu dropdown-menu"> '
            for(let j = 0; j < $scope.MenuYonetim.length; j++)
            {
                if($scope.MenuYonetim[j].VALUE == "true")
                {
                    TmpHtmlYonetim += '<li><a class="dropdown-item" ui-sref="' + 'main.' + $scope.MenuYonetim[j].TAG +'" href="">' + $scope.MenuYonetim[j].SPECIAL +'</a></li>' 
                    Sayac++;
                }
            }
            TmpHtmlYonetim += '</ul></li>'
            if(Sayac == 0)
            {
                TmpHtmlYonetim = ""
            }

            //******  RAPOR  ******//

            let TmpHtmlRapor = ""
            let Sayac2 = 0

            TmpHtmlRapor += '<li><a class="dropdown-item" href="#"> Rapor &raquo; </a><ul class="submenu dropdown-menu">'
            for(let x = 0; x < $scope.MenuRapor.length; x++)
            {
                if($scope.MenuRapor[x].VALUE == "true")
                {
                    TmpHtmlRapor += '<li><a class="dropdown-item" ui-sref="' + 'main.' + $scope.MenuRapor[x].TAG +'" href="">' + $scope.MenuRapor[x].SPECIAL +'</a></li>' 
                    Sayac2++;
                }
            }
            TmpHtmlRapor += '</ul></li>'
            if(Sayac2 == 0)
            {
                TmpHtmlRapor = ""
            }

            //******  ANA MENÜ - SUBMENU  ******//

            let TmpHtml = "";
            TmpHtml += '<li class="nav-item dropdown">'
            TmpHtml += '<a class="nav-link dropdown-toggle yaziayari" data-bs-toggle="dropdown"> GÜNOK </a>'
            
            TmpHtml += '<ul class="dropdown-menu">'
            for (let i = 0; i < $scope.Menu.length; i++) 
            {
                if($scope.Menu[i].VALUE == "true")
                {
                    TmpHtml += '<li><a class="dropdown-item" ui-sref="' + 'main.' + $scope.Menu[i].TAG +'" href="">' + $scope.Menu[i].SPECIAL +'</a></li>'
                }
            }
            TmpHtml += TmpHtmlYonetim 
            TmpHtml += TmpHtmlRapor
            TmpHtml += '</ul></li>'
            $scope.Html = {};
            $scope.Html.Menu = TmpHtml

            await GetParamList($scope.User)
            
            
            $state.go("main."+$rootScope.GeneralParamList.AcilisSayfasi)
        }
    }
    $scope.BtnExit = function()
    {
        localStorage.removeItem('firm')
        localStorage.removeItem('login')
        localStorage.removeItem('LoginNo')
        $state.go('login')
    }
    function Menu()
    {
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });

        if ($(window).width() < 992) {
            $('.dropdown-menu a').click(function(e){
                e.preventDefault();
                if($(this).next('.submenu').length){
                    $(this).next('.submenu').toggle();
                }
                $('.dropdown').on('hide.bs.dropdown', function () {
                $(this).find('.submenu').hide();
                })
            });
        }
        
    }
    async function GetParamList(pKullanici)
    {
        return new Promise(async resolve => 
        {
            $scope.Data = await srv.Execute($scope.Firm,'GetKullanici',[pKullanici])

            $rootScope.GeneralParamList = 
            {
                // Kullanıcı
                Password : srv.GetParamValue($scope.Data,"Password"),
                Kullanici : srv.GetParamValue($scope.Data,"Kullanici"),
                // Menü
                Operator : srv.GetParamValue($scope.Data,"Operator"),
                Planlama : srv.GetParamValue($scope.Data,"Planlama"),
                UretimTamamlama : srv.GetParamValue($scope.Data,"UretimTamamlama"),
                UretimDashboard : srv.GetParamValue($scope.Data,"UretimDashboard"),
                // Menü Yönetim
                KullaniciAyarlari : srv.GetParamValue($scope.Data,"KullaniciAyarlari"),
                KullaniciEkle : srv.GetParamValue($scope.Data,"KullaniciEkle"),
                UretimSilme : srv.GetParamValue($scope.Data,"UretimSilme"),
                // Parametre
                OperasyonKodu : srv.GetParamValue($scope.Data,"OperasyonKodu"),
                IsEmriOnayDurumu : srv.GetParamValue($scope.Data,"IsEmriOnayDurumu"),
                KapananIsEmri : srv.GetParamValue($scope.Data,"KapananIsEmri"),
                TasarimYolu : srv.GetParamValue($scope.Data,"TasarimYolu"),
                Tasarim : srv.GetParamValue($scope.Data,"Tasarim"),
                OperasyonSeri : srv.GetParamValue($scope.Data,"OperasyonSeri"),
                UrunCikisSeri : srv.GetParamValue($scope.Data,"UrunCikisSeri"),
                UrunGirisSeri : srv.GetParamValue($scope.Data,"UrunGirisSeri"),
                // Sistem
                AcilisSayfasi : srv.GetParamValue($scope.Data,"AcilisSayfasi"),
                Firma : srv.GetParamValue($scope.Data,"Firma"),
                FirmaListe : srv.GetParamValue($scope.Data,"FirmaListe"),
                KiloBaslangic : srv.GetParamValue($scope.Data,"KiloBaslangic"),
                KiloCarpan : srv.GetParamValue($scope.Data,"KiloCarpan"),
                KiloFlag : srv.GetParamValue($scope.Data,"KiloFlag"),
                KiloUzunluk : srv.GetParamValue($scope.Data,"KiloUzunluk"),
                MikroId : srv.GetParamValue($scope.Data,"MikroId"),
                PlasiyerKodu : srv.GetParamValue($scope.Data,"PlasiyerKodu"),
                StokEksiyeDusme : srv.GetParamValue($scope.Data,"StokEksiyeDusme"),
                SatirBirlestir : srv.GetParamValue($scope.Data,"SatirBirlestir"),
            }

            resolve()
        });
    }
}