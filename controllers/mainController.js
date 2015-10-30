app.controller("MainController", function($scope, $state) {
    if(localStorage['user'] === undefined) {
        $state.go("login");
    }
})