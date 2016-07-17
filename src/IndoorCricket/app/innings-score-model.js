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
            this.id = delivery.Id;
            this.number = delivery.Number;
            this.stroke = delivery.Stroke;
            this.runs = delivery.Runs;
            this.dismissal = delivery.Dismissal;
            this.Batter = delivery.Batter;
            this.Bowler = delivery.Bowler;
        }
        return Delivery;
    })();
    Models.Delivery = Delivery;


    var Frame = (function () {
        function Frame(player) {
            this.Overs = [];
            this.Player = player;
            this.Runs = function () {

                var thisFrame = this;

                var runningTotal = thisFrame.Overs.map(function (index, el) {

                    var overScore = index.deliveries.map(function () {
                        return $(this).Runs;
                    })
                    .reduce(add, 0);
                    return overScore;
                })
                .reduce(add, 0);

                return runningTotal;
                //console.info(runningTotal);
            }

            function add(a, b) {
                return a + b;
            }
        }
        return Frame;
    })();
    Models.Frame = Frame;

})(Models || (Models = {}));
