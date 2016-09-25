
module Models {
    'use strict';
    export class Game {
        public Id: string;
        public Date: Date;
        public Season: Number;
        public Opposition: string;
        public Overs: Array<Models.Over>;
        public Team: Models.Team;

        constructor(game) {
            this.Id = game.Id;
            this.Date = new Date(game.Date.toString());
            this.Season = game.Season;
            this.Opposition = game.Opposition;
            this.Overs = game.Overs;
            this.Team = game.Team;
        }

        public isEmpty = (): boolean => {
            return (this.Id === '-1' || this.Id === '00000000-0000-0000-0000-000000000000');
        }

        public static createEmpty = (): Models.Game => {
            //return new Models.Game('-1', Date.now(), 0, null, null, null);
            return null;
        }
    }

    export class Opposition {
    }

    export class Over {
        public Id: string;
        public Number: Number;
        public Innings: Number;
        public Deliveries: Array<Models.Delivery>;

        constructor(id: string, number: Number, innings: Number, deliveries: Array<Models.Delivery>) {
            this.Id = id;
            this.Number = number;
            this.Innings = innings;
            this.Deliveries = deliveries;
        }

        public static createEmpty = (inn): Models.Over => {
            return new Models.Over(Utility.GuidBuilder.New(), inn, 0, []);
        }
    }

    export class Delivery {
        public Id: string;
        public Number: Number;
        public Stroke: Number;
        public Dismissal: Number;
        public Runs: Number;
        public Bowler: string;
        public Batter: string;

        constructor(id: string, number: Number, stroke: Number, dismissal: Number, runs: Number, bowler: string, batter: string) {
        }

        public static createEmpty = (): Models.Delivery => {
            return new Models.Delivery('-1', 1, 1, 0, 0, '', '');
            //return null;
        }

    }

    export class Team {
        public Id: string;
        public Name: string;
        public Players: Array<Models.Player>;

        constructor(team) {
            this.Id = team.Id;
            this.Name = team.Name;
            this.Players = team.Players;
        }
    }

    export class Player {
        public Id: string;
        public Name: string;
        public Email: string;

        constructor(id: string, name: string, email: string) { }
    }
} 
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
