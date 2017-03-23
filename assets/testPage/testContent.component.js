'use strict';

angular
    .module('testPage')
    .component('testContent', {
        templateUrl: 'assets/testPage/testContent.tpl.html',
        controller: ["$http", '$routeParams', 'Test', '$location', 'getResultService', function testContentController($http, $routeParams, Test, $location, getResultService) {
            var self = this;
            self.test = Test.get({testId: $routeParams.testId});
            self.answers = {};
            self.submit = function (valid) {
                self.answers.testId = self.test.id;
                console.log(self.answers);
                if(!valid){
                    for(var i = 0; i < document.forms.testForm.elements.length; i++) {
                        checkIfValid(document.forms.testForm.elements[i]);
                    }
                } else {
                    $http.post("calcResult.php", self.answers)
                        .then(function(response) {
                            getResultService.set({user: self.answers.username, score: JSON.parse(response.data)});
                            $location.path('/results');
                    }, function (data) {
                        console.log(data);
                    })
                }
            };
            self.checkIfPicked = function(checkObj){
                    return Object.keys(checkObj).some(function (key) {
                        return checkObj[key];
                    });
            }
        }]
    });