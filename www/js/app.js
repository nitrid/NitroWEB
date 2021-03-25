angular.module("app",
[
    'app.controller',
    'ui.router'
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
    )
});