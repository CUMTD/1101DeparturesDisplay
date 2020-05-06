import dayjs from 'dayjs';
import * as React from 'react';
import { Component } from 'react';

interface ClockProps {
	time: dayjs.Dayjs;
}

export class Clock extends Component<ClockProps, {}> {
	render() {
		return (<aside className="card clock">
			<p className="time">{this.props.time.format("h:mm A")}</p>
		</aside>);
	}
}