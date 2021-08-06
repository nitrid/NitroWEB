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
                MonoMamulMalKabul : srv.GetParamValue($scope.Data,"MonoMamulMalKabul"),
                MonoYariMamulMalKabul : srv.GetParamValue($scope.Data,"MonoYariMamulMalKabul"),
                MonoBarkodEtiketBasimi : srv.GetParamValue($scope.Data,"MonoBarkodEtiketBasimi"),
                MonoKasaBarkodOlustur : srv.GetParamValue($scope.Data,"MonoKasaBarkodOlustur"),
                MonoFasonGiris : srv.GetParamValue($scope.Data,"MonoFasonGiris"),
                MonoElektrikUretim : srv.GetParamValue($scope.Data,"MonoElektrikUretim"),
                MonoBasarSayarBarkodOlustur : srv.GetParamValue($scope.Data,"MonoBasarSayarBarkodOlustur"),
                // Menü Yönetim
                MonoKullaniciAyarlari : srv.GetParamValue($scope.Data,"MonoKullaniciAyarlari"),
                MonoKullaniciEkle : srv.GetParamValue($scope.Data,"MonoKullaniciEkle"),
                // Menü Rapor
                MonoDepoTransferRaporu : srv.GetParamValue($scope.Data,"MonoDepoTransferRaporu"),
                MonoStokSeviyeleriRaporu : srv.GetParamValue($scope.Data,"MonoStokSeviyeleriRaporu"),
                MonoStokDepoGirisCikisRaporu : srv.GetParamValue($scope.Data,"MonoStokDepoGirisCikisRaporu"),
                // Parametre
                BarkodEtiketSeri : srv.GetParamValue($scope.Data,"BarkodEtiketSeri"),
                BasarSayarHasasTeraziIP : srv.GetParamValue($scope.Data,"BasarSayarHasasTeraziIP"),
                BasarSayarHasasTeraziPORT : srv.GetParamValue($scope.Data,"BasarSayarHasasTeraziPORT"),
                BasarSayarKantarIP : srv.GetParamValue($scope.Data,"BasarSayarKantarIP"),
                BasarSayarKantarPORT : srv.GetParamValue($scope.Data,"BasarSayarKantarPORT"),
                BasarSayarSeri : srv.GetParamValue($scope.Data,"BasarSayarSeri"),
                ElektrikUretimEtiketSeri : srv.GetParamValue($scope.Data,"ElektrikUretimEtiketSeri"),
                ElektrikUretimIsEmriFlag : srv.GetParamValue($scope.Data,"ElektrikUretimIsEmriFlag"),
                ElektrikUretimOperasyonSeri : srv.GetParamValue($scope.Data,"ElektrikUretimOperasyonSeri"),
                ElektrikUretimUrunCikisSeri : srv.GetParamValue($scope.Data,"ElektrikUretimUrunCikisSeri"),
                ElektrikUretimUrunGirisSeri : srv.GetParamValue($scope.Data,"ElektrikUretimUrunGirisSeri"),
                FasonCikisSeri : srv.GetParamValue($scope.Data,"FasonCikisSeri"),
                FasonDepo : srv.GetParamValue($scope.Data,"FasonDepo"),
                FasonEtiketSeri : srv.GetParamValue($scope.Data,"FasonEtiketSeri"),
                FasonGirisSeri : srv.GetParamValue($scope.Data,"FasonGirisSeri"),
                KasaBarkodSeri : srv.GetParamValue($scope.Data,"KasaBarkodSeri"),
                MamulEtiketSeri : srv.GetParamValue($scope.Data,"MamulEtiketSeri"),
                MamulMalKabulDepo : srv.GetParamValue($scope.Data,"MamulMalKabulDepo"),
                MontajDepo : srv.GetParamValue($scope.Data,"MontajDepo"),
                OperasyonSeri : srv.GetParamValue($scope.Data,"OperasyonSeri"),
                UrunCikisSeri : srv.GetParamValue($scope.Data,"UrunCikisSeri"),
                UrunGirisSeri : srv.GetParamValue($scope.Data,"UrunGirisSeri"),
                YariMamulDepo : srv.GetParamValue($scope.Data,"YariMamulDepo"),
                YariMamulEtiketSeri : srv.GetParamValue($scope.Data,"YariMamulEtiketSeri"),
                YariMamulGramKontrol : srv.GetParamValue($scope.Data,"YariMamulGramKontrol"),
                YariMamulGramYuzde : srv.GetParamValue($scope.Data,"YariMamulGramYuzde"),
                YariMamulIsEmriFlag : srv.GetParamValue($scope.Data,"YariMamulIsEmriFlag"),
                YariMamulManuelGiris : srv.GetParamValue($scope.Data,"YariMamulManuelGiris"),
                YariMamulOperasyonSeri : srv.GetParamValue($scope.Data,"YariMamulOperasyonSeri"),
                YariMamulUrunCikisSeri : srv.GetParamValue($scope.Data,"YariMamulUrunCikisSeri"),
                YariMamulUrunGirisSeri : srv.GetParamValue($scope.Data,"YariMamulUrunGirisSeri"),
                YariMamulMalKabulEtiket : srv.GetParamValue($scope.Data,"YariMamulMalKabulEtiket"),
                ElektrikMontajMalKabulEtiket : srv.GetParamValue($scope.Data,"ElektrikMontajMalKabulEtiket"),
                BarkodBasimiEtiket : srv.GetParamValue($scope.Data,"BarkodBasimiEtiket"),
                MamulMalKabulEtiket : srv.GetParamValue($scope.Data,"MamulMalKabulEtiket"),
                FasonGirisEtiket : srv.GetParamValue($scope.Data,"FasonGirisEtiket"),
                BasarSayarEtiket : srv.GetParamValue($scope.Data,"BasarSayarEtiket"),
                KasaEtiket : srv.GetParamValue($scope.Data,"KasaEtiket"),
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
                SatirBirlestir : srv.GetParamValue($scope.Data,"SatirBirlestir"),
            }
            resolve()
        });
    }
   

}