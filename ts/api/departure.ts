import * as moment from 'moment';
import ApiDeparture from './interfaces/departure';

export default class Departure {

	static STOP_NAME_MAPPING: { [s: string]: string; } = {
		'UNICTGRV:1': 'Northeast Corner',
		'UNICTGRV:3': 'Southwest Corner',
		'UNICTGRV:9': '1101 Office'
	};

	routeColor: string;
	textColor: string;
	headsign: string;
	isMonitored: boolean;
	scheduled: string;
	expected: number;
	stopLocation: string;

	showMins: boolean;
	isHopper: boolean;
	expectedTime: string;
	minsText: string;

	constructor(departure: ApiDeparture) {
		this.routeColor = `#${departure.route.route_color}`;
		this.textColor = `#${departure.route.route_text_color}`;
		this.headsign = departure.headsign;
		this.isMonitored = departure.is_monitored;
		this.scheduled = moment(departure.scheduled).format('h:mm a');
		this.expected = departure.expected_mins;
		this.stopLocation = Departure.STOP_NAME_MAPPING[departure.stop_id];



		this.showMins = this.isMonitored && this.expected !== 0;
		this.isHopper = this.headsign.match(/hopper/i) !== null;
		this.expectedTime = (() => {
			if (this.isMonitored) {
				if (this.expected === 0) {
					return 'due';
				} else {
					return this.expected.toString();
				}
			}
			return this.scheduled;
		})();

		this.minsText = (() => {
			const showMins = this.showMins;
			const showS = this.expected > 1;
            if (showMins && showS) {
                return 'mins';
            } else if (showMins) {
				return 'min';
			} else {
				return '';
			}
        })();


	}
}