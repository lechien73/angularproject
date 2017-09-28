angular.module("RouteControllers", [])
    .controller("HomeController", function($scope) {
        $scope.title = "Welcome To Angular Todo! :) It gets better, honest!!";
    })
    .controller("RegisterController", function($scope) {
        
        $scope.submitForm = function() {
            
            console.log($scope.user.username + " " + $scope.user.password);
        }
    });