import Route from './route';

interface ApiDeparture {
	stop_id: string;
	headsign: string;
	route: Route;
	is_monitored: boolean;
	is_scheduled: boolean;
	scheduled: string;
	expected: string;
	expected_mins: number;
}
export default ApiDeparture;