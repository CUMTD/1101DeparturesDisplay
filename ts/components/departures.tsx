import React, { FC } from 'react';
import DepartureModel from '../api/departure';
import Departure from './Departure';



interface Props {
	departures: DepartureModel[];
	networkError: boolean;
}

const Departures: FC<Props> = (props: Props) => {
	if (props.networkError || !props.departures || props.departures.length === 0) {
		const note = props.networkError ? 'Error Getting Departures' : 'No Departures';
		return (
			<aside className="note">
				<p className="note-text">{note}</p>
			</aside>
		);
	}

	return (
		<article className="departures">
			{props.departures.map((departure: DepartureModel) => <Departure key={departure.vehicleId} departure={departure} />)}
		</article>
	);
}

export default Departures;