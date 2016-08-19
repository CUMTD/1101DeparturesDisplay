import Status from './status';
import Request from './request';
import Departure from './departure';
interface Response {
	time: string;
	new_changeset: boolean;
	status: Status;
	rqst: Request;
	departures: Departure[];
}

export default Response;