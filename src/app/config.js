(function() {
  'use strict';

  angular
  .module('alarmClock')
  .config(config);

  /** @ngInject */
  function config(toastrConfig, localStorageServiceProvider) {

    // Toastr configuration
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 10000;
    toastrConfig.positionClass = 'toast-bottom-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Local storage configuration
    localStorageServiceProvider.setPrefix('alarmClock');

  }

})();
