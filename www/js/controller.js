angular.module('app.controller', [])
.controller('Index',['$scope','$state','srv',Index])
.controller('Login',['$scope','$state','srv',Login])
.controller('Main',['$scope','$state','srv',Main])
.controller('MonoBasarSayarBarkodOlustur',['$scope','srv',MonoBasarSayarBarkodOlustur])
.controller('MonoMamulMalKabul', ['$scope', 'srv', MonoMamulMalKabul])
.controller('MonoYariMamulBarkodIptal', ['$scope', 'srv', MonoYariMamulBarkodIptal])
.controller('MonoRafEtiketBasimi', ['$scope', 'srv', MonoRafEtiketBasimi])
.controller('MonoKasaBarkodOlustur', ['$scope', 'srv', MonoKasaBarkodOlustur])
.controller('MonoSiparisToplamaListesi', ['$scope', 'srv', MonoSiparisToplamaListesi])
.controller('MonoYariMamulMalKabul', ['$scope', 'srv', MonoYariMamulMalKabul])
.controller('MonoBarkodEtiketBasimi',['$scope','srv',MonoBarkodEtiketBasimi])
.controller('MonoFasonGiris',['$scope','srv',MonoFasonGiris])
.controller('DianStokMaliyetOperasyonu',['$scope','srv',DianStokMaliyetOperasyonu])
.controller('MonoElektrikMontajUretim', ['$scope', 'srv', MonoElektrikMontajUretim])
