(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('team_controller', team_controller);

    team_controller.$inject = ['$location', '$scope', '$http', '$element'];

    function team_controller($scope) {

        $scope.teams = [];
        $scope.newTeam = {};

        $scope.Get = function () {
            $http.get('/api/teams').success(function (data, status, headers, config) {
                $scope.teams = data;

            });
        }

        $scope.Create = function () {
            $http.post('/api/teams', { team: $scope.newTeam }).success(function (data, status, headers, config) {

            })
        }

    }
})();
