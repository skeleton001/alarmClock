(function() {
  'use strict';

  describe('controllers', function(){
    var vm;
    var $interval;
    var toastr;
    var $state;
    var localStorageService;
    var $filter;

    beforeEach(angular.mock.module('alarmClock'));
    beforeEach(inject(function(_$controller_, _toastr_, _$interval_, _localStorageService_, _$state_, _$filter_) {
      spyOn(_toastr_, 'info').and.callThrough();
      vm = _$controller_('AlarmController');
      toastr = _toastr_;
      $interval = _$interval_;
      localStorageService =_localStorageService_;
      $state = _$state_;
      $filter = _$filter_;
    }));

    it('should be defined', function() {
    expect(vm).toBeDefined();
    });

    it('should have a timestamp creation date', function() {
      expect(vm.time).toEqual(new Date());
    });

    it('should show a Toastr info when invoke ring()', function() {
      vm.ring();
      expect(toastr.info).toHaveBeenCalled();
      
    });
  });
})();
