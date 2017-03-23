angular
    .module('getResultService')
    .factory('getResultService', function () {
        var savedData = {};
        function set(data) {
            savedData = data;
        }
        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    });