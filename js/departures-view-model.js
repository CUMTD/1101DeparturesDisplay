/// <reference path="/lib/knockout-3.3.0.js" />

var DeparturesViewModel = (function () {
	
	'use strict';
	
	var DEPARTURE_REFRESH_RATE = 30000;
	
	var DeparturesViewModel = function(updateService) {
		
		var _this = this;
		
		_this.updateService = updateService;
		_this.timer = null;
		
		_this.departures = ko.observableArray();
		_this.error = ko.observable(null);
		_this.hasError = ko.computed(function () {
			return _this.error() === null;
		});
		
	};
	
	function updateDepartures() {
		var _this = this;
		_this.updateService.getDepartures(function(err, newDepartures) {
			if (err) {
				_this.error(err);
				_this.departures([]);
			} else {
				_this.error(null);
				if (newDepartures.length > 6) {
					newDepartures = newDepartures.slice(0, 6);
				}
				_this.departures(newDepartures);
			}
		});
	}
	
	DeparturesViewModel.prototype.startUpdates = function () {
		this.stopUpdates();
		this.timer = window.setInterval(updateDepartures.bind(this), DEPARTURE_REFRESH_RATE);
		updateDepartures.call(this);
	};
	
	DeparturesViewModel.prototype.stopUpdates = function () {
		if (this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
	};
		
	return DeparturesViewModel;
})();