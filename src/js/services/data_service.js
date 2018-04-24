angular.module('testTask').service('$dataService', function ($http) {
    this.getAllCompanies = function () {
        return $http.get('data/companies.json', { cache: true }).then(function(response) {
            return response.data;
        });
    };

    this.getCompany = function(id) {
        return this.getAllCompanies().then(function (companies) {
            return companies.find(function (company) {
                return company.id == id;
            })
        });
    }
});