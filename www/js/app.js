angular.module("app",
[
    'app.controller',
    'ui.router',
    'app.srv',
    'app.compile'
])

.config(function($stateProvider)
{       
    $stateProvider.state
    (
        {
            name: 'login',
            url: '/login',
            templateUrl : "view/login.html",
            controller:"Login"
        }
    ).
    state
    (
        {
            name: 'main',
            url: '/main',
            templateUrl : "view/main.html",
            controller:"Main"
        }
    ).
    state
    (
        {
            name: 'main.ResimYukleme',
            url:'/ResimYukleme',
            templateUrl:"view/ResimYukleme.html",
            controller:"ResimYukleme"
        }
    ).
    state
    (
        {
            name: 'main.KullaniciEkle',
            url: '/kullanici_ekle',
            templateUrl : "view/KullaniciEkle.html",
            controller:"KullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.KullaniciAyarlari',
            url: '/kullanici_ayarlari',
            templateUrl : "view/KullaniciAyarlari.html",
            controller:"KullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.AltGrup',
            url: '/AltGrup',
            templateUrl : "view/AltGrup.html",
            controller:"AltGrup"
        }
    ).
    state
    (
        {
            name: 'main.AltGrup_2',
            url: '/AltGrup_2',
            templateUrl : "view/AltGrup_2.html",
            controller:"AltGrup_2"
        }
    ).
    state
    (
        {
            name: 'main.AnaGrup',
            url: '/AnaGrup',
            templateUrl : "view/AnaGrup.html",
            controller:"AnaGrup"
        }
    ).
    state
    (
        {
            name: 'main.ModelKodOlustur',
            url: '/ModelKodOlustur',
            templateUrl : "view/ModelKodOlustur.html",
            controller:"ModelKodOlustur"
        }
    ).
    state
    (
        {
            name: 'main.StokTanitim',
            url: '/StokTanitim',
            templateUrl : "view/StokTanitim.html",
            controller:"StokTanitim"
        }
    )

});











