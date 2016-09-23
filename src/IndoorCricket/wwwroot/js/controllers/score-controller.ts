/// <reference path="../services/score.ts" />


module Controllers {
    'use strict';

    export class Score {
        static $inject = [
            Utility.Angular.$scope, Utility.Angular.$routeParams, Utility.Services.scoreService
        ];
        //public nominations: Array<Models.Nomination>;
        //public categories: Array<Models.Category>;
        //private location;
        //public newCategory: Models.Category;
        //public newNomination: Models.Nomination;
        //public nominee: Models.Nomination;
        private scoreService;
        public getTeam: Function;
        public setGame: Function;
        public Games: Array<Models.Game>;
        public Frames: Array<Models.Frame>;
        public Game: Models.Game;
        public Team: Models.Team;
        public get: Function;

        constructor($scope: any, $routeParams: any, scoreService) {

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

            function string_of_enum(e, value) {
                for (var k in e) if (e[k] == value) return k;
                return null;
            }

            $scope.vm = this;
            var overNumber = 0;
            var deliveryNumber = 0;

            //$scope.newCategory = new Models.Category(Utility.GuidBuilder.New(), '', '');
            $scope.games = [];
            $scope.categories = [];
            $scope.Game = {};
            //$scope.newNomination = new Models.Nomination(Utility.GuidBuilder.New(), '', null, '', new Date(), false);
            //this.location = $location;
            $scope.Team = {};
            $scope.frames = [];
            scoreService = scoreService;
            $scope.hideSelected = true;
            $scope.striker = {};
            $scope.lastShotRuns = 0;


            scoreService.games().then((g: Array<Models.Game>) => {
                $scope.games = g;
            });

            $scope.get = function (id) {
                $scope.Game = scoreService.get(id);
                $scope.Game.Date = $scope.Game.Date; // dateFns.format($scope.Game.Date, 'DD/MM/YYYY');
                $scope.hideSelected = false;
            };

            $scope.setGame = function (index) {
                var id = $scope.games[index].Id;

                scoreService.get(id).then((gm: Models.Game) => {
                    $scope.Game = gm;
                });
            }

            $scope.getTeam = function (id) {
                console.info('calling team');
                $scope.Team = scoreService.team(id);
            };

            $scope.selectPlayer = function (index) {
                $scope.striker = $scope.Game.Team.Players[index];
                var frame = Models.Frame.createEmpty();
                frame.Player = $scope.striker;
                frame.Overs = [];

                for (var i = 0; i < 4; i++) {
                    var ov = $scope.Game.Overs[i];
                    frame.Overs.push(ov);
                }

                $scope.frames.push(frame);

            };

            $scope.playShot = function (shot, runs) {
                $scope.lastShotRuns = runs;
            
                var dliv = Models.Delivery.createEmpty();
                dliv.Number = ($scope.Game.Overs[overNumber].Deliveries.length) + 1;
                dliv.Batter = $scope.striker;
                dliv.Stroke = shot;
                dliv.Runs = runs;
                dliv.Dismissal = (runs == -5 ? shot : 0);

                //$scope.Game.Overs[overNumber].Deliveries.push(dliv);
                $scope.frames[0].Overs[overNumber].Deliveries = [];
                $scope.frames[0].Overs[overNumber].Deliveries.push(dliv);

                console.info($scope.frames);
                /*
                dirty = true;
                //var table = $('#scoresheet-table');
                //var frm = $scope.frames.length - 1;

                var frame = $scope.frames[$scope.frames.length - 1];
                $scope.shot = shot;
                $scope.runs = runs;
                $('#run-value', $element)[0].value = runs;

                // get the current over
                var o = frame.Overs[over - 1];
                var len = o.deliveries.length;

                var deliv = {};
                deliv.id = 0;
                deliv.Number = $scope.delivery + 1;
                deliv.Stroke = shot;
                deliv.Runs = $scope.runs;
                deliv.Dismissal = (runs == -5 ? shot : 0);
                deliv.Batter = frame.Player;
                deliv.Bowler = null;

                var delivery = new Models.Delivery(deliv);



                if (o.deliveries.length == 0) {
                    console.info("no deliveries yet");
                    o.deliveries.push(deliv);
                } else {
                    console.info("deliveries");
                    console.info(o.deliveries[len - 1]);
                    if (o.deliveries[len - 1].id == 0) {
                        o.deliveries[len - 1] = deliv;
                    } else {
                        o.deliveries.push(deliv);
                    }
                }
                */
            }

            //nominationService.get().then((noms: Array<Models.Nomination>) => {
            //    $scope.nominations = noms;
            //});

            //nominationService.getCategories().then((cats: Array<Models.Category>) => {
            //    $scope.categories = cats;
            //    console.info($scope.categories);
            //});

            //$scope.nominate = function () {
            //    var nominee = $scope.newNomination;
            //    gameService.addNomination(nominee);
            //};


            //$scope.addCategory = function () {
            //    var model = $scope.newCategory;
            //    var result = gameService.addCategory(model);
            //};
        }


    }
}

/*

    function game_controller($location, $scope, $http) {
var vm = this;
vm.title = 'game_controller';

$scope.title = "Loading games...";
$scope.games = [];
$scope.selected = {};
$scope.working = true;

$http.get('/api/games').success(function (data, status, headers, config) {
    $scope.games = data;
    $scope.working = false;
}).error(function (data, status, headers, config) {
    $scope.title = 'catastrophic failure';
    $scope.working = true;
});

$scope.getGame = function (id) {

    $http.get('/api/games/' + id).success(function (data, status, headers, config) {
        $scope.selected = data;
        console.info(data.Overs);
        console.info($scope.selected);
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


*/