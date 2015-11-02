'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', function($scope) {

  }])
  .controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http) {
  	$scope.loading = true;
  	$scope.error = null;

		// Call the back-end API which will be authenticated using our session token
		$http({method: 'GET', url: '../articles.php'}).
			success(function(data, status, headers, config) {
				//The API call to the back-end was successful (i.e. a valid session)
				$scope.articles = data;
				$scope.loading = false;
			}).
			error(function(data, status, headers, config) {
				$scope.error = {
					message: "The API call to the back-end was not successful. Make sure that your back-end verifies the token.",
					link: "https://app.userapp.io/#/docs/libs/angularjs/#back-end"
				};
				$scope.loading = false;
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
        console.log("adding...");
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