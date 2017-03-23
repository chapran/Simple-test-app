'use strict';

angular
    .module('testPage')
    .component('testContent', {
        templateUrl: 'assets/testPage/testContent.tpl.html',
        controller: ["$http", '$routeParams', '$location', 'getResultService', function testContentController($http, $routeParams, $location, getResultService) {
            var self = this;
            $http({
                url: 'getTest.php',
                method: "GET",
                params: {Id: $routeParams.testId}
            }).then(function (response) {
                self.test = response.data;
            });
            self.answers = {};

            self.toggleCheckbox = function(elem, questionId){
                var elemIndex = elem.$index;
                if (elemIndex in self.answers[questionId]) {
                    delete self.answers[questionId][elemIndex];
                } else {
                    self.answers[questionId][elemIndex] = true;
                }
                console.log(self.answers[questionId]);
            };

            self.submit = function (valid) {
                self.answers.testId = self.test.id;
                console.log(self.answers);
                if(!valid){
                    for(var i = 0; i < document.forms.testForm.elements.length; i++) {
                        checkIfValid(document.forms.testForm.elements[i]);
                    }
                } else {
                    console.log('valid');
                    // $http.post("calcResult.php", self.answers)
                    //     .then(function(response) {
                    //         getResultService.set({user: self.answers.username, score: JSON.parse(response.data)});
                    //         $location.path('/results');
                    // }, function (data) {
                    //     console.log(data);
                    // })
                }
            };
        }]
    });