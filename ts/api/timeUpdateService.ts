import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import moment from 'moment';

export default class TimeUpdateService {
	public static getTime = (callback: (time: moment.Moment) => void) => {
		axios.default
			.get<string>('https://mtdweb.cumtd.com/api/time')
			.then((axiosXhr: AxiosResponse<string>) => {
				return callback(moment(axiosXhr.data));
			})
			.catch(() => {
				return moment();
			});

	};
}