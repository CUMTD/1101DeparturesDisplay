import React, { FC, useContext } from 'react';
import { AppContext } from './app';

const Clock: FC = () => {
	const context = useContext(AppContext);

	return (
		<aside className="card clock">
			<p className="time">{context.state.time.format("h:mm A")}</p>
		</aside>
	)
}

export default Clock;