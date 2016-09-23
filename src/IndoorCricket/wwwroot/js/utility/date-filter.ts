/// <reference path="../app.ts" />


module Filters {
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

    //app.filter('timeFilter', function () {
    //    return function (input) {
    //        if (moment.isMoment(input)) {
    //            return input.format('h:mma');
    //        }
    //        return moment(input).format('h:mma');
    //    };
    //});

    //app.filter('dateTimeFilter', function () {
    //    return function (input) {
    //        if (moment.isMoment(input)) {
    //            var start = input.format('MMMM Do');
    //            var end = input.format('h:mma');
    //            var fullText = start + ' at ' + end;
    //            return fullText;
    //        }
    //        var pre = moment(input).format('MMMM Do');
    //        var post = moment(input).format('h:mma');
    //        var full = pre + ' at ' + post;
    //        return full;
    //    };
    //});
}  