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
        $scope.selected = {};
        $scope.working = true;
        $scope.newGame = { Id: 0, Date: new Date(), Team: {}, Opposition: "", Overs: [] };

        $http.get('/api/games').success(function (data, status, headers, config) {
            $scope.games = data;
            $scope.working = false;
        }).error(function (data, status, headers, config) {
            $scope.title = 'catastrophic failure';
            $scope.working = true;
        });

        $scope.getGame = function (id) {
            
            $http.get('/api/games/' + id).success(function (data, status, headers, config) {
                $scope.selected = data;
                console.info(data.Overs);
                console.info($scope.selected);
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "failed to find that game";
                $scope.working = true;
            })
        }

        $scope.newGame = function (gameData) {
            $http.post('/api/games', { 'Id': null, 'Date': new Date(), 'Opposition': "Testing" }).success(function (data, status, headers, config) {
                console.info("Game saved");
            }).error(function (data, status, headers, config) {
                console.info("Failed to save");
            });
        };

        activate();

        function activate() { }
    }
})();
