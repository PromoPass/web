var app = angular.module("PromoPass", ["ui.router"]);

app.config(function($stateProvider){
    $stateProvider
        .state("login", {
        url:"/",
        controller: "LoginController",
        templateUrl: "views/login.html"
        })
        
        .state("application", {
        url:"/app",
        controller: "MainController",
        templateUrl: "views/application.html"
        })
})