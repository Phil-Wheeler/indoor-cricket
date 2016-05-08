// Write your Javascript code.

window.Cricket = {
    Models: {},
    Collections: {},
    Views: {},

    start: function (data) {
        console.log('Cricket Manager started!');
        var games = new Cricket.Collections.Games(data), router = new Cricket.Router();

        var router = new Cricket.Router();

        router.on('route:home', function () {
            console.info('route');
            router.navigate('game', {
                trigger: true,
                replace: true
            });
        });

        router.on('route:showGames', function () {
            var gamesView = new Cricket.Views.Games({
                collection: games
            });

            $('.games').html(gamesView.render().$el);
        });

        router.on('route:newGame', function () {
            console.log('New game');
        });

        router.on('route:editGame', function (id) {
            console.log('Edit game');
        });

        Backbone.history.start();
    }
};

