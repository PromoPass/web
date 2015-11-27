'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function ($scope) {

  }])
  .controller('LoginCtrl', ['$scope', '$http', 'user', '$window', function($scope, $http, user, $window) {
      $scope.login = (function() {
          $scope.$on('user.login', function() {
              var session_token = user.token();
           /*
          $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + session_token);
             */ 
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
              // Add user token to local storage
              localStorage.setItem('token', data.session_token);
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
          $scope.$on('user.login', function() {
              var session_token = user.token();
           /*
          $http.defaults.headers.common.Authorization = 'Basic ' + btoa(':' + session_token);
             */ 
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
              // Add user token to local storage
              localStorage.setItem('token', data.session_token); 
              
              // Update provider_id table
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
          });
      }); 
  }])
  .controller('CreateAdCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
      $scope.token = localStorage.getItem('token');
      $scope.adInfo = {
          BusinessID : undefined,
          Title : undefined,
          Writing : undefined,
	  PicURL : undefined,
          TemplateID : 1 //TODO ACTUALLY ADD TEMPLATES IN
      };
      
      $scope.businessList = {};
      
      $http.get("http://fendatr.com/api/v1/usercache/" + $scope.token + "/business")
      .success(function(response){
          //console.log(JSON.stringify(response) + ": all businesses");
          $scope.businessList = response.Business;
      }).error(function(error){
          console.log(error + ": failed to get all businesses from provider");
      });
      
      $scope.createAd = function() {
          var data = {
            BusinessID: $scope.adInfo.BusinessID, 
            Title: $scope.adInfo.Title,
            Writing: $scope.adInfo.Writing,
	    PicURL : $scope.adInfo.PicURL,
            TemplateID: $scope.adInfo.TemplateID
          };
          $scope.adInfo = {};          
          $http.post("http://fendatr.com/api/v1/ad/", data).success(function(response){
          }).error(function(error){
	      console.log(JSON.stringify(data));
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
  .controller('ViewAdHistoryCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {

  }])
  .controller('ModifyAdCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.adInfo = {
          BusinessID : undefined,
          Title : undefined,
          Writing : undefined,
          TemplateID: 1 // TODO ACTUALLY ADD TEMPLATES IN
      };
      
      $scope.businessList = {}; 
          $http.get("http://fendatr.com/api/v1/usercache/" + localStorage.getItem('token') + "/business")
          .success(function(response){
              //console.log(JSON.stringify(response) + ": all businesses");
              $scope.businessList = response.Business;
          }).error(function(error){
              console.log(error + ": failed to get all businesses from provider");
          });
      // Load Ad Values upon business selection 
      $scope.$watch('adInfo.BusinessID', function() { 
          $http.get("http://fendatr.com/api/v1/business/" + $scope.adInfo.BusinessID + "/current-ad")
          .success(function(response) {
              //console.log("success! " + JSON.stringify(response.Ad));
              angular.extend($scope.adInfo, response.Ad[0]);
              //console.log(" and then: " + JSON.stringify($scope.adInfo));
          }).error(function(error){
              console.log(error);
          });
       }, true);
      
     // On submit, update the Ad.
     $scope.modifyAd = function() {
         var data = $scope.adInfo;
         $http.put("http://fendatr.com/api/v1/ad/" + $scope.adInfo.AdID, data)
         .success(function(response) {
             console.log("Updated the ad!");
         }).error(function(error) {
             console.log("Failed at updating the ad");
         });
         $scope.adInfo = {};
     };
      
      
      
      
      
      
      
    
  }])
