import React, { CSSProperties, FC } from 'react';
import DepartureModel from '../api/departure';

function getMins(departure: DepartureModel): JSX.Element {
    const minsClass = `mins ${departure.isMonitored ? '' : 'scheduled'}`;
    return <span className={minsClass}>{departure.expectedTime}</span>;
}

function getMinsLabel(departure: DepartureModel): JSX.Element {
    if (departure.showMins) {
        return <span className="label">{departure.minsText}</span>;
    }
    return null;
}

interface Props {
    departure: DepartureModel;
}

const Departure: FC<Props> = (props: Props) => {

    const bubbleStyle: CSSProperties = {
        backgroundColor: props.departure.routeColor,
        color: props.departure.routeColor
    }

    const classes = ['bubble'];

    if (props.departure.isHopper) {
        classes.push('hopper');
    }

    return (
        <section className="card departure">
            <span className={classes.join(' ')} style={bubbleStyle}></span>
            <div className="content">
                <h1 className="headsign">{props.departure.headsign}</h1>
                <h2 className="boarding-point">{props.departure.stopLocation}</h2>
                <p className="time">
                    {getMins(props.departure)}{getMinsLabel(props.departure)}
                </p>
            </div>
        </section>
    );
}

export default Departure;