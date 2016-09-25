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
            this.Date = new Date(game.Date.toString());
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
            this.Id = id;
            this.Number = number;
            this.Innings = innings;
            this.Deliveries = deliveries;
        }
        Over.createEmpty = function (inn) {
            return new Models.Over(Utility.GuidBuilder.New(), inn, 0, []);
        };
        return Over;
    }());
    Models.Over = Over;
    var Delivery = (function () {
        function Delivery(id, number, stroke, dismissal, runs, bowler, batter) {
        }
        Delivery.createEmpty = function () {
            return new Models.Delivery('-1', 1, 1, 0, 0, '', '');
            //return null;
        };
        return Delivery;
    }());
    Models.Delivery = Delivery;
    var Team = (function () {
        function Team(team) {
            this.Id = team.Id;
            this.Name = team.Name;
            this.Players = team.Players;
        }
        return Team;
    }());
    Models.Team = Team;
    var Player = (function () {
        function Player(id, name, email) {
        }
        return Player;
    }());
    Models.Player = Player;
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
