import * as React from 'react';
import { Action } from 'redux';

import { Cards, PlayerModel } from '../models/Models';

import { Actions } from '../actions';

import { Card } from './Card';

export interface ControlPanelProps {
    currentPlayerId: string,
    takeCoins: Function,
    acceptTurn: () => void,
    pendingTurn: {
        action: Action,
        player: PlayerModel
    }
    me: PlayerModel
}


export class ControlPanel extends React.Component<ControlPanelProps, undefined>{
    render() {
        let isMyTurn = this.props.currentPlayerId === this.props.me.playerId;
        let pendingTurnText = this.props.pendingTurn ? 
            this.props.pendingTurn.player.name + " " + Actions[this.props.pendingTurn.action.type] 
            : this.props.currentPlayerId === this.props.me.playerId ? "please take turn" : "waiting";

        return (
            <div>
                {pendingTurnText}
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(3)}>Take Tax</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(2)}>Foreign Aid</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(1)}>Normal Money</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(3)}>Assassinate</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(2)}>Switch Cards</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(1)}>Steal</button>
                <button disabled={ !isMyTurn || !!this.props.pendingTurn } onClick={() => this.props.takeCoins(1)}>Coup</button>
                <button disabled={ !isMyTurn || !this.props.pendingTurn } onClick={() => this.props.acceptTurn()}>Agree</button>
                <button disabled={ !isMyTurn || !this.props.pendingTurn } onClick={() => this.props.takeCoins(1)}>Challenge</button>
                <button disabled={ !isMyTurn || !this.props.pendingTurn } onClick={() => this.props.takeCoins(1)}>Block</button>
            </div>
        )
    }
}