import * as axios from 'axios';
import * as moment from 'moment'

export default class TimeUpdateService {
	public static getTime = (callback: (time: moment.Moment) => void) => {
		axios
			.get<string>('https://mtdweb.cumtd.com/api/time')
			.then(axiosXhr => {
				return moment(axiosXhr.data);
			})
			.catch((error: any) => {
				return moment();
			});

	};

}