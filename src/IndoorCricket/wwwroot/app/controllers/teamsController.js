
//var teamsModule = angular.module("teamsModule", [])
//    .config(function ($routeProvider, $locationProvider) {
//        $routeProvider.when('/teams', { templateUrl: '/templates/team.html', controller: TeamsController });
//        $locationProvider.html5Mode(true);
//    });

//teamsModule.factory('bootstrappedTeamData', function(){
//    return {
//        teams: $.getJSON('/api/teams')
//    };
//})

teamsModule.controller("TeamsController", function ($scope, bootstrappedTeamData) {
    $scope.teams = bootstrappedTeamData.teams;
});





/*
(function () {
    'use strict';


    angular
    .module('cricketApp')
    .controller('teamsController', teamsController)

    teamsController.$inject = ['$scope', 'Teams'];
    function teamsController($scope, Teams) {
        $scope.teams = Teams.query();
    }

    //var controllerId = 'teamsController';

    //angular.module('cricketApp').controller(controllerId,
    //    ['$scope', 'teamFactory', teamsController]);

    //function teamsController($scope, teamFactory) {
    //    $scope.teams = [];

    //    teamFactory.getTeams().success(function (data) {
    //        $scope.teams = data;
    //    }).error(function (error) {
    //        // log errors
    //    });
    //}
})();
*/