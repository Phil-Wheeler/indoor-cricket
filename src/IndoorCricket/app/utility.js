var Utility;
(function (Utility) {
    'use strict';
    var Resources = (function () {
        function Resources() {
        }
        Resources.appName = 'cricketApp';
        return Resources;
    })();

    Utility.Resources = Resources;
    var Base = (function () {
        function Base() {
        }
        Base.url = '/';
        return Base;
    })();

    Utility.Base = Base;

    var GuidBuilder = (function () {
        function GuidBuilder() {
        }
        GuidBuilder.New = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        return GuidBuilder;
    })();
    Utility.GuidBuilder = GuidBuilder;


    var Urls = (function () {
        function Urls() {
        }
        Urls.templates = Utility.Base.url + 'Templates/';
        Urls.api = Utility.Base.url + 'api/';
        Urls.home = '/home';
        Urls.games = '/games';
        Urls.teams = '/teams';
        return Urls;
    })();
    Utility.Urls = Urls;


    var Templates = (function () {
        function Templates() {
        }
        Templates.home = Utility.Urls.templates + 'home.html';
        Templates.login = Utility.Urls.templates + 'login.html';
        Templates.games = Utility.Urls.templates + 'games.html';
        Templates.auth = Utility.Urls.templates + 'auth.html';
        Templates.teams = Utility.Urls.templates + 'team.html';
        return Templates;
    })();
    Utility.Templates = Templates;


    var ApiEndPoints = (function () {
        function ApiEndPoints() {
        }
        ApiEndPoints.teams = Utility.Urls.api + 'teams';
        ApiEndPoints.games = Utility.Urls.api + 'games';
        return ApiEndPoints;
    })();
    Utility.ApiEndPoints = ApiEndPoints;


    var Angular = (function () {
        function Angular() {
        }
        Angular.$scope = '$scope';
        Angular.$location = '$location';
        Angular.$routeParams = '$routeParams';
        Angular.$timeout = '$timeout';
        return Angular;
    })();
    Utility.Angular = Angular;


    var Services = (function () {
        function Services() {
        }
        Services.teamsService = 'teamsService';
        Services.gamesService = 'gamesService';
        return Services;
    })();
    Utility.Services = Services;


    var Filters = (function () {
        function Filters() {
        }
        Filters.dateFilter = 'dateFilter';
        return Filters;
    })();
    Utility.Filters = Filters;

})(Utility || (Utility = {}));

