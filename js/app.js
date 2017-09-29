angular.module('MyApp',['ngRoute', 'RouteControllers', 'UserService','TodoService', 'TodoDirective']);

angular.module('MyApp').config(function($locationProvider, $routeProvider) { $locationProvider.html5Mode(true);
    
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    })
    .when('/todo', {
        templateUrl: 'templates/todo.html',
        controller: 'TodoController'
    })
    .when('/todo/edit/:id', {
        templateUrl: 'templates/edit-todo.html',
        controller: 'EditTodoController'
    })
    .when('/accounts/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });
});
