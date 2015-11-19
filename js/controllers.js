'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function ($scope) {

  }])
  .controller('LoginCtrl', ['$scope', '$http', 'user', '$window', 'UserService', function($scope, $http, user, $window, UserService) {
      $scope.login = (function() {
          $scope.$on('user.login', function() {
          var session_token = user.token();
            $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + session_token);
          var data = {};
          data.user_id = user.current.user_id;
          data.first_name = ""; //user.current.first_name;
          data.last_name = ""; //user.current.last_name;
          data.email = user.current.email;
            
            data.session_token = session_token; 
            $http.post("http://fendatr.com/api/v1/usercache", data)
            .success(function(response){
                // add token to session cache table
                // Please figure out how to deprecate THIS
                // with the introduction of UserService
                //console.log(JSON.stringify(response) + ": added to user cache");
                
            }).error(function(error){
                console.log(error + ": error adding to user cache");
            });
            // add token to session storage PLEASE REMOVE ALL DEPENDENCY ON
            // THIS TO USE "USERSERVICE INSTEAD
            $window.sessionStorage.token = user.current.user_id;
            // Add information to userService
            // see http stuff above
          });
      });
  }]) 
  .controller('RegisterCtrl', ['$scope', '$http', 'user', '$window', function($scope, $http, user, $window) {
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
                console.log(JSON.stringify(response));
                console.log("Added provider to database!");
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
              
            // add token to session storage
            $window.sessionStorage.token = user.current.user_id;
          });
      }); 
  }])
  .controller('CreateAdCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
      console.log($window.sessionStorage.token + ": user id");
      $scope.adInfo = {
          BusinessID : undefined,
          Title : undefined,
          Writing : undefined,
          TemplateID : 1 //TODO ACTUALLY ADD TEMPLATES IN
      };
      
      $scope.businessList = {};
      
      $http.get("http://fendatr.com/api/v1/provider/" + $window.sessionStorage.token + "/business")
      .success(function(response){
          console.log(response + ": all businesses");
          $scope.businessList = response.Business;
        
          
      }).error(function(error){
          console.log(error + ": failed to get all businesses from provider");
      });
      
      $scope.createAd = function() {
          var data = {
            BusinessID: $scope.adInfo.BusinessID, 
            Title: $scope.adInfo.Title,
            Writing: $scope.adInfo.Writing,
            TemplateID: $scope.adInfo.TemplateID,
          };
          $scope.adInfo = {};          
          $http.post("http://fendatr.com/api/v1/ad/", data).success(function(response){
          }).error(function(error){
              console.log("failed at adding an ad :(");
          })
      }
      
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
              $scope.businesses = data.Business;  
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
  .controller('ViewAdHistoryCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
   $scope.businesses = null;
   $scope.ads = null;
   $scope.providerID = $window.sessionStorage.token;
       // should probably later be placed in local scope, but:
      
       // what are all the businesses the provider has?
       $http.get("http://fendatr.com/api/v1/provider/" + $scope.providerID + "/business")
       .success(function(response){
           $scope.businesses = response.Business; 
           console.log(JSON.stringify($scope.businesses));
       }).error(function(error){
       console.log(error + " :( could not get provider businesses");
       });

       console.log(JSON.stringify($scope.businesses));
       // for every business, what are all the ads?
        
       $scope.businesses.forEach(function(business) {
           console.log(business);
       });
       //$http.get("http://fendatr.com/api/v1/business/");
  }])
