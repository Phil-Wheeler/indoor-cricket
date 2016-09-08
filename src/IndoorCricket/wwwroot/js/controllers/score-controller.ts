/// <reference path="../services/score.ts" />


module Controllers {
    'use strict';

    export class Score {
        static $inject = [
            Utility.Angular.$scope, Utility.Angular.$routeParams, Utility.Services.scoreService
        ];
        //public nominations: Array<Models.Nomination>;
        //public categories: Array<Models.Category>;
        //private location;
        //public newCategory: Models.Category;
        //public newNomination: Models.Nomination;
        //public nominee: Models.Nomination;
        private scoreService;
        public getTeam: Function;
        public setGame: Function;
        public Games: Array<Models.Game>;
        public Game: Models.Game;
        public Team: Models.Team;
        public get: Function;

        constructor($scope: any, $routeParams: any, scoreService) {
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


            scoreService.games().then((g: Array<Models.Game>) => {
                $scope.games = g;
            });

            $scope.get = function (id) {
                $scope.Game = scoreService.get(id);
                $scope.hideSelected = false;
            };

            $scope.setGame = function (index) {
                var id = $scope.games[index].Id;

                scoreService.get(id).then((gm: Models.Game) => {
                    $scope.Game = gm;
                });
            }

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


    }
}

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