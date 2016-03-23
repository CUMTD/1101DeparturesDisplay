/// <reference path="./departure.js" />
/// <reference path="./lib/jquery.js" />


var DepartureUpdateService = (function () {
	
	'use strict';
	
	var API_KEY = '3231f3146fbc4dcdb39bd37bed5f6438';
	var API_VERSION = '2.2';
	var STOP_ID = 'UNICTGRV';
		
	var DepartureUpdateService = function () {
	};
	
	DepartureUpdateService.prototype.getDepartures = function(callback) {
		var requestUrl = 'https://developer.cumtd.com/api/v' + API_VERSION + '/json/getdeparturesbystop?key=' + API_KEY + '&stop_id=' + STOP_ID + '&pt=60';
		
		$.ajax({
			url: requestUrl,
			dataType: 'json'
		}).then(function(data) {
			if (data && data.status && data.status.code === 200) {
					var mapped = data.departures.map(function (d) {
						return new Departure(d);
					});
					callback(null, mapped);
				} else {
					callback('Error getting departures');
				}
		}, function() {
			callback('Error getting departures');
		});;
		
	};
		
	return DepartureUpdateService;
})();