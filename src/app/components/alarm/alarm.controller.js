(function(){
  'use strict';

// Alarm Controller
angular
.module('alarmClock')
.controller('AlarmController', AlarmController);

/** @ngInject */
function AlarmController($interval, localStorageService, toastr, $state, $filter) {

//using Controller as syntax in router to get rid of $scope
//setting up View Model
var vm = this;

// Configuring TimePicker settings
vm.hstep = 1;
vm.mstep = 1;
vm.ismeridian = true;
vm.meridian = "shortTime";

// Current Time
vm.time = new Date();

// Week Days array
vm.days = [{"name":"SUN","id":"0"},{"name":"MON","id":"1"},{"name":"TUE","id":"2"},{"name":"WED","id":"3"},{"name":"THU","id":"4"},{"name":"FRI","id":"5"},{"name":"SAT","id":"6"}];

// Alarms array
vm.alarms = [];
vm._alarmsObj = [];

// Loading alarms if present in Local storage
if(localStorageService.get("alarms")){
  vm.alarms = localStorageService.get("alarms");
}; 

// Alarm Object
vm.alarm = {};
vm.alarm.title = "Alarm";
vm.alarm.time = new Date();
vm.alarm.isActive = true;
vm.alarm.isRepeat = false;
vm.alarm.isTomorrow = false;
vm.alarm.repeatDays = [];

// Is Alarm Exit
vm.isExist = false;

//Check isTomorrow for given alarm time value
vm.isTomorrowCheck = _isTomorrowCheck;

// Week days checkbox selection object
vm.selection = _reloadSelection();

// Checkbox Changed watcher
vm.checkboxChanged = _calculateSomeSelected;

// Generate or Sort Days in repeatDays array
vm.sortDays = _sortDays;

// Form submit function
vm.setAlarm = _setAlarm;

// Alarm value changed function
vm.changed = _checkAlarm;

// Ring Alarm; Shoe toast
vm.ring = _ringAlarm; 

 //get current Time Stamp
vm.getTime = _currentTime;

// Delete all Alarms
vm.deleteAllAlarm = _deleteAllAlarm;


// Core Alarm Engine; Runs at every 990 ms 
$interval(function () {            
  vm.getTime();
  angular.forEach(vm.alarms, function(alarm, index) {
    vm.getTime();
    vm._alarmObj = JSON.parse(alarm);
    vm._alarmObj.time = new Date(vm._alarmObj.time);
    if(vm._alarmObj.time.toTimeString() <= vm.time.toTimeString()){
      if(vm._alarmObj.isActive && !vm._alarmObj.isTomorrow){
        if(vm._alarmObj.isRepeat){
          angular.forEach(vm._alarmObj.repeatDays, function(repeatDay){
            if(repeatDay == vm.time.getDay()){
              vm.ring(vm._alarmObj.time, vm._alarmObj.title);
            }
          });
        } else {
          vm.ring(vm._alarmObj.time, vm._alarmObj.title);
          vm._alarmObj.isActive = false;
        }
      }
      vm._alarmObj.isTomorrow = true;
    } else {
      vm._alarmObj.isTomorrow = false;
    }
  vm.alarms[index] = angular.toJson(vm._alarmObj);
  vm._alarmsObj[index] = vm._alarmObj;
});
  _updateSotredAlarms();
}, 990);






///////////////////////////////////////////////////////////////
// Implementations

function _isTomorrowCheck(){
  vm.getTime();
  if (vm.alarm.time.toTimeString() < vm.time.toTimeString()) {
    vm.alarm.isTomorrow = true;
  } else {
    vm.alarm.isTomorrow = false;
  }
}

function _reloadSelection(){
  return {"0":true,"1":true,"2":true,"3":true,"4":true,"5":true,"6":true};
}

function _calculateSomeSelected() {
  vm.someSelected = Object.keys(vm.selection).some(function (key) {
    return vm.selection[key];
  });
  if(!vm.someSelected){
    vm.alarm.isRepeat = false;
    vm.selection = reloadSelection();
  }
}

function _sortDays() {
  vm.alarm.repeatDays= [];
  if(vm.alarm.isRepeat){
    angular.forEach(vm.selection, function(day, index) {
      if(day){
        vm.alarm.repeatDays.push(index);
      }
    });
  }
}

function _ringAlarm(time, title) {
  time = $filter('date')(time, 'shortTime');
  toastr.info('It\'s ' + time, ''+ title);
}

function _currentTime() {
  vm.time = new Date();
}

function _updateSotredAlarms() {
  localStorageService.set("alarms", vm.alarms);
}


function _checkAlarm() {
  for (var i = 0; i < vm._alarmsObj.length; i++) {
    vm.alarm.time.setSeconds(0);
    if(vm.alarm.time.toTimeString() == vm._alarmsObj[i].time.toTimeString()){
      vm.isExist = true;
      break;
    }else{
      vm.isExist = false;
    }
  }
}

function _deleteAllAlarm() {
  localStorageService.clearAll();
  vm.alarms = [];
  vm._alarmsObj = [];
}

function _setAlarm() {   
  vm.sortDays();
  vm.isTomorrowCheck();
  vm.alarm.time.setSeconds(0);
  vm.alarm.time = vm.alarm.time.toGMTString();
  vm._alarm = angular.toJson(vm.alarm);
  vm.alarms.push(vm._alarm);
  _updateSotredAlarms();
  vm.alarm.time = new Date();
  $state.go('alarm.list');  
}
}
})();