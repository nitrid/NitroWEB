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
            name: 'main.MonoElektrikMontajUretim',
            url: '/mono_elektrik_montaj_uretim',
            templateUrl : "view/mono/MonoElektrikMontajUretim.html",
            controller:"MonoElektrikMontajUretim"
        }
    ).
    //DIAN MENU
    state
    (
        {
            name: 'main.DianStokMaliyetOperasyonu',
            url: '/dian_stok_maliyet_operasyon',
            templateUrl : "view/dian/DianStokMaliyetOperasyonu.html",
            controller:"DianStokMaliyetOperasyonu"
        }
    ).
    state
    (
        {
            name: 'main.DianSatilanMalinMaliyeti',
            url: '/dian_satilan_malin_maliyeti',
            templateUrl : "view/dian/DianSatilanMalinMaliyeti.html",
            controller:"DianSatilanMalinMaliyeti"
        }
    )
});