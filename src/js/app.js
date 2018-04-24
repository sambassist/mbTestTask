angular.module('testTask', [
    'ui.router'], function () {});

angular.module('testTask').config(function (
    $stateProvider,
    $locationProvider,
    $urlRouterProvider)
{
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        templateUrl: 'views/home.html',
        url: '/'
    });
});