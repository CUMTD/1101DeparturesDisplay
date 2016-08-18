var DeparturesViewModel = (function () {
	
	'use strict';
	
	var DEPARTURE_REFRESH_RATE = 30000;
	var MAX_DEPARTURES = 4;
	
	var DeparturesViewModel = function(updateService) {
		
		var _this = this;
		
		_this.updateService = updateService;
		_this.timer = null;
		
		_this.departures = ko.observableArray();
		_this.hasDepartures = ko.computed(function() {
			return _this.departures().length > 0;
		});
		
		_this.error = ko.observable(null);
		_this.hasError = ko.computed(function () {
			return _this.error() !== null;
		});
		
		_this.note = ko.computed(function() {
			if (_this.hasError()) {
				return _this.error();
			} else if (!_this.hasDepartures()) {
				return 'There are no departures at this time.';
			}
			return null;
		});
		
		_this.showNote = ko.computed(function() {
			return _this.note() !== null;
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
				if (newDepartures.length > MAX_DEPARTURES) {
					newDepartures = newDepartures.slice(0, MAX_DEPARTURES);
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
