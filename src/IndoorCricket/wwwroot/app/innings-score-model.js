var Models;
(function (Models) {
    'use strict';
    var Over = (function () {
        function Over(over) {
            this.id = over.Id;
            this.number = over.Number;
            this.batting = over.IsBatting;
            this.deliveries = over.Deliveries;
        }
        return Over;
    })();
    Models.Over = Over;

    var Delivery = (function () {
        function Delivery(delivery) {
            this.Id = delivery.Id;
            this.Number = delivery.Number;
            this.Stroke = delivery.Stroke;
            this.Runs = delivery.Runs;
            this.Dismissal = delivery.Dismissal;
            this.Batter = delivery.Batter;
            this.Bowler = delivery.Bowler;

        }
        return Delivery;
    })();
    Models.Delivery = Delivery;


    // a Frame is a logical representation ("view model") of a player's block of 4 overs
    var Frame = (function () {
        function Frame(player) {
            this.Overs = [];
            this.Player = player;
            this.Runs = function () {

                var thisFrame = this;

                var runningTotal = thisFrame.Overs.map(function (el, index) {

                    var overScore = el.deliveries.map(function (e) {
                        return e.Runs;
                    })
                    .reduce(add, 0);
                    return overScore;
                })
                .reduce(add, 0);

                return runningTotal;
            }

            function add(a, b) {
                return a + b;
            }
        }
        return Frame;
    })();
    Models.Frame = Frame;

})(Models || (Models = {}));
