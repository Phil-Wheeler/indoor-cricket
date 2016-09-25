/*
    A frame is a set play that includes a player, series of overs and the child deliveries.
*/
var Models;
(function (Models) {
    'use strict';
    var Frame = (function () {
        function Frame(Player, Overs) {
            var _this = this;
            this.Runs = function () {
                return _this.Overs.length;
            };
        }
        Frame.createEmpty = function () {
            return new Models.Frame(null, []);
        };
        return Frame;
    }());
    Models.Frame = Frame;
})(Models || (Models = {}));
