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
  
    // state
    // (
    //     {
    //         name: 'main.KullaniciEkle',
    //         url: '/kullanici_ekle',
    //         templateUrl : "view/gunok/KullaniciEkle.html",
    //         controller:"KullaniciAyarlari"
    //     }
    // ).
    state
    (
        {
            name: 'main.Planlama',
            url: '/planlama',
            templateUrl : "view/gunok/Planlama.html",
            controller:"Planlama"
        }
    ).
    state
    (
        {
            name: 'main.Operator',
            url: '/operator',
            templateUrl : "view/gunok/Operator.html",
            controller:"Operator"
        }
    ).
    state
    (
        {
            name: 'main.UretimTamamlama',
            url: '/uretimtamamlama',
            templateUrl : "view/gunok/UretimTamamlama.html",
            controller:"UretimTamamlama"
        }
    ).
    state
    (
        {
            name: 'main.UploadPage',
            url: '/uploadpage',
            templateUrl : "view/gunok/UploadPage.html",
            controller:"UploadPage"
        }
    ).
    //KÜPPELİ
    state
    (
        {
            name: 'main.ResimYukleme',
            url:'/ResimYukleme',
            templateUrl:"view/kuppeli/ResimYukleme.html",
            controller:"ResimYukleme"
        }
    ).
    state
    (
        {
            name: 'main.KullaniciEkle',
            url: '/kullanici_ekle',
            templateUrl : "view/kuppeli/KullaniciEkle.html",
            controller:"KullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.KullaniciAyarlari',
            url: '/kullanici_ayarlari',
            templateUrl : "view/kuppeli/KullaniciAyarlari.html",
            controller:"KullaniciAyarlari"
        }
    ).
    state
    (
        {
            name: 'main.AltGrup',
            url: '/AltGrup',
            templateUrl : "view/kuppeli/AltGrup.html",
            controller:"AltGrup"
        }
    ).
    state
    (
        {
            name: 'main.AltGrup_2',
            url: '/AltGrup_2',
            templateUrl : "view/kuppeli/AltGrup_2.html",
            controller:"AltGrup_2"
        }
    ).
    state
    (
        {
            name: 'main.AnaGrup',
            url: '/AnaGrup',
            templateUrl : "view/kuppeli/AnaGrup.html",
            controller:"AnaGrup"
        }
    )
    .
    state
    (
        {
            name: 'main.ModelKodOlustur',
            url: '/ModelKodOlustur',
            templateUrl : "view/kuppeli/ModelKodOlustur.html",
            controller:"ModelKodOlustur"
        }
    ).
    state
    (
        {
            name: 'main.StokTanitim',
            url: '/StokTanitim',
            templateUrl : "view/kuppeli/StokTanitim.html",
            controller:"StokTanitim"
        }
    ).
    state
    (
        {
            name: 'main.Stoktanitim2',
            url: '/Stoktanitim2',
            templateUrl : "view/kuppeli/Stoktanitim2.html",
            controller:"Stoktanitim2"
        }
        
        )

    //AKİNCİ
    .
    state
    (
        {
            name: 'main.yilkoduolustur',
            url: '/yilkoduolustur',
            templateUrl : "view/akinlar/yilkoduolustur.html",
            controller:"yilkoductrl"
        }
 ).
 state
 (
     {
         name: 'main.Tabancinsikoduolustur',
         url: '/Tabancinsikoduolustur',
         templateUrl : "view/akinlar/Tabancinsikoduolustur.html",
         controller:"Tabancinsictrl"
     }
 )       
 .
 state
 (
     {
         name: 'main.Astarkoduolustur',
         url: '/Astarkoduolustur',
         templateUrl : "view/akinlar/Astarkoduolustur.html",
         controller:"Astarkoductrl"
     }
 ) .
 state
 (
     {
         name: 'main.Topukboyukoduolustur',
         url: '/Topukboyukoduolustur',
         templateUrl : "view/akinlar/Topukboyukoduolustur.html",
         controller:"Topukboyuctrl"
     }
 ) .
 state
 (
     {
         name: 'main.AltgrupAkinlar',
         url: '/AltgrupAkinlar',
         templateUrl : "view/akinlar/AltgrupAkinlar.html",
         controller:"AltgrupAkinlar"
     }
 ).
 state
 (
     {
         name: 'main.Anagrup_a',
         url: '/Anagrup_a',
         templateUrl : "view/akinlar/Anagrup_a.html",
         controller:"Anagrupctrl"
     }
 )  .
 state
 (
     {
         name: 'main.Materyal',
         url: '/Materyal',
         templateUrl : "view/akinlar/Materyal.html",
         controller:"MateryalCtrl"
     }
 )     .
 state
 (
     {
         name: 'main.Renk',
         url: '/Renk',
         templateUrl : "view/akinlar/Renk.html",
         controller:"Renk"
     }
 )  .
 state
 (
     {
         name: 'main.Kalite',
         url: '/Kalite',
         templateUrl : "view/akinlar/Kalite.html",
         controller:"KaliteCtrl"
     }
 )                                                 
 .
 state
 (
     {
         name: 'main.Model',
         url: '/Model',
         templateUrl : "view/akinlar/Model.html",
         controller:"Modelctrl"
     }
 )   .
 state
 (
     {
         name: 'main.Uretici',
         url: '/Uretici',
         templateUrl : "view/akinlar/Uretici.html",
         controller:"Ureticictrl"
     }
 )  .
 state
 (
     {
         name: 'main.Stokeimage',
         url: '/Stokeimage',
         templateUrl : "view/akinlar/Stokeimage.html",
         controller:"Stokeimage"
     }
 ) .
 state
 (
     {
         name: 'main.SiparisYazdir',
         url: '/SiparisYazdir',
         templateUrl : "view/akinlar/SiparisYazdir.html",
         controller:"SiparisYazdir"
     }
 ).
 state
 (
     {
         name: 'main.Siparisstokkontrol',
         url: '/Siparisstokkontrol',
         templateUrl : "view/akinlar/Siparisstokkontrol.html",
         controller:"Siparisstokkontrol"
     }
 ) .
 state
 (
     {
         name: 'main.StokTanitimi',
         url: '/StokTanitimi',
         templateUrl : "view/akinlar/StokTanitimi.html",
         controller:"StokTanitimi"
     }
     
 )
 //Rovigo 
