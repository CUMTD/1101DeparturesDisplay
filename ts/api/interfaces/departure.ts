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
	vehicle_id: string;
	trip: {
		trip_id: string | null;
		trip_headsign: string | null;
		route_id: string | null;
		block_id: string | null;
		direction: string | null;
		service_id: string | null;
		shape_id: string | null;
	}
}
export default ApiDeparture;