var Models;
(function (Models) {
    'use strict';
    var Game = (function () {
        function Game(jsonGame) {
            var _this = this;
            this.isEmpty = function () {
                return (_this.id === '-1' || _this.id === '00000000-0000-0000-0000-000000000000');
            };
            console.info("game is" + jsonGame);

            this.Id = jsonGame.Id;
            this.Date = dateFns.format(jsonGame.Date, 'DD/MM/YYYY');
            this.Season = jsonGame.Season;
            this.Opposition = jsonGame.Opposition;
            this.Overs = jsonGame.Overs;
            this.Team = jsonGame.Team;
        }
        Game.createEmpty = function () {
            var gameObj = {};
            gameObj.Id = '-1';
            gameObj.Date = new Date();
            gameObj.Season = '0';
            gameObj.Opposition = '';
            gameObj.Overs = [];
            gameObj.Team = {};
            return new Models.Game(gameObj);
        };
        return Game;
    }());
    Models.Game = Game;
})(Models || (Models = {}));
