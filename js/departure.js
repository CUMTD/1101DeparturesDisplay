/// <reference path="/lib/moment-2.10.3.js" />

var Departure = (function () {
	
	'use strict';
	
	var STOP_NAME_MAPPING = {
		'UNICTGRV:1': 'Northeast Corner',
		'UNICTGRV:3': 'Southwest Corner',
		'UNICTGRV:9': '1101 Office'
	};
		
	return function Departure(apiDeparture) {
		this.routeColor = '#' + apiDeparture.route.route_color;
		this.textColor = '#' + apiDeparture.route.route_text_color;
		this.headsign = apiDeparture.headsign;
		this.isMonitored = apiDeparture.is_monitored;
		this.scheduled = moment(apiDeparture.scheduled).format('H:mm a');
		this.expected = apiDeparture.expected_mins;
		this.stopLocation = STOP_NAME_MAPPING[apiDeparture.stop_id];
		
		Object.defineProperty(this, 'expectedText', {
			get: function () {
				if (this.isMonitored) {
					if (this.expected === 0) {
						return 'due';
					} else {
						return this.expected;
					}
				}
				return this.scheduled;
			}
		});
		
		Object.defineProperty(this, 'isHopper', {
			get: function () {
				return this.headsign.match(/hopper/i);
			}
		});
		
	};
		
})();