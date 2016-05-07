var Models;
(function (Models) {
    'use strict';
    var Team = (function () {
        function Team(team) {
            this.id = team.Id;
            this.name = team.Name;
        }
        return Team;
    })();
    Models.Team = Team;
})(Models || (Models = {}));
