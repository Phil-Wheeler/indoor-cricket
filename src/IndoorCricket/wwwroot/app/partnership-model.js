var Models;
(function (Models) {
    'use strict';
    var Partnership = (function () {
        function Partnership(partnership) {
            this.batter = partnership.Batter;
            this.partner = partnership.Partner;
        }
        return Partnership;
    })();
    Models.Partnership = Partnership;


})(Models || (Models = {}));
