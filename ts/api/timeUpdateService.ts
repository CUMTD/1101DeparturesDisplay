import * as axios from 'axios';
import { AxiosResponse } from 'axios';
import * as moment from 'moment';

export default class TimeUpdateService {
	public static getTime = (callback: (time: moment.Moment) => void) => {
		axios.default
			.get<string>('https://mtdweb.cumtd.com/api/time')
			.then((axiosXhr: AxiosResponse<string>) => {
				return moment(axiosXhr.data);
			})
			.catch((error: any) => {
				return moment();
			});

	};

}