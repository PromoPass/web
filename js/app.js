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
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', login: true});
  $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', public: true});
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
    $rootScope.$on('user.login', function() {
        $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + user.token());
        var data = user.current;
        
        // testing statements
        console.log(data);
        //console.log($http.defaults.headers.common.Authorization); 
        
        //update provider_id table
        $http.post("endpoints/register.php", data)
        .success(function(response){
            // console.log(response);
        }).error(function(error){
            //console.log(error);
            console.log("Could not add user to database"); 
        });
        
        // add token to session cache table
        /*
        $http.post("endpoints/update-cache.php", data)
        .success(function(response){
        }).error(function(error){
            console.log("Could not succeessfully add to cached database");
        });
        */
    });
    $rootScope.$on('user.logout', function() {
        $http.defaults.headers.common.Authorization = null;
        
        // remove token from session cache table
        /* SEE EXAMPLE FROM ABOVE (UPDATE CACHE)
            will probably look a lot like that, but let'SEE
            just make this TODO
        */
        console.log("logged out"); 
    }); 
});
