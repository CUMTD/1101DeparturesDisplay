/// <reference path="./lib/moment.js" />

var Departure = (function () {
	
	'use strict';
	
	var STOP_NAME_MAPPING = {
		'UNICTGRV:1': 'Northeast Corner',
		'UNICTGRV:3': 'Southwest Corner',
		'UNICTGRV:9': '1101 Office'
	};
		
	return function Departure(apiDeparture) {
		
		var self = this;
		
		self.routeColor = '#' + apiDeparture.route.route_color;
		self.textColor = '#' + apiDeparture.route.route_text_color;
		self.headsign = apiDeparture.headsign;
		self.isMonitored = apiDeparture.is_monitored;
		self.scheduled = moment(apiDeparture.scheduled).format('h:mm a');
		self.expected = apiDeparture.expected_mins;
		self.stopLocation = STOP_NAME_MAPPING[apiDeparture.stop_id];
		
		self.showMins = ko.computed(function() {
			return self.isMonitored && self.expected !== 0;
		});
		self.showS = ko.computed(function() {
			return self.expected > 1;
		});
		
		Object.defineProperty(self, 'expectedText', {
			get: function () {
				if (self.isMonitored) {
					if (self.expected === 0) {
						return 'due';
					} else {
						return self.expected;
					}
				}
				return self.scheduled;
			}
		});
		
		Object.defineProperty(self, 'isHopper', {
			get: function () {
				return self.headsign.match(/hopper/i);
			}
		});
		
	};
		
})();