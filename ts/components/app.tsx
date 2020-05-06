import dayjs from 'dayjs';
import React, { FC, useState } from 'react';
import DepartureModel from '../api/departure';
import { getDepartures } from '../api/departureApi';
import { getTime } from '../api/timeApi';
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


	const [time, setTime] = useState<dayjs.Dayjs>(dayjs(new Date()));
	const [departures, setDepartures] = useState<DepartureModel[]>([]);
	const [networkError, setNetworkError] = useState<boolean>(false);

	useInterval(async function departureIntervalCallback(): Promise<void> {
		try {
			const newDepartures = await getDepartures(props.stopId);
			setDepartures(newDepartures);
			setNetworkError(false);
		} catch {
			setDepartures([]);
			setNetworkError(true);
		}
	}, DEPARTURE_UPDATE_INTERVAL, [props.stopId]);

	useInterval(async function updateTimeIntervalCallback(): Promise<void> {
		try {
			const newTime = await getTime();
			setTime(newTime);
		} catch (ex) {
			console.warn('Unable to sync time', ex);
		}
	}, TIME_SYNC_INTERVAL, []);

	useInterval(function timeTickIntervalCallback(): void {
		const newTime: dayjs.Dayjs = time.add(TIME_TICK_INTERVAL, 'ms');
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