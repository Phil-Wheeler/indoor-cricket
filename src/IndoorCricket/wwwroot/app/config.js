(function () {
    'use strict';
    app.config(function ($routeProvider) {
        $routeProvider.when(Utility.Urls.teams, {
            templateUrl: Utility.Templates.teams
        });
        //$routeProvider.when(Utility.Urls.login, {
        //    templateUrl: Utility.Templates.auth
        //}).when(Utility.Urls.home, {
        //    templateUrl: Utility.Templates.home
        //}).when(Utility.Urls.games, {
        //    templateUrl: Utility.Templates.games
        //}).when(Utility.Urls.teams, {
        //    templateUrl: Utility.Templates.teams
        //}).otherwise({
        //    redirectTo: Utility.Urls.login
        //});
    });

    app.run(function ($rootScope, $location, $timeout) {

        //console.info(app.templateUrl);
        //console.info(Utility.Templates.teams);

        //console.info($location.path);
        //ipAddressService.get().then(function (result) {
        //    console.log(result);
        //});
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            //$location.path(Utility.Urls.teams);
            //var isLoginPage = $location.path() === Utility.Urls.login;
            //var isHouseSelectionPage = $location.path() === Utility.Urls.houseSelection;
            //if (!isLoginPage && !bach.isUserAuthenticated() && !isHouseSelectionPage) {
            //    $location.path(Utility.Urls.login);
            //}
        });
    });
})();
