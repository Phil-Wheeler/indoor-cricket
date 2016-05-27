(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('score_controller', score_controller);

    score_controller.$inject = ['$location', '$scope', '$http', '$element'];

    function score_controller($location, $scope, $http, $element) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'score_controller';

        $scope.title = "Loading scores...";
        $scope.game = {};
        $scope.over = 1;
        $scope.delivery = 0;
        $scope.deliveries = [];
        $scope.team = {};
        $scope.selected = {};
        $scope.striker = {};
        $scope.nonstriker = {};
        $scope.shot = 0;
        $scope.runs = 0;
        $scope.working = true;
        $scope.opener = {};
        $scope.runner = {};

        $scope.getTeam = function (teamId, gameId) {
            $http.get('/api/games/' + gameId).success(function (data, status, headers, config) {
                $scope.game = data;
                console.info($scope.game);
            });

            $http.get('/api/teams/' + teamId).success(function (data, status, headers, config) {
                $scope.team = data;
                $scope.working = false;
            })
        }

        $scope.selectPlayer = function (index) {
            $scope.nonstriker = $scope.striker;
            $scope.striker = $scope.team.Players[index];
        }

        $scope.playShot = function (shot, runs) {
            var table = $('#scoresheet-table')[0];
            var strikerRow = $('tbody tr:first', table);

            if ($scope.opener.Player == undefined) {
                $scope.opener.Player = $scope.striker;
                $scope.opener.Score = 0;
                $scope.runner.Player = $scope.nonstriker;
                $scope.runner.Score = 0;
            }
            $scope.opener.Score += runs;
            strikerRow.css('border', '1px solid red');
            $scope.shot = shot;
            $scope.runs = runs;
            $('#run-value', $element)[0].value = (runs);
        }

        $scope.saveDelivery = function () {
            var val = $('#run-value', $element)[0].value;
            console.info("Batsman: " + $scope.striker.Name + ", Shot: " + $scope.shot + " for " + val + " runs. ");

            if ($scope.game.Overs[$scope.over - 1].Deliveries == null) {
                $scope.game.Overs[$scope.over - 1].Deliveries = [];
            }
            
            console.info("Over: " + $scope.over + ", Delivery: " + $scope.delivery);
            if ($scope.delivery > 6) {
                $scope.over++;
                $scope.delivery = 1;
            }
            else {
                $scope.delivery++;
            }

            if ($scope.striker == undefined) {
                alert("No batsman selected");
            }
            else {


                var delivery = {};
                delivery.Id = 0;
                delivery.Number = $scope.delivery;
                delivery.Batter = $scope.striker;
                //delivery.Bowler = $scope.nonstriker;
                delivery.Runs = $scope.runs;
                delivery.Stroke = $scope.shot;
                delivery.Dismissal = ($scope.runs == -5) ? $scope.shot : 0;


                $scope.game.Overs[$scope.over - 1].Deliveries.push(delivery);
                console.info($scope.game);

                $http.put('/api/games/' + $scope.game.Id, { game: $scope.game }).success(function (data, status, headers, config) {
                    console.info(headers);
                });
            }
        }

        $scope.addOver = function (over) {

            console.info("Game: " + gameId + ", Innings: " + inningsType + ", Over #: " + number);

            $http.post('/api/overs/' + gameId, { Number: over.Number, Innings: over.Innings }).success(function (data, status, headers, config) {

            })
        }

        //$http.get('/api/games').success(function (data, status, headers, config) {
        //    $scope.games = data;
        //    $scope.working = false;
        //}).error(function (data, status, headers, config) {
        //    $scope.title = 'catastrophic failure';
        //    $scope.working = true;
        //});

        $scope.getGame = function (id) {

            $http.get('/api/games/' + id).success(function (data, status, headers, config) {
                $scope.selected = data;
                console.info(data);
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "failed to find that game";
                $scope.working = true;
            })
        }

        $scope.newGame = function (gameData) {
            $http.post('/api/games', { 'Id': null, 'Date': new Date(), 'Opposition': "Testing" }).success(function (data, status, headers, config) {
                console.info("Game saved");
            }).error(function (data, status, headers, config) {
                console.info("Failed to save");
            });
        };

        activate();

        function activate() { }
    }
})();
