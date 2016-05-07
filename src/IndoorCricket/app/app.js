var app;

(function () {

    'use strict';

    app = angular.module('cricket', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider.when('/Home/Game', { templateUrl: '/templates/games.html', controller: 'GamesController' });
            $routeProvider.when('/Home/Team', { templateUrl: '/templates/teams.html', controller: 'TeamsController' });
            $locationProvider.html5Mode(true);
        });
    //gamesModule = angular.module('gamesModule', []);

})();