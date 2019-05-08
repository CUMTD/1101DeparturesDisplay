import * as moment from 'moment';
import * as React from 'react';
import { Component } from 'react';
import DepartureModel from '../api/departure';
import DepartureUpdateService from '../api/departureUpdateService';
import TimeUpdateService from '../api/timeUpdateService';
import { Clock } from './clock';
import { Departures } from './departures';


interface AppProps {
	stopId: string;
}

interface AppState {
	time: any;
	departures: DepartureModel[];
	networkError: boolean;
}

export class App extends Component<AppProps, AppState> {

	private static DEPARTURE_UPDATE_INTERVAL = 60000; // 1 minute
	private static TIME_SYNC_INTERVAL = 600000; // 10 minutes
	private static TIME_TICK_INTERVAL = 10000; // 10 seconds


	constructor(props: AppProps, context: any) {
		super(props, context);

		this.state = {
			time: moment(new Date()),
			departures: new Array<DepartureModel>(),
			networkError: false
		};
	}

	componentDidMount() {
		window.setInterval(this.updateDepartures, App.DEPARTURE_UPDATE_INTERVAL); // one minute
		this.updateDepartures();
		window.setInterval(this.updateTime, App.TIME_SYNC_INTERVAL); // 10 minutes
		this.updateTime();
		window.setInterval(this.tickTime, App.TIME_TICK_INTERVAL); // 10 seconds
	}

	render() {
		return (<div>
			<Departures departures={this.state.departures} networkError={false} />
			<Clock time={this.state.time} />
		</div>);
	}

	private updateDepartures = () => {
		DepartureUpdateService.getDepartures(this.props.stopId, this.updateDeparturesState);
	};

	private updateDeparturesState = (departures: DepartureModel[], error: boolean) =>
		this.setState({ ...this.state, departures, networkError: error });

	private updateTime = () => {
		TimeUpdateService.getTime(this.updateTimeState);
	};

	private updateTimeState = (time: moment.Moment) =>
		this.setState({ ...this.state, time });

	private tickTime = () => {
		const time: moment.Moment = this.state.time.add(App.TIME_TICK_INTERVAL, 'ms');
		this.setState({ ...this.state, time });
	};

}