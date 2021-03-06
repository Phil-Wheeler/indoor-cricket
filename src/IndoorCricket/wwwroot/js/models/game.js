var Models;
(function (Models) {
    'use strict';
    var Game = (function () {
        function Game(game) {
            var _this = this;
            this.isEmpty = function () {
                return (_this.Id === '-1' || _this.Id === '00000000-0000-0000-0000-000000000000');
            };
            this.Id = game.Id;
            this.Date = game.Date;
            this.Season = game.Season;
            this.Opposition = game.Opposition;
            this.Overs = game.Overs;
            this.Team = game.Team;
        }
        Game.createEmpty = function () {
            //return new Models.Game('-1', Date.now(), 0, null, null, null);
            return null;
        };
        return Game;
    }());
    Models.Game = Game;
    var Opposition = (function () {
        function Opposition() {
        }
        return Opposition;
    }());
    Models.Opposition = Opposition;
    var Over = (function () {
        function Over(id, number, innings, deliveries) {
        }
        return Over;
    }());
    Models.Over = Over;
    var Team = (function () {
        function Team(id, name, players) {
        }
        return Team;
    }());
    Models.Team = Team;
})(Models || (Models = {}));
//var Models;
//(function (Models) {
//    'use strict';
//    var Game = (function () {
//        function Game(jsonGame) {
//            var _this = this;
//            this.isEmpty = function () {
//                return (_this.id === '-1' || _this.id === '00000000-0000-0000-0000-000000000000');
//            };
//            console.info("game is" + jsonGame);
//            this.Id = jsonGame.Id;
//            this.Date = dateFns.format(jsonGame.Date, 'DD/MM/YYYY');
//            this.Season = jsonGame.Season;
//            this.Opposition = jsonGame.Opposition;
//            this.Overs = jsonGame.Overs;
//            this.Team = jsonGame.Team;
//        }
//        Game.createEmpty = function () {
//            var gameObj = {};
//            gameObj.Id = '-1';
//            gameObj.Date = new Date();
//            gameObj.Season = '0';
//            gameObj.Opposition = '';
//            gameObj.Overs = [];
//            gameObj.Team = {};
//            return new Models.Game(gameObj);
//        };
//        return Game;
//    } ());
//    Models.Game = Game;
//})(Models || (Models = {}));
