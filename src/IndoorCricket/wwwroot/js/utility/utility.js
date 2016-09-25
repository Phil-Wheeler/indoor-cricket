var Utility;
(function (Utility) {
    'use strict';
    var Resources = (function () {
        function Resources() {
        }
        Resources.appName = 'Cricket';
        return Resources;
    }());
    Utility.Resources = Resources;
    var Base = (function () {
        function Base() {
        }
        Base.url = '/';
        Base.cacheTimeout = 600000; // in ms 600000 = 10min - 20000 = 20sec
        return Base;
    }());
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
    }());
    Utility.GuidBuilder = GuidBuilder;
    var Urls = (function () {
        function Urls() {
        }
        Urls.templates = Utility.Base.url + 'templates/';
        Urls.api = Utility.Base.url + 'api/';
        Urls.home = '/';
        Urls.game = '/game';
        Urls.team = '/teams';
        Urls.score = '/score';
        return Urls;
    }());
    Utility.Urls = Urls;
    var Templates = (function () {
        function Templates() {
        }
        Templates.home = Utility.Urls.templates + 'home.html';
        Templates.login = Utility.Urls.templates + 'login.html';
        Templates.game = Utility.Urls.templates + 'game.html';
        Templates.team = Utility.Urls.templates + 'team.html';
        Templates.score = Utility.Urls.templates + 'score.html?v=1';
        return Templates;
    }());
    Utility.Templates = Templates;
    var ApiEndPoints = (function () {
        function ApiEndPoints() {
        }
        ApiEndPoints.games = Utility.Urls.api + 'games';
        ApiEndPoints.teams = Utility.Urls.api + 'teams';
        return ApiEndPoints;
    }());
    Utility.ApiEndPoints = ApiEndPoints;
    var Angular = (function () {
        function Angular() {
        }
        Angular.$scope = '$scope';
        Angular.$location = '$location';
        Angular.$routeParams = '$routeParams';
        Angular.$timeout = '$timeout';
        return Angular;
    }());
    Utility.Angular = Angular;
    var Services = (function () {
        function Services() {
        }
        Services.gameService = 'gameService';
        Services.scoreService = 'scoreService';
        return Services;
    }());
    Utility.Services = Services;
    var Filters = (function () {
        function Filters() {
        }
        Filters.dateFilter = 'dateFilter';
        return Filters;
    }());
    Utility.Filters = Filters;
})(Utility || (Utility = {}));
