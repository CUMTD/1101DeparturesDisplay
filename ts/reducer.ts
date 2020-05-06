import dayjs from "dayjs";
import DepartureModel from './api/departure';

interface DefaultableState {
    time: dayjs.Dayjs;
    departures: DepartureModel[];
    networkError: boolean;
}

export type State = Readonly<DefaultableState>;

export enum Actions {
    UpdateDepartures,
    UpdateTime,
    SetError
}

interface BaseAction<T extends Actions> {
    type: T;
}

interface UpdateDepartures extends BaseAction<Actions.UpdateDepartures> {
    departures: DepartureModel[];
}

interface UpdateTime extends BaseAction<Actions.UpdateTime> {
    time: dayjs.Dayjs;
}

interface SetError extends BaseAction<Actions.SetError> {
    error: boolean;
}


export type Action = UpdateDepartures | UpdateTime | SetError;

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case Actions.SetError:
            return {
                ...state,
                networkError: action.error,
                departures: action.error ? [] : state.departures
            };
        case Actions.UpdateDepartures:
            return {
                ...state,
                departures: action.departures,
                networkError: false
            };
        case Actions.UpdateTime:
            return {
                ...state,
                time: action.time
            };
        default: return state;
    }
}

export const StateDefaults: () => DefaultableState = () => ({
    time: dayjs(),
    departures: [],
    networkError: false
});