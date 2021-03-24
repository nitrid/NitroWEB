angular.module("app",
[
    //'ngRoute',
    'app.controller',
    'ui.router'
])
.config(function($stateProvider)
{       
    // $routeProvider
    // .when("/",
    // {
    //     templateUrl : "view/test.html"
    // }) 

    var helloState = 
    {
        name: 'hello',
        url: '/hello',
        templateUrl : "view/test.html"
    }

    var aboutState = 
    {
        name: 'hello.about',
        url: '/about',
        templateUrl : "view/x.html"
    }

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});