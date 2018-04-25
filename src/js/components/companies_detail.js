angular.module('testTask').component('companyDetail', {
    templateUrl: 'views/company_detail_component.html',
    bindings: { company: '<', page: '<' },
    controller: function ($window) {
        this.reload = function () {
            $window.location.reload();
        }
    }
});