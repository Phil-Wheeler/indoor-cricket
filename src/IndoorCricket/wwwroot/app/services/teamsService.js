var Services;
(function (Services) {
    'use strict';
    app.service(Utility.Services.teamsService, function ($http, $q) {
        this.get = function (teamId) {

            return $http.get(Utility.ApiEndPoints.teams + '/' + teamId).then(function (result) {
                team = new Models.Team(result.data);

                return team;
            }, function () {
                //messagingService.setError('There was an issue retrieving team information.', true);
            });
        };

        this.getAll = function () {

            return $http.get(Utility.ApiEndPoints.teams).then(function (result) {
                var teams = [];
                angular.forEach(result.data, function (team) {
                    var tm = new Models.Team(team);
                    teams.push(tm);
                });
                return teams;
            }, function () {
                //messagingService.setError('There was an issue retrieving the residents for this house.', true);
            });
        };

    });
})(Services || (Services = {}));



/*
(function () {
    'use strict';
    var teamsService = angular.module('teamsService', ['ngResource']);

    //teamServices.factory('Teams', ['$resource',
    //  function ($resource) {
    //      return $resource('/api/teams/', {}, {
    //          query: { method: 'GET', params: {}, isArray: true },
    //          find: { method: 'GET', params: {Id}, isArray: false}
    //      });
    //  }]);

    teamsService.factory('Teams', function ($resource) {

        return {

            query: function (teamId) {
                return $resource('/api/teams', {}, {
                    query: { method: 'GET', params: { Id: teamId }, isArray: false }
                }).query();

            }
        }
    });


})();

*/