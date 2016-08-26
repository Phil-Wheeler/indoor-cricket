(function () {
    'use strict';
    app.config(function ($routeProvider) {
        console.info('routes');
        $routeProvider.when(Utility.Urls.game, {
            templateUrl: Utility.Templates.game
        }).when(Utility.Urls.home, {
            templateUrl: Utility.Templates.home
        }).when(Utility.Urls.team, {
            templateUrl: Utility.Templates.team
        }).otherwise({
            redirectTo: Utility.Urls.home
        });
        //$locationProvider.html5Mode(true);
    });
    app.run(function ($rootScope, $location) {
        console.info('running');
        //$location.html5Mode(true);
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            console.info("Started");
        });
    });
})();
