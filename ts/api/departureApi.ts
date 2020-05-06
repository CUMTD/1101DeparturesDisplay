import Departure from './departure';
import DepartureResponse from './interfaces/response';

const API_KEY = '667b76df6e904ef49c84ca515a8eef82';
const API_VERSION = 'v2.2';
const MAX_DEPARTURES = 4;

export async function getDepartures(stopId: string): Promise<Departure[]> {
	let response: Response | null = null;
	try {
		response = await fetch(`https://developer.mtd.org/api/${API_VERSION}/json/getdeparturesbystop?key=${API_KEY}&stop_id=${stopId}&pt=60&count=${MAX_DEPARTURES}`);
		const json = await response.json() as DepartureResponse;
		return json
			.departures
			.map(d => new Departure(d));
	} catch (ex) {
		console.error('Error fetching departures', ex);
		throw ex;
	}
}