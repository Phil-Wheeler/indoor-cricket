var Models;
(function (Models) {
    'use strict';
    var Game = (function () {
        function Game(game) {
            this.id = game.Id;
            this.date = game.Date;
            this.teamId = game.teamId;
        }
        return Game;
    })();
    Models.Game = Game;
})(Models || (Models = {}));
