import moment from 'moment';
import React, { FC, useState } from 'react';
import DepartureModel from '../api/departure';
import DepartureUpdateService from '../api/departureUpdateService';
import TimeUpdateService from '../api/timeUpdateService';
import { useInterval } from '../hooks/useInterval';
import { Clock } from './clock';
import Departures from './departures';


interface Props {
	stopId: string;
}

interface AppState {
	time: any;
	departures: DepartureModel[];
	networkError: boolean;
}

const DEPARTURE_UPDATE_INTERVAL = 60000; // 1 minute
const TIME_SYNC_INTERVAL = 600000; // 10 minutes
const TIME_TICK_INTERVAL = 10000; // 10 seconds

const App: FC<Props> = (props: Props) => {


	const [time, setTime] = useState<moment.Moment>(moment(new Date()));
	const [departures, setDepartures] = useState<DepartureModel[]>([]);
	const [networkError, setNetworkError] = useState<boolean>(false);

	useInterval(function departureIntervalCallback(): void {
		DepartureUpdateService.getDepartures(props.stopId, (departures: DepartureModel[], error: boolean) => {
			if (error) {
				setNetworkError(true);
				setDepartures([]);
			} else {
				setNetworkError(false);
				setDepartures(departures);
			}
		});
	}, DEPARTURE_UPDATE_INTERVAL, [props.stopId]);

	useInterval(function updateTimeIntervalCallback(): void {
		TimeUpdateService.getTime((time: moment.Moment) => {
			setTime(time);
		});
	}, TIME_SYNC_INTERVAL, []);

	useInterval(function departureIntervalCallback(): void {
		const newTime: moment.Moment = time.add(TIME_TICK_INTERVAL, 'ms');
		setTime(newTime);
	}, TIME_TICK_INTERVAL, []);

	return (
		<div>
			<Departures departures={departures} networkError={networkError} />
			<Clock time={time} />
		</div>
	);
};

export default App;