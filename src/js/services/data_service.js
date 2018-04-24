angular.module('testTask').service('$dataService', function () {
    this.companies = [
        {
            id: 1,
            name: 'Сам себе хозяин',
            ogrn: '1-14-77-46-30576-2',
            type: 'ИП',
            reg_date: '21-09-1991',
            active: true
        },
        {
            id: 2,
            name: 'Ковры для людей',
            ogrn: '3-14-77-46-30553-6',
            type: 'ООО',
            reg_date: '12-08-1999',
            active: true
        },
        {
            id: 3,
            name: 'Пельменная "Кот в мешке"',
            ogrn: '7-14-77-46-99999-3',
            type: 'ООО',
            reg_date: '13-01-2000',
            active: false
        },
        {
            id: 4,
            name: 'Фотостудия "Везучий случай"',
            ogrn: '4-44-55-11-00000-3',
            type: 'ИП',
            reg_date: '29-02-2002',
            active: true
        }
    ];
});