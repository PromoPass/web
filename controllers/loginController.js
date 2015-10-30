app.controller("LoginController", function($scope, $http, $state){
    // Variables
    $scope.registerInfo = {
        firstname: undefined,
        middleinitial: undefined,
        lastname: undefined,
        email: undefined,
        password: undefined
    }
    $scope.loginInfo = {
        email: undefined,
        password: undefined
    }
   
    
    // Functions
    $scope.registerUser = function() {
        var data = {
            firstname: $scope.registerInfo.firstname,
            middleinitial: $scope.registerInfo.middleinitial,
            lastname: $scope.registerInfo.lastname,
            email: $scope.registerInfo.email,
            password: $scope.registerInfo.password
        }
        
        $http.post("endpoints/register.php", data).success(function(response){
            console.log(response);
            localStorage.setItem("user", JSON.stringify({user: response}));
            $state.go("application");
        }).error(function(error){
            console.log(error); 
        });
    };
    
    $scope.loginUser = function() {
        var data = {
            email: $scope.loginInfo.email,
            password: $scope.loginInfo.password
        }
        
        $http.post("endpoints/login.php", data).success(function(response){
            console.log(response);
            localStorage.setItem("user", JSON.stringify({user: response[0].Email}));
            $state.go("application");
        }).error(function(error){
            console.log(error); 
        });
    }

})
