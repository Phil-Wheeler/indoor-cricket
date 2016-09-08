/// <reference path="/services/game.ts" />


module Controllers {
    'use strict';

    export class Home {
        static $inject = [
            Utility.Angular.$scope, Utility.Services.gameService
        ];
        private gameService;
        public Games: Array<Models.Game>;
        public Game: Models.Game;
        public get: Function;

        constructor($scope: any, gameService) {
            $scope.vm = this;
            console.info("In Home Controller");
            $scope.games = [];
            $scope.categories = [];
            $scope.Game = {};
            gameService = gameService;
            $scope.hideSelected = true;


            gameService.games().then((g: Array<Models.Game>) => {
                $scope.games = g;
            });

            $scope.get = function (id) {

                gameService.get(id).then((gm: Models.Game) => {
                    $scope.Game = gm;
                });

                $scope.hideSelected = false;
                //var result = gameService.get(id);
                //$scope.Game = result;
                //console.info(result);

                //$scope.hideSelected = false;
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