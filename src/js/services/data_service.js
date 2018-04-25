angular.module('testTask').service('$dataService', function ($q) {
    this.getAllCompanies = function () {
        return $q.when(axios.get('data/companies.json').then(function (response) {
            return response.data;
        }));
    };

    this.getCompany = function(id) {
        return this.getAllCompanies().then(function (companies) {
            return companies.find(function (company) {
                return company.id == id;
            })
        });
    }
});