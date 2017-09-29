angular.module("RouteControllers", [])
    .controller("HomeController", function($scope) {
        $scope.title = "Welcome To Angular Todo! :) It gets better, honest!!";
    })
    .controller("RegisterController", function($scope, UserAPIService) {
        
        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.login = function() {
            UserAPIService.callAPI(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                localStorage.setItem("username", $scope.registrationUser.username);
                localStorage.setItem("authToken", results.data.token);
            }).catch(function(err) {
                console.log(err.data);
            });
        }
        
        $scope.submitForm = function() {
            
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
                
                UserAPIService.callAPI(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("Yay! You have successfully registered!!");
                    $scope.login();
                }).catch(function(problem) {
                    alert("Oh no! Someone must have that name already!!!");
                    console.log(problem);
                });
                
            }
        };
    })
    .controller('TodoController', function($scope, $location, TodoAPIService) {
        
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = localStorage.getItem("authToken");
        $scope.username = localStorage.getItem("username");
        
        $scope.todos = [];
        
        $scope.refreshTodos = function() {
            TodoAPIService.getTodos(URL + "todo/", $scope.username, $scope.authToken).then(function(results) {
                $scope.todos = results.data || [];
                console.log($scope.todos);
            }).catch(function(err) {
                console.log(err.data);
            });
        }
        
        $scope.refreshTodos();
        
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                $scope.todos.push($scope.todo);
                
                TodoAPIService.createTodo(URL + "todo/", $scope.todo, $scope.authToken).then(function(results) {
                    console.log(results);
                    $scope.refreshTodos();
                }).catch(function(err){
                    console.log(err.data);
                });
            }
        }
        
        $scope.editTodo = function(id) {
            $location.path("/todo/edit/" + id);
        };
        
        $scope.deleteTodo = function(id) {
            TodoAPIService.deleteTodo(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
                console.log(results);
                $scope.refreshTodos();
            }).catch(function(err) {
                console.log(err.data);
            });
        };
    })
    .controller("EditTodoController", function($scope, $location, $routeParams, TodoAPIService) {
        
        var id = $routeParams.id;
        var URL = "https://morning-castle-91468.herokuapp.com/";
        
        $scope.authToken = localStorage.getItem("authToken");
        $scope.username = localStorage.getItem("username");
        
        TodoAPIService.getTodos(URL + "todo/" + id, $scope.username, $scope.authToken).then(function(results) {
            $scope.todo = results.data;
        }).catch(function(err) {
            console.log(err.data);
        });
        
        $scope.submitForm = function() {
            if ($scope.todoForm.$valid) {
                $scope.todo.username = $scope.username;
                
                TodoAPIService.editTodo(URL + "todo/" + id, $scope.todo, $scope.authToken).then(function(results) {
                    $location.path("/todo");
                }).catch(function(err) {
                    console.log(err.data);
                });
            }
        }
        
    });