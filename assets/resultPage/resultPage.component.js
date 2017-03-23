'use strict';

angular
    .module('resultPage')
    .component('resultPage', {
        templateUrl: 'assets/resultPage/resultPage.tpl.html',
        controller: ['getResultService', '$location', '$window', function resultPageController(getResultService, $location, $window) {
            var self = this;
            self.result = getResultService.get();
            if(!Object.keys(self.result).length){
                $location.path('/')
            } else self.firstname = self.result.user.split(' ')[0];

            self.back = function () {
                $window.history.back();
            };
        }]
    });