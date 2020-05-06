import React, { FC } from 'react';
import Clock from './clock';
import Departures from './departures';

const Layout: FC = () => (
    <div>
        <Departures />
        <Clock />
    </div>
);

export default Layout;