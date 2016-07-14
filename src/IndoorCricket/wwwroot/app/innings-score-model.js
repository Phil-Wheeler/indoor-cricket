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
        function Frame(frame) {
            this.shots = [];
            this.player = frame.Player;
        }
        return Frame;
    })();
    Models.Frame = Frame;

})(Models || (Models = {}));