//  .state
//  (
//      {
//          name: 'main.Yilkodu',
//          url: '/Yilkodu',
//          templateUrl : "view/Rovigo/Yilkodu.html",
//          controller:"Yilkodu"
//      }
//  ) .state

//  (
//      {
//          name: 'main.Tabancinsikodu',
//          url: '/Tabancinsikodu',
//          templateUrl : "view/Rovigo/Tabancinsikodu.html",
//          controller:"Tabancinsikodu"
//      }
//  ) .state

//  (
//      {
//          name: 'main.Astarkodu',
//          url: '/Astarkodu',
//          templateUrl : "view/Rovigo/Astarkodu.html",
//          controller:"Astarkodu"
//      }
//  )   .state

//  (
//      {
//          name: 'main.Topukboyu',
//          url: '/Topukboyu',
//          templateUrl : "view/Rovigo/Topukboyu.html",
//          controller:"Topukboyu"
//      }
//  )  
//  .state

//  (
//      {
//          name: 'main.Altgrup_1',
//          url: '/Altgrup_1',
//          templateUrl : "view/Rovigo/Altgrup_1.html",
//          controller:"Altgrup_1"
//      }
//  ) .state

//  (
//      {
//          name: 'main.Anagrup1',
//          url: '/Anagrup1',
//          templateUrl : "view/Rovigo/Anagrup1.html",
//          controller:"Anagrupctrl"
//      } 
//      )
//       .state

//      (
//          {
//              name: 'main.Renkkodu',
//              url: '/Renkkodu',
//              templateUrl : "view/Rovigo/Renkkodu.html",
//              controller:"Renkkodu"
//          }
//      ) 
//      .state

//      (
//          {
//              name: 'main.Materyal_R',
//              url: '/Materyal_R',
//              templateUrl : "view/Rovigo/Materyal_R.html",
//              controller:"Materyal_R"
//          }
//      ).state

//      (
//          {
//              name: 'main.Renkmodel',
//              url: '/Renkmodel',
//              templateUrl : "view/Rovigo/Renkmodel.html",
//              controller:"Renkmodel"
//          }
//      )  .state

//      (
//          {
//              name: 'main.Kalitekodu',
//              url: '/Kalitekodu',
//              templateUrl : "view/Rovigo/Kalitekodu.html",
//              controller:"Kalitekodu"
//          }
//      ).state

//      (
//          {
//              name: 'main.Uretici_R',
//              url: '/Uretici_R',
//              templateUrl : "view/Rovigo/Uretici_R.html",
//              controller:"Uretici_R"
//          }
//      ) .state

//      (
//          {
//              name: 'main.Stimage',
//              url: '/Stimage',
//              templateUrl : "view/Rovigo/Stimage.html",
//              controller:"Stimage"
//          }
//      )      
                
           
     
      
     
      

});











