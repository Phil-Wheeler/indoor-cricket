(function () {
    'use strict';

    app.config(function ($routeProvider, $locationProvider) {
        console.info('routes');
        //$templateCache.removeAll();

        $routeProvider.when(Utility.Urls.game, {
            templateUrl: Utility.Templates.game + '?v=112',
            controller: Controllers.Game
        }).when(Utility.Urls.home, {
            templateUrl: Utility.Templates.home,
            controller: Controllers.Home
        }).when(Utility.Urls.team + '/:id', {
            templateUrl: Utility.Templates.team
        }).when(Utility.Urls.score, {
            templateUrl: Utility.Templates.score,
            controller: Controllers.Score
        }).otherwise({
            redirectTo: Utility.Urls.home
            //templateUrl: Utility.Templates.home
        });

        $locationProvider.html5Mode(true);
    });


    app.run(function ($rootScope, $location) {

        console.info('running'); 

        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            console.info("Started");
        });
    });
})();
