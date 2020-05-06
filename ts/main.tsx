import * as React from 'react';
import * as reactDom from 'react-dom';
import App from './components/app';

(() => {
	console.log('started', new Date());

	let reload = () => document.location.reload();
	window.setTimeout(reload, 7200000); // try to reload in 2 hours

	let app = <App stopId="UNICTGRV" />;
	let element = document.getElementById('app');
	reactDom.render(app, element);
})();
