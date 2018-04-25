window.axios = require('axios');
require('moment');
require('angular');
require('@uirouter/angularjs');
require('angularjs-datepicker');

angular.module('testTask', ['ui.router', '720kb.datepicker'], function () {});

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
            },
            page: function () {
                return true
            }
        }
    }).state('edit', {
        component: 'companyEdit',
        url: '/company/edit/{companyId}',
        resolve: {
            company: function ($dataService, $transition$) {
                return $dataService.getCompany($transition$.params().companyId);
            }
        }
    });
});