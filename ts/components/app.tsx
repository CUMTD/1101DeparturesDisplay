import dayjs from 'dayjs';
import React, { Context, createContext, Dispatch, FC, useReducer } from 'react';
import { getDepartures } from '../api/departureApi';
import { getTime } from '../api/timeApi';
import { useInterval } from '../hooks/useInterval';
import { Action, Actions, reducer, State, StateDefaults } from '../reducer';
import Layout from './layout';

const DEPARTURE_UPDATE_INTERVAL = 60000; // 1 minute
const TIME_SYNC_INTERVAL = 600000; // 10 minutes
const TIME_TICK_INTERVAL = 10000; // 10 seconds

interface Props {
	stopId: string;
}

export interface AppContextType {
	dispatch: Dispatch<Action>;
	state: State;
}

export const AppContext: Context<AppContextType> = createContext<AppContextType>({
	dispatch: () => { },
	state: { ...StateDefaults() }
});

const App: FC<Props> = (props: Props) => {

	const [state, dispatch] = useReducer(reducer, { ...StateDefaults() });
	const context: AppContextType = { state, dispatch };

	useInterval(async function departureIntervalCallback(): Promise<void> {
		try {
			const departures = await getDepartures(props.stopId);
			dispatch({ type: Actions.UpdateDepartures, departures })
		} catch {
			dispatch({ type: Actions.SetError, error: true });
		}
	}, DEPARTURE_UPDATE_INTERVAL, [props.stopId]);

	useInterval(async function updateTimeIntervalCallback(): Promise<void> {
		try {
			const time = await getTime();
			dispatch({ type: Actions.UpdateTime, time });
		} catch (ex) {
			console.warn('Unable to sync time', ex);
		}
	}, TIME_SYNC_INTERVAL, []);

	useInterval(function timeTickIntervalCallback(): void {
		const time: dayjs.Dayjs = state.time.add(TIME_TICK_INTERVAL, 'ms');
		dispatch({ type: Actions.UpdateTime, time });
	}, TIME_TICK_INTERVAL, []);

	return (
		<AppContext.Provider value={context}>
			<Layout />
		</AppContext.Provider>
	);
};

export default App;