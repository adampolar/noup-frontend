import * as React from 'react';
import { Action } from 'redux';

import { Cards, PlayerModel } from '../models/Models';

import { Actions } from '../actions';

import { Card } from './Card';

export interface ControlPanelProps {
    currentPlayerId: string,
    takeCoins: Function,
    stealCoins: () => void,
    acceptTurn: () => void,
    phase: ControlPanelPhases
    me: PlayerModel
}

export enum ControlPanelPhases {
    TURN_PHASE,
    CHALLENGE_PHASE,
    SELECT_PLAYER_PHASE,
    REMOVE_CARD_PHASE
}


export class ControlPanel extends React.Component<ControlPanelProps, undefined>{
    render() {
        let isMyTurn = this.props.currentPlayerId === this.props.me.playerId;
        let pendingTurnText = this.props.phase === ControlPanelPhases.CHALLENGE_PHASE ? ""
            : this.props.currentPlayerId === this.props.me.playerId ? "please take turn" : "waiting";

        let isMyTurnAndTurnPhase = isMyTurn && this.props.phase === ControlPanelPhases.TURN_PHASE;
        let isMyTurnAndChallengePhase = isMyTurn && this.props.phase === ControlPanelPhases.CHALLENGE_PHASE;
        return (
            <div>
                {this.props.me.playerId}
                {pendingTurnText}
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(3)}>Take Tax</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(2)}>Foreign Aid</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(1)}>Normal Money</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(3)}>Assassinate</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(2)}>Switch Cards</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.stealCoins()}>Steal</button>
                <button disabled={!isMyTurnAndTurnPhase} onClick={() => this.props.takeCoins(1)}>Coup</button>
                <button disabled={!isMyTurnAndChallengePhase} onClick={() => this.props.acceptTurn()}>Agree</button>
                <button disabled={!isMyTurnAndChallengePhase} onClick={() => this.props.takeCoins(1)}>Challenge</button>
                <button disabled={!isMyTurnAndChallengePhase} onClick={() => this.props.takeCoins(1)}>Block</button>
            </div>
        )
    }
}