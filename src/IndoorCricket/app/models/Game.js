Cricket.Models.Game = Backbone.Model.extend({
    defaults: {
        Id: null,
        Date: null,
        Team: null,
        Opposition: null,
        Overs: null
    },
    initialize: function () {
        this.set('avatar', _.random(1, 15) + '.jpg');
    }
});