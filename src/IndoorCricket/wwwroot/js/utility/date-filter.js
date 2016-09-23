/// <reference path="../app.ts" />
var Filters;
(function (Filters) {
    'use strict';
    app.filter('dateFilter', function () {
        return function (input) {
            //if (moment.isMoment(input)) {
            //    return input.format('dddd DD MMMM, YYYY');
            //}
            //return moment(input).format('dddd DD MMMM, YYYY');
            console.info("Date Filter!");
            return dateFns.format(input, 'DD/MM/YYYY');
        };
    });
})(Filters || (Filters = {}));
