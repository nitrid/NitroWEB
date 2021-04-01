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
    )
});