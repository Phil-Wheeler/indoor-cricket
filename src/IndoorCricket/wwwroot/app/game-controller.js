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

        $http.get('/api/games').success(function (data, status, headers, config) {
            $scope.games = data;
        }).error(function (data, status, headers, config) {
            $scope.title = 'catastrophic failure';
        });

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
