(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('score_controller', score_controller);

    score_controller.$inject = ['$location', '$scope', '$http', '$element'];

    function score_controller($location, $scope, $http, $element) {
        /* jshint validthis:true */

        var StrokeEnum = Object.freeze({
            "X": -5,
            "W": -2,
            ".": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "7": 7
        });

        var OutEnum = Object.freeze({
            "NO": 0,
            "C": 1,
            "B": 2,
            "R": 4,
            "St": 8,
            "M": 16,
            "LBW": 32
        });


        function string_of_enum(e,value) 
        {
            for (var k in e) if (e[k] == value) return k;
            return null;
        }


        $scope.title = "Loading scores...";
        $scope.game = {};
        $scope.over = 1;
        $scope.overs = [];
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
        $scope.batters = [];
        $scope.onStrike = 0;

        //$scope.scoreTemplateUrl = '/app/games.html';

        $scope.getTeam = function (teamId, gameId) {

            $http.get('/api/games/' + gameId).success(function (data, status, headers, config) {
                $scope.game = data;
                console.info(data);
                angular.forEach(data.Overs, function (over) {
                    over.Deliveries = [];
                    $scope.overs.push(new Models.Over(over));
                });
            });

            $http.get('/api/teams/' + teamId).success(function (data, status, headers, config) {
                $scope.team = data;
                $scope.working = false;
            })
        }

        $scope.selectPlayer = function (index) {
            if ($scope.striker.name == undefined) {
                $scope.striker = $scope.team.Players[index];
            }
            else {
                $scope.nonstriker = $scope.team.Players[index];
            }

            var row = {};
            row.Batter = $scope.team.Players[index];
            row.Overs = $scope.overs.slice(0, 4);
            row.Runs = 0;
            $scope.batters.push(row);
        }

        $scope.adjustRuns = function () {
            var currentDelivery = $scope.delivery;
            var dlvy = $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries[currentDelivery - 1];
            dlvy.runs = parseInt($('#run-value', $element)[0].value); // There's surely a better way but this will do for now
        }

        $scope.playShot = function (shot, runs) {
            var table = $('#scoresheet-table');

            if ($scope.opener.Player == undefined) {
                $scope.opener.Player = $scope.striker;
                $scope.opener.Score = 0;
                $scope.runner.Player = $scope.nonstriker;
                $scope.runner.Score = 0;
            }
            
            $scope.shot = shot;
            $scope.runs = runs;

            var deliv = {};
            deliv.id = 0;
            deliv.Number = $scope.delivery + 1;
            deliv.Stroke = shot;
            deliv.Runs = $scope.runs;
            deliv.Dismissal = (runs == -5 ? shot : 0);
            deliv.Player = $scope.batters[$scope.onStrike].Player;

            var delivery = new Models.Delivery(deliv);

            if (runs == -5) {
                console.info(string_of_enum(OutEnum, shot));
            }
            else {
                console.info(string_of_enum(StrokeEnum, shot));
            }

            $scope.batters[$scope.onStrike].Runs += runs;
            $scope.batters[$scope.onStrike].Overs[$scope.over - 1].Number = $scope.delivery;
            $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries.push(delivery);
            $scope.delivery = $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries.length;
        }

        $scope.saveDelivery = function () {

            if ($scope.game.Overs[$scope.over - 1].Deliveries == null) {
                $scope.game.Overs[$scope.over - 1].Deliveries = [];
            }
            
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


                //var delivery = {};
                //delivery.Id = 0;
                //delivery.Number = $scope.delivery;
                //delivery.Batter = $scope.striker;
                ////delivery.Bowler = $scope.nonstriker;
                //delivery.Runs = $scope.runs;
                //delivery.Stroke = $scope.shot;
                //delivery.Dismissal = ($scope.runs == -5) ? $scope.shot : 0;


                //$scope.game.Overs[$scope.over - 1].Deliveries.push(delivery);
                console.info($scope.game);

                $http.put('/api/games/' + $scope.game.Id, { game: $scope.game }).success(function (data, status, headers, config) {
                    console.info(headers);
                });
            }
        }

        //$scope.addOver = function (over) {

        //    console.info("Game: " + gameId + ", Innings: " + inningsType + ", Over #: " + number);

        //    $http.post('/api/overs/' + gameId, { Number: over.Number, Innings: over.Innings }).success(function (data, status, headers, config) {

        //    })
        //}

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
