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
    state
    (
        {
            name: 'main.MonoMalKabul',
            url: '/mono_mal_kabul',
            templateUrl : "view/mono/MonoMalKabul.html",
            controller:"MonoMalKabul"
        }
    ).
    state
    (
        {
            name: 'main.MonoUretimParcalama',
            url: '/mono_uretim_parcalama',
            templateUrl : "view/mono/MonoUretimParcalama.html",
            controller:"MonoUretimParcalama"
        }
    ).
    state
    (
        {
            name: 'main.MonoParcaliUretim',
            url: '/mono_parcali_uretim',
            templateUrl : "view/mono/MonoParcaliUretim.html",
            controller:"MonoParcaliUretim"
        }
    ).
    state
    (
        {
            name: 'main.MonoSeriNoKontrol',
            url: '/mono_seri_no_kontrol',
            templateUrl : "view/mono/MonoSeriNoKontrol.html",
            controller:"MonoSeriNoKontrol"
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