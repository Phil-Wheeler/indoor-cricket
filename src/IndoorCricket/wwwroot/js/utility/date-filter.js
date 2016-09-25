/// <reference path="../app.ts" />
var Filters;
(function (Filters) {
    'use strict';
    app.filter('dateFilter', function () {
        return function (input) {
            return dateFns.format(input, 'DD MMM YYYY');
        };
    });
})(Filters || (Filters = {}));
