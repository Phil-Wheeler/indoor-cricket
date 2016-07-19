(function () {
    'use strict';
    var app;

    app = angular.module('Cricket', [
        // Angular modules 
        'ngRoute'

        // Custom modules 

        // 3rd Party Modules
        
    ]);

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/home.html'
        }).when('/', {
            templateUrl: '/templates/home.html'
        }).when('/game/', {
            templateUrl: '/templates/home.html'
        }).otherwise({
            redirectTo: '/'
        });
    });

})();