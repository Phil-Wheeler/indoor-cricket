var Controllers;
(function (Controllers) {
    'use strict';
    var Home = (function () {
        function Home($scope, $location, nominationService) {
            $scope.vm = this;
            $scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.nominations = [];
            $scope.categories = [];
            $scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            this.location = $location;
            nominationService = nominationService;
            nominationService.get().then(function (noms) {
                $scope.nominations = noms;
            });
            nominationService.getCategories().then(function (cats) {
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
        Home.$inject = [
            Utility.Angular.$scope, Utility.Angular.$location, Utility.Services.nominationService
        ];
        return Home;
    }());
    Controllers.Home = Home;
})(Controllers || (Controllers = {}));
