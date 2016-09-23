
/*
    A frame is a set play that includes a player, series of overs and the child deliveries.
*/

module Models {
    'use strict';
    export class Frame {
        public Player: Models.Player;
        public Overs: Array<Models.Over>;

        constructor(Player: Models.Player, Overs: Array<Models.Over>) {
        }

        public static createEmpty = (): Models.Frame => {
            return new Models.Frame(null, []);
        }
    }
}
