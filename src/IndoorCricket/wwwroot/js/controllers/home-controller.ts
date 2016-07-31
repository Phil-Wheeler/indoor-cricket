module Controllers {
    'use strict';

    export class Home {
        static $inject = [
            Utility.Angular.$scope, Utility.Angular.$location, Utility.Services.nominationService
        ];
        public nominations: Array<Models.Nomination>;
        public categories: Array<Models.Category>;
        private location;
        public newCategory: Models.Category;
        public newNomination: Models.Nomination;
        public nominee: Models.Nomination;
        private nominationService;
        public addCategory: Function;

        constructor($scope: any, $location, nominationService) {
            $scope.vm = this;
            $scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.nominations = [];
            $scope.categories = [];
            $scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            this.location = $location;
            nominationService = nominationService;

            nominationService.get().then((noms: Array<Models.Nomination>) => {
                $scope.nominations = noms;
            });

            nominationService.getCategories().then((cats: Array<Models.Category>) => {
                $scope.categories = cats;
                console.info($scope.categories);
            });

            $scope.nominate = function () {
                var nominee = $scope.newNomination;
                nominationService.addNomination(nominee);
            };


            $scope.addCategory = function () {
                var model = $scope.newCategory;
                var result = nominationService.addCategory(model);
            };

        }


    }
}