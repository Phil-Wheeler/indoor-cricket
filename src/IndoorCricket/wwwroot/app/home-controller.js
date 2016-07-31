(function () {
    'use strict';

    angular
        .module('Cricket')
        .controller('home_controller', home_controller);

    home_controller.$inject = ['$scope', '$http']; 

    function home_controller($scope, $http) {
        $scope.title = 'Indoor Cricket';
        $scope.games = [];
        $scope.selectedGame = {};

        activate();

        $scope.getGame = function(id) {
            console.info(id);
            $http.get('/api/games/' + id).then(function (result) {

                $scope.selectedGame = new Models.Game(result.data);

            });
        }

        function activate() {

            $http.get('/api/games').then(function (result) {

                for (var i = 0; i < result.data.length; i++) {

                    var game = new Models.Game(result.data[i]);
                    $scope.games.push(game);
                }

            });

        }
    }
})();
