angular.module('app.controller', ['angular.filter'])
.controller('Index',['$scope','$state','srv', Index])
.controller('Login',['$scope','$state','srv','$rootScope',Login])
.controller('Main',['$scope','$state','srv','$rootScope',Main])
// MONO
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
.controller('MonoDepoTransferRaporu', ['$scope', 'srv','$rootScope', MonoDepoTransferRaporu])
.controller('MonoStokSeviyeleriRaporu', ['$scope', 'srv','$rootScope', MonoStokSeviyeleriRaporu])
.controller('MonoStokDepoGirisCikisRaporu', ['$scope', 'srv','$rootScope', MonoStokDepoGirisCikisRaporu])
.controller('MonoUretimSilme', ['$scope', 'srv','$rootScope', MonoUretimSilme])
// GUNOK
.controller('KullaniciAyarlari', ['$scope', 'srv','$rootScope','$state', KullaniciAyarlari])
.controller('Operator', ['$scope', 'srv','$rootScope','$filter','$window', Operator])
.controller('Planlama', ['$scope', 'srv','$rootScope','$filter','$window', Planlama])
.controller('UretimTamamlama', ['$scope', 'srv','$rootScope','$filter', UretimTamamlama])
.controller('UploadPage', ['$scope', 'srv','$rootScope','$filter', UploadPage])
.controller('IstasyonDashboard', ['$scope', 'srv','$rootScope','$filter', IstasyonDashboard])
.controller('IsEmriIzleme', ['$scope', 'srv','$rootScope','$filter', IsEmriIzleme])
.controller('UretimDashboard', ['$scope', 'srv','$rootScope','$filter', UretimDashboard])