'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('RegisterCtrl', ['$scope', function($scope) {
      $scope.register = function(signupDetails){
         // to do 
      }
  }])
  .controller('CreateAdCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    
  }])
  .controller('EditProfileCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
      // variables
      $scope.businessInfo = {
          BusinessID: undefined,
          Name: undefined,
          ProviderID: user.current.user_id,
          EIN: undefined,
          GimbalID: undefined
      }
      
      $scope.addBusinessInfo = {
          BusinessID: undefined,
          Name: undefined,
          ProviderID: user.current.user_id,
          EIN: undefined,
          GimbalID: undefined
      }
      
      // functions
      $scope.businesses = null;
          $http.get("endpoints/get-businesses.php").success(function(data) {
              $scope.businesses = data;  
          }).error(function(error){
              console.log(error);
          });
      
      
      $scope.editBusiness = function(business) {
        console.log(business);
        $http.post("endpoints/add-business.php", business).success(function(response){
            console.log(response);
        }).error(function(error){
            console.log(error); 
        }); 
      }
      
      $scope.addBusiness = function() {
          var data = {
            BusinessID: $scope.addBusinessInfo.BusinessID, 
            Name: $scope.addBusinessInfo.Name,
            ProviderID: $scope.addBusinessInfo.ProviderID,
            EIN: $scope.addBusinessInfo.EIN,
            GimbalID: $scope.addBusinessInfo.GimbalID
          }
          console.log(data);
        $http.post("endpoints/add-business.php", data).success(function(response){
            console.log(response);
        }).error(function(error){
            console.log(error); 
        }); 
      }
  }])
  .controller('ViewAdHistoryCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
  
  }])