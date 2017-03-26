import * as React from 'react';

import { Cards, PlayerModel } from '../models/Models';

import { Card } from './Card';

export interface ControlPanelProps {
    isTurn: Boolean,
    takeCoins: Function
}


export class ControlPanel extends React.Component<ControlPanelProps, undefined>{
    render() {

        return (
            <div>
                <button onClick={() => this.props.takeCoins(3)}>Take Tax</button>
            </div>
        )
    }
}