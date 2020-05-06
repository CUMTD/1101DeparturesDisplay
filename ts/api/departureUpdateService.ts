import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import Departure from './departure';
import ApiDeparture from './interfaces/departure';
import Response from './interfaces/response';

export default class DepartureUpdateService {
	private static API_KEY = '667b76df6e904ef49c84ca515a8eef82';
	private static API_VERSION = 'v2.2';
	private static MAX_DEPARTURES = 4;

	public static getDepartures = (stopId: string, callback: (departures: Departure[], error: boolean) => void) => {
		const requestUrl = `https://developer.cumtd.com/api/${DepartureUpdateService.API_VERSION}/json/getdeparturesbystop?key=${DepartureUpdateService.API_KEY}&stop_id=${stopId}&pt=60`;

		axios
			.default
			.get<Response>(requestUrl)
			.then((axiosXhr: AxiosResponse<Response>) => {
				if (axiosXhr === null || axiosXhr.data === null || axiosXhr.data.status.code !== 200) {
					callback(null, true);
				} else {
					let mappedDepartures = axiosXhr
						.data
						.departures
						.map((departure: ApiDeparture) => new Departure(departure));
					mappedDepartures = mappedDepartures.slice(0, Math.min(DepartureUpdateService.MAX_DEPARTURES, mappedDepartures.length));
					callback(mappedDepartures, false);
				}
			})
			.catch((error: any) => {
				console.error(error);
				window.setTimeout(() => document.location.reload(), 300000); // try to reload in 5 minutes
				callback(null, true);
			});

	};

}