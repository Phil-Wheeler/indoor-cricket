(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('game_controller', game_controller);

    game_controller.$inject = ['$location', '$scope', '$http']; 

    function game_controller($location, $scope, $http) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'game_controller';
        
        $scope.title = "Loading games...";
        $scope.games = [];
        $scope.teams = [];
        $scope.selected = {};
        $scope.working = true;
        $scope.game = { Id: 0, Date: new Date(), Team: {}, Opposition: "", Overs: [] };

        $http.get('/api/games').success(function (data, status, headers, config) {
            $scope.games = data;
            $scope.working = false;
            $scope.title = "Previous Games";
        }).error(function (data, status, headers, config) {
            $scope.title = 'catastrophic failure';
            $scope.working = true;
        });

        $http.get('/api/teams').success(function (data, status, headers, config) {
            $scope.teams = data;
        })
        .error(function (data, status, headers, config) {
            $scope.title = "failed to get teams";
        });

        $scope.getGame = function (id) {
            
            $http.get('/api/games/' + id).success(function (data, status, headers, config) {
                $scope.selected = data;
                console.info(data.Overs);
                console.info($scope.selected);
                $scope.Title = "Previous Games";
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "failed to find that game";
                $scope.working = true;
            })
        }


        $scope.newGame = function () {
            var teamIndex = $scope.game.Team;
            var selectedTeam = $scope.teams[teamIndex];
            $scope.game.Team = selectedTeam;

            //console.info($scope.game.Team);
            console.info($scope.game.Date);
            var gameDate = new Date($scope.game.Date);
            console.info(gameDate);

            $http.post('/api/games', { game: $scope.game }).success(function (data, status, headers, config) {
                $scope.games.push($scope.game);
                console.info("Game saved");
            }).error(function (data, status, headers, config) {
                console.info("Failed to save");
            });
        };

        activate();

        function activate() { }
    }
})();
