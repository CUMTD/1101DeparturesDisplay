/// <reference path="/lib/moment-2.10.3.js" />
/// <reference path="/lib/knockout-3.3.0.js" />
/// <reference path="/ajax.js" />

var TimeViewModel = (function () {
  
  'use strict';
  
  var TIME_ENDPOINT = 'http://dev.mtdweb.cumtd.com/api/time';
  var TICK_TIME = 10000; // 10 seconds
  var SYNC_TIME = 600000; // 10 minutes
  
  return function TimeViewModel() {
    var self = this;
    self.time = ko.observable(moment());
    self.formattedTime = ko.computed(function () { return self.time().format("h:mm A"); });

    self.fetch = function () {
      var ajax = new Ajax();
      ajax.request(TIME_ENDPOINT, function (data) {
        self.time(moment(data));
      }, false);      
    };

    window.setInterval(function () {
      self.time(self.time().add(TICK_TIME / 1000, 'seconds'));
    }, TICK_TIME);

    window.setInterval(self.fetch, SYNC_TIME); 
    self.fetch();

  };
  
}());