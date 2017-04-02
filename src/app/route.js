(function() {
  'use strict';

  angular
  .module('alarmClock')
  .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('alarm', {
      url: '/home',
      templateUrl: 'app/components/alarm/alarm.html',
      controller: 'AlarmController',
      controllerAs: 'alarm'
    })
    .state('alarm.new',{
      url: '/newAlarm',
      templateUrl: 'app/components/alarm/newAlarm.html'
    })
    .state('alarm.list',{
      url: '/list',
      templateUrl: 'app/components/alarm/list.html'
    });

    $urlRouterProvider.otherwise('/home/list');
  }

})();
