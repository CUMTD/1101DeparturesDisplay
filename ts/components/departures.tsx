import React, { FC, useContext } from 'react';
import DepartureModel from '../api/departure';
import { AppContext } from './app';
import Departure from './Departure';

const Departures: FC = () => {
	const context = useContext(AppContext);
	if (context.state.networkError || !context.state.departures || context.state.departures.length === 0) {
		const note = context.state.networkError ? 'Error Getting Departures' : 'No Departures';
		return (
			<aside className="note">
				<p className="note-text">{note}</p>
			</aside>
		);
	}

	return (
		<article className="departures">
			{context.state.departures.map((departure: DepartureModel) => <Departure key={departure.vehicleId} departure={departure} />)}
		</article>
	);
}

export default Departures;