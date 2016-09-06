
module Models {
    'use strict';
    export class Game {
        public Id: string;
        public Date: Number;
        public Season: Number;
        public Opposition: string;
        public Overs: Array<Models.Over>;
        public Team: Models.Team;

        constructor(id: string, date: Number, season: Number, opposition: string, overs: Array<Models.Over>, team: Models.Team) {
            this.Id = id;
            this.Date = date;
            this.Season = season;
            this.Opposition = opposition;
            this.Overs = overs;
            this.Team = team;
        }

        public isEmpty = (): boolean => {
            return (this.Id === '-1' || this.Id === '00000000-0000-0000-0000-000000000000');
        }

        public static createEmpty = (): Models.Game => {
            return new Models.Game('-1', Date.now(), 0, null, null, null);
        }
    }

    export class Opposition {
    }

    export class Over {
        public Id: string;
        public Number: Number;
        public Innings: Number;
        public Deliveries: string;

        constructor(id: string, number: Number, innings: Number, deliveries: string) {
        }
    }

    export class Team {
        public Id: string;
        public Name: string;
        public Players: Number;

        constructor(id: string, name: string, players: Number) {
        }
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
