Cricket.Views.Game = Backbone.View.extend({
    tagName: 'li',
    className: 'media col-md-6 col-lg-4',
    template: _.template($('#tpl-game').html()),

    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});

Cricket.Views.Games = Backbone.View.extend({
    template: _.template($('#tpl-games').html()),

    renderOne: function (game) {
        console.info(game);
        var itemView = new Cricket.Views.Game({ model: game });
        this.$('.games-container').append(itemView.render().$el);
    },

    render: function () {
        var html = this.template();
        this.$el.html(html);

        console.info(this.html);

        this.collection.each(this.renderOne, this);

        return this;
    }
});
