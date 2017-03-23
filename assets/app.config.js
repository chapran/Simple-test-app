// 'use strict';

angular.
  module('quizApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          templateUrl: 'assets/startPage/startPage.tpl.html'
        }).
        when('/tests/:testId', {
          template: '<test-content></test-content>'
        }).
        when('/results', {
          template: '<result-page></result-page>'
        }).
        otherwise('/');
    }
  ]);
