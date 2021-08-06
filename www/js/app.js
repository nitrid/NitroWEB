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
    //MONO MENU
    state
    (
        {
            name: 'main.MonoBasarSayarBarkodOlustur',
            url: '/mono_basar_sayar_barkod_olustur',
            templateUrl : "view/mono/MonoBasarSayarBarkodOlustur.html",
            controller:"MonoBasarSayarBarkodOlustur"
        }
    ).
    state
    (
        {
            name: 'main.MonoMamulMalKabul',
            url: '/mono_mamul_mal_kabul',
            templateUrl : "view/mono/MonoMamulMalKabul.html",
            controller:"MonoMamulMalKabul"
        }
    ).
    state
    (
        {
            name: 'main.MonoYariMamulBarkodIptal',
            url: '/mono_yari_mamul_barkod_iptal',
            templateUrl : "view/mono/MonoYariMamulBarkodIptal.html",
            controller:"MonoYariMamulBarkodIptal"
        }
    ).
    state
    (
        {
            name: 'main.MonoRafEtiketBasimi',
            url: '/mono_raf_etiket_basimi',
            templateUrl : "view/mono/MonoRafEtiketBasimi.html",
            controller:"MonoRafEtiketBasimi"
        }
    ).
    state
    (
        {
            name: 'main.MonoKasaBarkodOlustur',
            url: '/mono_kasa_barkod_olustur',
            templateUrl : "view/mono/MonoKasaBarkodOlustur.html",
            controller:"MonoKasaBarkodOlustur"
        }
    ).
    state
    (
        {
            name: 'main.MonoSiparisToplamaListesi',
            url: '/mono_siparis_toplama_listesi',
            templateUrl : "view/mono/MonoSiparisToplamaListesi.html",
            controller:"MonoSiparisToplamaListesi"
        }
    ).
    state
    (
        {
            name: 'main.MonoYariMamulMalKabul',
            url: '/mono_yari_mamul_mal_kabul',
            templateUrl : "view/mono/MonoYariMamulMalKabul.html",
            controller:"MonoYariMamulMalKabul"
        }
    ).
    state
    (
        {
            name: 'main.MonoBarkodEtiketBasimi',
            url: '/mono_barkod_etiket_basimi',
            templateUrl : "view/mono/MonoBarkodEtiketBasimi.html",
            controller:"MonoBarkodEtiketBasimi"
        }
    ).
    state
    (
        {
            name: 'main.MonoFasonGiris',
            url: '/mono_fason_giris',
            templateUrl : "view/mono/MonoFasonGiris.html",
            controller:"MonoFasonGiris"
        }
    ).
    state
    (
        {
            name: 'main.MonoElektrikUretim',
            url: '/mono_elektrik_uretim',
            templateUrl : "view/mono/MonoElektrikUretim.html",
            controller:"MonoElektrikUretim"
        }
    ).
    state
    (
        {
            name: 'main.MonoUretimDashboard',
            url: '/mono_uretim_dashboard',
            templateUrl : "view/mono/MonoUretimDashboard.html",
            controller:"MonoUretimDashboard"
        }
    ).
    state
    (
        {
            name: 'main.MonoKullaniciAyarlari',
            url: '/mono_kullanici_ayarlari',
            templateUrl : "view/mono/MonoKullaniciAyarlari.html",
            controller:"MonoKullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.MonoKullaniciEkle',
            url: '/mono_kullanici_ekle',
            templateUrl : "view/mono/MonoKullaniciEkle.html",
            controller:"MonoKullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.MonoDepoTransferRaporu',
            url: '/mono_depo_transfer_raporu',
            templateUrl : "view/mono/MonoDepoTransferRaporu.html",
            controller:"MonoDepoTransferRaporu"
        }
    ).
    state
    (
        {
            name: 'main.MonoStokSeviyeleriRaporu',
            url: '/mono_stok_seviyeleri_raporu',
            templateUrl : "view/mono/MonoStokSeviyeleriRaporu.html",
            controller:"MonoStokSeviyeleriRaporu"
        }
    ).
    state
    (
        {
            name: 'main.MonoStokDepoGirisCikisRaporu',
            url: '/mono_stok_depo_giris_cikis',
            templateUrl : "view/mono/MonoStokDepoGirisCikisRaporu.html",
            controller:"MonoStokDepoGirisCikisRaporu"
        }
    ).
    state
    (
        {
            name: 'main.MonoUretimSilme',
            url: '/mono_uretim_silme',
            templateUrl : "view/mono/MonoUretimSilme.html",
            controller:"MonoUretimSilme"
        }
    ).
    //GUNOK MENU
    state
    (
        {
            name: 'main.GunokKullaniciAyarlari',
            url: '/gunok_kullanici_ayarlari',
            templateUrl : "view/gunok/GunokKullaniciAyarlari.html",
            controller:"GunokKullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.GunokOperator',
            url: '/gunok_operator',
            templateUrl : "view/gunok/GunokOperator.html",
            controller:"GunokOperator"
        }
    ).
    state
    (
        {
            name: 'main.GunokPlanlama',
            url: '/gunok_planlama',
            templateUrl : "view/gunok/GunokPlanlama.html",
            controller:"GunokPlanlama"
        }
    )
});