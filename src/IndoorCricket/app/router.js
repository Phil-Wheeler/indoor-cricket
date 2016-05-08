
Cricket.Router = Backbone.Router.extend({
    routes: {
        '/Home/Game': 'home',
        'game': 'showGames',
        'game/new': 'newGame',
        'game/edit/:id': 'editGame'
    }
});