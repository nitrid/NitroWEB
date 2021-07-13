angular.module('app.controller', [])
.controller('Index',['$scope','$state','srv', Index])
.controller('Login',['$scope','$state','srv','$rootScope',Login])
.controller('Main',['$scope','$state','srv','$rootScope',Main])
.controller('MonoBasarSayarBarkodOlustur',['$scope','srv','$rootScope',MonoBasarSayarBarkodOlustur])
.controller('MonoMamulMalKabul', ['$scope', 'srv','$rootScope', MonoMamulMalKabul])
.controller('MonoYariMamulBarkodIptal', ['$scope', 'srv','$rootScope', MonoYariMamulBarkodIptal])
.controller('MonoRafEtiketBasimi', ['$scope', 'srv','$rootScope', MonoRafEtiketBasimi])
.controller('MonoKasaBarkodOlustur', ['$scope', 'srv','$rootScope', MonoKasaBarkodOlustur])
.controller('MonoSiparisToplamaListesi', ['$scope', 'srv','$rootScope', MonoSiparisToplamaListesi])
.controller('MonoYariMamulMalKabul', ['$scope', 'srv','$rootScope', MonoYariMamulMalKabul])
.controller('MonoBarkodEtiketBasimi',['$scope','srv','$rootScope', MonoBarkodEtiketBasimi])
.controller('MonoFasonGiris',['$scope','srv','$rootScope', MonoFasonGiris])
.controller('MonoElektrikUretim', ['$scope', 'srv','$rootScope', MonoElektrikUretim])
.controller('MonoUretimDashboard',['$scope','srv','$rootScope', MonoUretimDashboard])
.controller('MonoKullaniciAyarlari',['$scope','srv','$rootScope','$state', MonoKullaniciAyarlari])
.controller('DianStokMaliyetOperasyonu',['$scope','srv','$rootScope', DianStokMaliyetOperasyonu])
.controller('DianSatilanMalinMaliyeti',['$scope','srv','$rootScope', DianSatilanMalinMaliyeti])