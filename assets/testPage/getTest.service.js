'use strict';

angular
    .module('testPage')
    .factory('Test', ['$resource',
    function($resource) {
        return $resource('assets/tests/:testId.json', {}, {
            query: {
                method: 'GET'
            }
        });
    }
]);