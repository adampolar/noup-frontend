import * as React from 'react';
import { Action } from 'redux';

import { Cards, PlayerModel } from '../models/Models';

import { Actions } from '../actions';

import { Card } from './Card';

export interface ControlPanelProps {
    isTurn: boolean,
    takeCoins: Function,
    pendingTurn: {
        action: Action,
        player: PlayerModel
    }
    doTurn: Function;
}


export class ControlPanel extends React.Component<ControlPanelProps, undefined>{
    render() {
        let pendingTurnText = this.props.pendingTurn ? this.props.pendingTurn.player.name + " " + Actions[this.props.pendingTurn.action.type] : "please take turn";

        return (
            <div>
                {pendingTurnText}
                <button disabled={!!this.props.pendingTurn} onClick={() => this.props.takeCoins(3)}>Take Tax</button>
                <button disabled={!!this.props.pendingTurn} onClick={() => this.props.takeCoins(2)}>Foreign Aid</button>
                <button disabled={!!this.props.pendingTurn} onClick={() => this.props.takeCoins(1)}>Normal Money</button>
                <button disabled={!this.props.pendingTurn} onClick={() => this.props.doTurn()}>Actuate turn for debug</button>
            </div>
        )
    }
}