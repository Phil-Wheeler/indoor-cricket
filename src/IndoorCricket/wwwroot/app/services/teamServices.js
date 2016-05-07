(function () {
    'use strict';
    var teamServices = angular.module('teamServices', ['ngResource']);

    //teamServices.factory('Teams', ['$resource',
    //  function ($resource) {
    //      return $resource('/api/teams/', {}, {
    //          query: { method: 'GET', params: {}, isArray: true },
    //          find: { method: 'GET', params: {Id}, isArray: false}
    //      });
    //  }]);

    teamServices.factory('Teams', function ($resource) {

        return {

            query: function (teamId) {
                return $resource('/api/teams', {}, {
                    query: { method: 'GET', params: { Id: teamId }, isArray: false }
                }).query();

            }
        }
    });


})();