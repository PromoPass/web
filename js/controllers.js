'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function ($scope) {

  }])
  .controller('LoginCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
      $scope.login = (function() {
          $scope.$on('user.login', function() {
          var session_token = user.token();
            $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + session_token);
          var data = {};
          data.user_id = user.current.user_id;
          data.first_name = ""; //user.current.first_name;
          data.last_name = ""; //user.current.last_name;
          data.email = user.current.email;
            // add token to session cache table
            data.session_token = session_token; 
            $http.post("http://fendatr.com/api/v1/usercache", data)
            .success(function(response){
                //console.log(JSON.stringify(response) + ": added to user cache");
            }).error(function(error){
                console.log(error + ": error adding to user cache");
            });
          });
      });
  }]) 
  .controller('RegisterCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
      $scope.provider = {};
      $scope.provider.types = [ {"value": 'Bar'},
                                {"value": 'Cafe'},
                                {"value": 'Restaurant'} ];
      $scope.provider.typeList = [];
      $scope.provider.typeChecked = function(value) {
          var match = false;
          for (var i=0; i<$scope.provider.typeList.length; i++) {
              if($scope.provider.typeList[i].value == value) {
                  match = true;
              }
          }
          return match;
      };
      $scope.update = function(bool, type) {
        if(bool) {
            $scope.provider.typeList.push(type);
        } else {
            for(var i=0; i < $scope.provider.typeList.length; i++) {
                if($scope.provider.typeList[i].value == type.value) {
                    $scope.provider.typeList.splice(i,1);
                }
            }
        }
      };
      
      $scope.register = (function () {
          // update tables
          $scope.$on('user.login', function() {
            var session_token = user.token();
            $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + session_token);
            var data = {};
            data.user_id = user.current.user_id;
            data.first_name = ""; //user.current.first_name;
            data.last_name = ""; //user.current.last_name;
            data.email = user.current.email;

            //update provider_id table
            $http.post("http://fendatr.com/api/v1/provider", data)
            .success(function(response){
                //console.log(JSON.stringify(response));
                //console.log("Added provider to database!");
            }).error(function(error){
                console.log(error + ": could not add user to database");
            });
              
            // add provider's first business
            var dataBusiness = {};
            dataBusiness.name = $scope.provider.business; 
            dataBusiness.provider_id = user.current.user_id;
            dataBusiness.typeList = $scope.provider.typeList; 
            dataBusiness.gimbal_id = $scope.provider.gimbal_id; 
            console.log(dataBusiness);

            $http.post("http://fendatr.com/api/v1/business", dataBusiness)
            .success(function(response) {
                //console.log(JSON.stringify(response));
                console.log("Added business to database!");
            }).error(function(error) {
                console.log(error);
                console.log("Couldn't add business to database");
            });

            // add token to session cache table
            data.session_token = session_token; 
            $http.post("http://fendatr.com/api/v1/usercache", data)
            .success(function(response){
                //console.log(JSON.stringify(response) + ": added to user cache");
            }).error(function(error){
                console.log(error + ": error adding to user cache");
            });
          });
      }); 
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
