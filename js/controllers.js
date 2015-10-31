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
  
  .controller('CreateAdCtrl', ['$scope', '$http', function($scope, $http) {
  
  }])

  .controller('EditProfileCtrl', ['$scope', '$http', 'user', function($scope, $http, user) {
      var data = {
            provider_id: user.current
        }
      
      $scope.editProfile = function() {
          console.log(user.current);
      }
      
      /*
     $scope.editProfile = function(){
         console.log(user.current);
     }*/
        /* 
        $http.post("endpoints/register.php", data).success(function(response){
            console.log(response);
            localStorage.setItem("user", JSON.stringify({user: response}));
            $state.go("application");
        }).error(function(error){
            console.log(error); 
        }); */
  }]);