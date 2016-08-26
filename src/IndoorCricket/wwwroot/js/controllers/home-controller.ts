module Controllers {
    'use strict';

    export class Home {
        static $inject = [
            Utility.Angular.$scope, Utility.Services.gameService
        ];
        //public nominations: Array<Models.Nomination>;
        //public categories: Array<Models.Category>;
        //private location;
        //public newCategory: Models.Category;
        //public newNomination: Models.Nomination;
        //public nominee: Models.Nomination;
        private gameService;
        //public addCategory: Function;
        public Games: Array<Models.Game>;
        public Game: Models.Game;
        public get: Function;

        constructor($scope: any, gameService) {
            $scope.vm = this;
            console.info("In Home Controller");
            //$scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.nominations = [];
            $scope.categories = [];
            //$scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            //this.location = $location;
            gameService = gameService;

            $scope.get = function () {
                console.info("Getting");
            }

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