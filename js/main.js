(function () {
	// setup departures
	var viewModel = new DeparturesViewModel(new DepartureUpdateService());
	ko.applyBindings(viewModel, document.getElementById('departures'));
	viewModel.startUpdates();

	// setup clock
	ko.applyBindings(new TimeViewModel(), document.getElementById('clock'));

	// reload the page once a day
	window.setTimeout(function () {
		window.location.reload(true);
	}, 1440000); // 24 hours
})();