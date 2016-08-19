import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment'

interface ClockProps {
	time: moment.Moment;
}

export class Clock extends Component<ClockProps, {}> {
	render() {
		return (<aside className="card clock">
			<p className="time">{this.props.time.format("h:mm A")}</p>
		</aside>);
	}
}