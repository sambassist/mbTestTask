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
        component: 'companiesList',
        url: '/',
        resolve: {
            companies: function ($dataService) {
                return $dataService.getAllCompanies();
            }
        }
    }).state('detail', {
        component: 'companyDetail',
        url: '/company/{companyId}',
        resolve: {
            company: function ($dataService, $transition$) {
                return $dataService.getCompany($transition$.params().companyId);
            }
        }
    });
});