module Utility {
    'use strict';
    export class Resources {
        public static appName: string = 'Cricket';
    }

    export class Base {
        public static url: string = '/';
        public static cacheTimeout: number = 600000;// in ms 600000 = 10min - 20000 = 20sec
    }

    export class GuidBuilder {
        public static New = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }

    export class Urls {
        public static templates: string = Utility.Base.url + 'templates/';
        public static api: string = Utility.Base.url + 'api/';
        public static home: string = '/';
        public static game: string = '/game'; 
        public static team: string = '/teams';
        public static score: string = '/score';
    }

    export class Templates {
        public static home: string = Utility.Urls.templates + 'home.html';
        public static login: string = Utility.Urls.templates + 'login.html';
        public static game: string = Utility.Urls.templates + 'game.html';
        public static team: string = Utility.Urls.templates + 'team.html';
        public static score: string = Utility.Urls.templates + 'score.html';
    }

    export class ApiEndPoints {
        public static games: string = Utility.Urls.api + 'games';
        public static teams: string = Utility.Urls.api + 'teams';
    }

    export class Angular {
        public static $scope: string = '$scope';
        public static $location: string = '$location';
        public static $routeParams: string = '$routeParams';
        public static $timeout: string = '$timeout';
    }

    export class Services {
        public static gameService: string = 'gameService';
        public static scoreService: string = 'scoreService';
    }

    export class Filters {
        public static dateFilter: string = 'dateFilter';
    }
}