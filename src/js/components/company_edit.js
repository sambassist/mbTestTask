angular.module('testTask').component('companyEdit', {
    templateUrl: 'views/company_edit_component.html',
    bindings: { company: '<' },
    controller: function () {
        this.company_types = ['ООО', 'ИП'];
        this.show_result = false;
        this.saved_data = [];

        this.save = function () {
            this.show_result = true;
        };

        this.re_edit = function () {
            this.show_result = false;
        }
    }
});