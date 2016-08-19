import * as React from 'react';
import { Component } from 'react';

import DepartureModel from '../api/departure';

interface DepartureProps {
    departure: DepartureModel;
}

export class Departure extends Component<DepartureProps, {}> {
    render() {

        const bubbleStyle = {
            backgroundColor: this.props.departure.routeColor,
            color: this.props.departure.routeColor
        }

        const hopperClass = `bubble ${this.props.departure.isHopper ? 'hopper' : ''}`;

        return (<section className="card departure">
            <span className={hopperClass} style={bubbleStyle}></span>
            <div className="content">
                <h1 className="headsign">{this.props.departure.headsign}</h1>
                <h2 className="boarding-point">{this.props.departure.stopLocation}</h2>
                <p className="time">
                    {this.getMins() }{this.getMinsLabel() }
                </p>
            </div>
        </section>);
    }

    getMins(): JSX.Element {
        const minsClass = `mins ${this.props.departure.isMonitored ? '' : 'scheduled'}`;
        return <span className={minsClass}>{this.props.departure.expectedTime}</span>;
    }

    getMinsLabel(): JSX.Element {
        if (this.props.departure.showMins) {
            return <span className="label">{this.props.departure.minsText}</span>;
        }
        return null;
    }

}