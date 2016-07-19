(function () {
    'use strict';

    angular
        .module('Cricket')
        .controller('home_controller', home_controller);

    home_controller.$inject = ['$scope', '$http']; 

    function home_controller($scope, $http) {
        $scope.title = 'Indoor Cricket';
        $scope.games = [];

        activate();


        function activate() {

            $http.get('/api/games').then(function (result) {

                for (var i = 0; i < result.data.length; i++) {

                    var game = new Models.Game(result.data[i]);
                    $scope.games.push(game);
                }

                console.info($scope.games);
            });

        }
    }
})();
