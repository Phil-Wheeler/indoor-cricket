(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('team_controller', team_controller);

    team_controller.$inject = ['$location', '$scope', '$http', '$element'];

    function team_controller($location, $scope, $http, $element) {

        $scope.teams = [];
        $scope.newTeam = {};
        $scope.selectedTeam = {};
        $scope.selectedIndex = -1;

        $scope.Get = function () {
            $http.get('/api/teams').success(function (data, status, headers, config) {
                $scope.teams = data;
            });

            $scope.newTeam.Name = '';
            $scope.newTeam.Id = '00000000-0000-0000-0000-000000000000';
            $scope.newTeam.Players = [];
        }

        $scope.Create = function () {
            $http.post('/api/teams/', { team: $scope.newTeam }).success(function (data, status, headers, config) {
                $scope.teams.push(data);
                $scope.newTeam.Name = '';
            })
        }

        $scope.Select = function (id) {
            $http.get('/api/teams/' + id).success(function (data, status, headers, config) {
                $scope.selectedTeam = data;
            })
        }


    }
})();
