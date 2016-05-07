'use strict';

app.controller('GamesController', function ($scope, bootstrappedGames) {
    $scope.games = bootstrappedGames.games;
});