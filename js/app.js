'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'UserApp'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', login: true, controller: 'LoginCtrl'});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', public: true, controller: 'RegisterCtrl'});
  $routeProvider.when('/verify-email', {templateUrl: 'partials/verify-email.html', verify_email: true});
  $routeProvider.when('/reset-password', {templateUrl: 'partials/reset-password.html', public: true});
  $routeProvider.when('/set-password', {templateUrl: 'partials/set-password.html', set_password: true});
  $routeProvider.when('/articles', {templateUrl: 'partials/articles.html', controller: 'ArticlesCtrl'});
  $routeProvider.when('/edit-profile', {templateUrl: 'partials/edit-profile.html', controller: 'EditProfileCtrl'});
  $routeProvider.when('/create-ad', {templateUrl: 'partials/create-ad.html', controller: 'CreateAdCtrl'});
  $routeProvider.when('/view-adhistory', {templateUrl: 'partials/view-adhistory.html', controller: 'ViewAdHistoryCtrl'});
  
  $routeProvider.otherwise({redirectTo: '/'});
  
}]).
run(function($rootScope, $http, user) {
    user.init({ appId: appid });
    $rootScope.$on('user.logout', function() {
        var data = {};
        data.session_token = $http.defaults.headers.common.Authorization.split(" ").splice(-1)[0].slice(0, -1);
        data.session_token = atob(data.session_token).slice(1);
        
        // remove session from usercache table
        $http.delete("http://fendatr.com/api/v1/usercache/" + data.session_token)
        .success(function(response){
            //console.log(response + ": removed");
        }).error(function(error){
            //console.log(error + ": removal unsuccessful");
        })
        $http.defaults.headers.common.Authorization = null;
    }); 
});
