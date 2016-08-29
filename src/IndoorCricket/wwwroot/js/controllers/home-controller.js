/// <reference path="/services/game.ts" />
var Controllers;
(function (Controllers) {
    'use strict';
    var Home = (function () {
        function Home($scope, gameService) {
            $scope.vm = this;
            console.info("In Home Controller");
            //$scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.games = [];
            $scope.categories = [];
            $scope.selectedGame = {};
            //$scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            //this.location = $location;
            gameService = gameService;
            gameService.get().then(function (g) {
                $scope.games = g;
            });
            $scope.get = function (id) {
                gameService.getGame(id);
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
        Home.$inject = [
            Utility.Angular.$scope, Utility.Services.gameService
        ];
        return Home;
    }());
    Controllers.Home = Home;
})(Controllers || (Controllers = {}));
