/// <reference path="../services/score.ts" />
var Controllers;
(function (Controllers) {
    'use strict';
    var Score = (function () {
        function Score($scope, $routeParams, scoreService) {
            $scope.vm = this;
            console.info("In Game Controller");
            console.info($routeParams);
            //$scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.games = [];
            $scope.categories = [];
            $scope.Game = {};
            //$scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            //this.location = $location;
            $scope.Team = {};
            scoreService = scoreService;
            $scope.hideSelected = true;
            scoreService.games().then(function (g) {
                $scope.games = g;
            });
            $scope.get = function (id) {
                $scope.Game = scoreService.get(id);
                $scope.hideSelected = false;
            };
            $scope.setGame = function (index) {
                var id = $scope.games[index].Id;
                scoreService.get(id).then(function (gm) {
                    $scope.Game = gm;
                });
            };
            $scope.getTeam = function (id) {
                console.info('calling team');
                $scope.Team = scoreService.team(id);
            };
            //nominationService.get().then((noms: Array<Models.Nomination>) => {
            //    $scope.nominations = noms;
            //});
            //nominationService.getCategories().then((cats: Array<Models.Category>) => {
            //    $scope.categories = cats;
            //    console.info($scope.categories);
            //});
            //$scope.nominate = function () {
            //    var nominee = $scope.newNomination;
            //    gameService.addNomination(nominee);
            //};
            //$scope.addCategory = function () {
            //    var model = $scope.newCategory;
            //    var result = gameService.addCategory(model);
            //};
        }
        Score.$inject = [
            Utility.Angular.$scope, Utility.Angular.$routeParams, Utility.Services.scoreService
        ];
        return Score;
    }());
    Controllers.Score = Score;
})(Controllers || (Controllers = {}));
/*

    function game_controller($location, $scope, $http) {
var vm = this;
vm.title = 'game_controller';

$scope.title = "Loading games...";
$scope.games = [];
$scope.selected = {};
$scope.working = true;

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


*/ 
