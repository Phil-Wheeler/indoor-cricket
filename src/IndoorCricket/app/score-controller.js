(function () {
    'use strict';

    angular
        .module('Cricket', [])
        .controller('score_controller', score_controller);

    score_controller.$inject = ['$location', '$scope', '$http', '$element'];

    function score_controller($location, $scope, $http, $element) {
        /* jshint validthis:true */
        var dirty = false;

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
        //$scope.over = 1;
        $scope.overs = [];
        $scope.delivery = 0;
        $scope.deliveries = [];
        $scope.team = {};
        $scope.selected = {};
        $scope.shot = 0;
        $scope.runs = 0;
        $scope.working = true;
        $scope.batters = [];
        $scope.partnerships = [];
        $scope.onStrike = 0;
        $scope.frames = [];

        var saved = false;
        var over = 1;

        $scope.init = function ()
        {
            //console.info($location);
        }

        $scope.getTeam = function (teamId, gameId) {

            $http.get('/api/games/' + gameId).success(function (data, status, headers, config) {
                $scope.game = data;
                angular.forEach(data.Overs, function (over) {
                    over.Deliveries = [];
                    $scope.overs.push(new Models.Over(over));
                });
                $scope.team = data.Team;
            });

        }

        $scope.selectPlayer = function (index) {
            dirty = true;

            var frame = new Models.Frame($scope.team.Players[index]);
            for (var i = 0; i < 4; i++) {
                var ov = $scope.overs[i];
                frame.Overs.push(ov);
            }

            var setPlayers = $($scope.frames).map(function (i, e) {
                return e.player;
            });

            var alreadyAdded = $.inArray(frame.Player, setPlayers.get()) > -1;

            if (!alreadyAdded) {
                $scope.frames.push(frame);
                $scope.batters.push(frame.Player);
            }
        }

        $scope.adjustRuns = function () {
            dirty = true;
            var currentDelivery = $scope.delivery;
            var dlvy = $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries[currentDelivery];
            dlvy.runs = parseInt($('#run-value', $element)[0].value); // There's surely a better way but this will do for now
        }

        $scope.playShot = function (shot, runs) {
            dirty = true;
            var table = $('#scoresheet-table');
            var frm = $scope.frames.length - 1;
            
            $scope.shot = shot;
            $scope.runs = runs;
            $('#run-value', $element)[0].value = runs;
            

            var deliv = {};
            deliv.id = 0;
            deliv.Number = $scope.delivery + 1;
            deliv.Stroke = shot;
            deliv.Runs = $scope.runs;
            deliv.Dismissal = (runs == -5 ? shot : 0);
            deliv.Batter = $scope.batters[$scope.onStrike].Batter;
            deliv.Bowler = null;

            var delivery = new Models.Delivery(deliv);

            var frame = $scope.frames[frm];

            // get the current over
            console.info(frame);
            var o = frame.Overs[over - 1];
            var len = o.deliveries.length;

            if (o.deliveries.length == 0) {
                console.info("no deliveries yet");
                o.deliveries.push(deliv);
            } else {
                console.info("deliveries");
                if (o.deliveries[len - 1].id == 0) {
                    o.deliveries[len - 1] = deliv;
                } else {
                    o.deliveries.push(deliv);
                }
            }

            console.info(frame.Runs());

            /*
            if (lastShot === undefined || lastShot.id == 0) {
                lastShot.runs = $scope.runs;
            }
            else {
                frame.shots.push(deliv);
            }

            $scope.batters[$scope.onStrike].Runs += runs;

            if (saved) {
                $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries.push(delivery);
                saved = false;
            }
            else {
                $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries[$scope.delivery] = delivery;
            }
            */
        }

        $scope.saveDelivery = function () {


            $scope.delivery = $scope.batters[$scope.onStrike].Overs[$scope.over - 1].deliveries.pop();
            console.info(lastShot);
            $scope.game.Overs[$scope.over - 1].Deliveries.push($scope.delivery);


            if ($scope.delivery.Batter == undefined) {
                alert("No batsman selected");
            }
            else {


                $http.put('/api/games/' + $scope.game.Id, { game: $scope.game }).success(function (data, status, headers, config) {
                    if ($scope.delivery > 6) {
                        $scope.over++;
                        $scope.delivery = 1;
                    }
                    else {
                        $scope.delivery++;
                    }
                    saved = true;
                    dirty = false;
                });
            }
        }


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
