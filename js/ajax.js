var Ajax = (function () {
	
	'use strict';
	
	function Ajax() { };
	
	Ajax.prototype.request = function (url, callback, withCredentials) {
		var xmlhttp = new XMLHttpRequest();
		
		if (withCredentials !== null) {
			xmlhttp.withCredentials = withCredentials;
		}
		
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var data = JSON.parse(xmlhttp.responseText);
				callback(data);
			}
		};
		
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
		
	};
	
	return Ajax;
	
})();