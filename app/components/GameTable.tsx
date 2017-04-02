import * as React from 'react';

import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';
import { ControlPanel, ControlPanelPhases } from './ControlPanel';

import { Cards, PlayerModel } from '../models/Models'
import { PlayerAction } from '../actions';

export interface GameTableProps {
    me: PlayerModel;
    otherPlayers: PlayerModel[];
    pendingTurn: {
        player: PlayerModel,
        action: PlayerAction
    }
    currentPlayerId: string,
    selectMode: boolean,
}

export interface GameTableMethods {
    takeCoins: (a: PlayerModel) => (a: number) => void,
    acceptTurn: (a: PlayerModel) => () => void,
    stealCoins: (a: PlayerModel) => () => void,
    selectPlayer: (a: PlayerModel) => () => void,
    selectCard: (a: Cards) => void
}

export class GameTable extends React.Component<GameTableProps & GameTableMethods, undefined> {

    render() {

        let otherPlayerView = [] as JSX.Element[];
        this.props.otherPlayers.forEach(
            (p, i) =>
                otherPlayerView.push(
                    <Player key={i}
                        selectMode={this.props.selectMode}
                        playerDetails={p}
                        selectPlayer={this.props.selectPlayer(p)}
                        selectCard={this.props.selectCard} />)
        );

        return (
            <div>
                <div id="other-players">
                    {otherPlayerView}
                </div>
                <Deck></Deck>
                <ControlPanel
                    me={this.props.me}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.me)}
                    stealCoins={this.props.stealCoins(this.props.me)}
                    phase={getPhaseForControlPanel(this.props)}
                    acceptTurn={this.props.acceptTurn(this.props.me)} />
                <div id="cards">
                    <Player
                        selectMode={this.props.selectMode}
                        playerDetails={this.props.me}
                        selectPlayer={this.props.selectPlayer(this.props.me)}
                        selectCard={this.props.selectCard} />)
                </div>
                <ControlPanel
                    me={this.props.otherPlayers[0]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[0])}
                    stealCoins={this.props.stealCoins(this.props.otherPlayers[0])}
                    phase={getPhaseForControlPanel(this.props)}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[0])} />
                <ControlPanel
                    me={this.props.otherPlayers[1]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[1])}
                    stealCoins={this.props.stealCoins(this.props.otherPlayers[1])}
                    phase={getPhaseForControlPanel(this.props)}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[1])} />
                <ControlPanel
                    me={this.props.otherPlayers[2]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[2])}
                    stealCoins={this.props.stealCoins(this.props.otherPlayers[2])}
                    phase={getPhaseForControlPanel(this.props)}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[2])} />
            </div>)
    }
}

let getPhaseForControlPanel: (props: GameTableProps) => ControlPanelPhases = (props) => {
    if (!props.pendingTurn) {
        return ControlPanelPhases.TURN_PHASE;
    }
    if (props.selectMode) {
        return ControlPanelPhases.SELECT_PLAYER_PHASE;
    }
    if (props.pendingTurn) {
        return ControlPanelPhases.CHALLENGE_PHASE;
    }
    if (props.pendingTurn.action && !props.pendingTurn.action.requiresAcceptance) {
        return ControlPanelPhases.REMOVE_CARD_PHASE;
    }
}