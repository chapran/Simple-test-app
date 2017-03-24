'use strict';

angular
    .module('testPage')
    .component('testContent', {
        templateUrl: 'assets/testPage/testContent.tpl.html',
        controller: ["$http", '$routeParams', '$location', 'getResultService', "$interval", '$scope',
            function testContentController($http, $routeParams, $location, getResultService, $interval, $scope) {
            var self = this;
            $http({
                url: 'getTest.php',
                method: "GET",
                params: {Id: $routeParams.testId}
            }).then(function (response) {
                self.test = response.data;
                self.timeToComplete = new Date().getTime() + (self.test.timeToComplete * 60 * 1000);
            });
            self.answers = {};

            self.toggleCheckbox = function(elem, questionId){
                var elemIndex = elem.$index;
                if (elemIndex in self.answers[questionId]) {
                    delete self.answers[questionId][elemIndex];
                } else {
                    self.answers[questionId][elemIndex] = true;
                }
            };

            self.submit = function (valid) {
                self.answers.testId = self.test.id;
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

            self.timer = $interval(function () {
                var now = new Date().getTime();

                var distance = self.timeToComplete - now;

                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                hours = (hours < 10) ? '0' + hours : hours;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                minutes = (minutes < 10) ? '0' + minutes : minutes;
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                seconds = (seconds < 10) ? '0' + seconds : seconds;

                self.timeLeft = hours + ":"
                    + minutes + ":" + seconds;

                if (distance < 0) {
                    alert('Sorry, your time has expired!');
                    $interval.cancel(self.timer);
                    self.timer = undefined;
                    $location.path('/');
                }
            }, 1000);

            $scope.$on('$destroy',function(){
                if(self.timer)
                    $interval.cancel(self.timer);
            });
        }]
    });