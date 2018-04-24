angular.module('testTask').component('companiesList', {
    templateUrl: 'views/companies_list.html',
    controller: function companiesListController($dataService) {
        this.companies = $dataService.companies;
    }
});