import * as React from 'react';
import { Component } from 'react';

import DepartureModel from '../api/departure';

import { Departure } from './Departure';

interface DeparturesProps {
    departures: DepartureModel[];
	networkError: boolean;
}

export class Departures extends Component<DeparturesProps, {}> {
    render() {
		if (this.props.networkError || !this.props.departures || this.props.departures.length === 0) {
			const note = this.props.networkError ? 'Error Getting Departures' : 'No Departures';
			return (<aside className="note">
				<p className="note-text">{note}</p>
			</aside>);
		} else {
			return (<article className="departures">
				{this.props.departures.map((departure: DepartureModel) => <Departure departure={departure} />) }
			</article>);
		}
	}

}