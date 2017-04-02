import * as React from 'react';
import { connect, Dispatch, ActionCreator } from 'react-redux';
import { Action } from 'redux';

import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';
import { ControlPanel, ControlPanelPhases } from './ControlPanel';

import { Cards, State, PlayerModel } from '../models/Models'
import {
    takeCoinsActionCreator,
    stealCoinsActionCreator,
    selectPlayerActionCreator,
    attemptActionCreator,
    actuateActionCreator,
    confirmAcceptanceActionCreator,
    Actions
} from '../actions';

import { confirmAcceptanceAndTakeTurnIfRelevant } from '../thunks';

interface AppProps {
    me: PlayerModel;
    otherPlayers: PlayerModel[];
    pendingTurn: {
        player: PlayerModel,
        action: Action
    }
    currentPlayerId: string,
    selectMode: boolean,
}

interface AppMethods {
    takeCoins: (a: PlayerModel) => (a: number) => void,
    acceptTurn: (a: PlayerModel) => () => void,
    stealCoins: (a: PlayerModel) => () => void,
    selectPlayer: (a: PlayerModel) => () => void
}

class App extends React.Component<AppProps & AppMethods, undefined> {

    render() {

        let otherPlayerView = [] as JSX.Element[];
        this.props.otherPlayers.forEach(
            (p, i) =>
                otherPlayerView.push(
                    <Player key={i} 
                    selectMode={this.props.selectMode} 
                    playerDetails={p}
                    selectPlayer={this.props.selectPlayer(p)} />)
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
                    selectPlayer={this.props.selectPlayer(this.props.me)} />)
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

let getPhaseForControlPanel : (props: AppProps) => ControlPanelPhases = (props) => {
    if(!props.pendingTurn) {
        return ControlPanelPhases.TURN_PHASE;
    }
    if(props.selectMode) {
        return ControlPanelPhases.SELECT_PLAYER_PHASE;
    }
    if(props.pendingTurn) {
        return ControlPanelPhases.CHALLENGE_PHASE;
    }
}

function mapStateToProps(state: State): AppProps {
    return {
        me: state.me,
        otherPlayers: state.otherPlayers,
        pendingTurn: state.pendingTurn,
        currentPlayerId: state.currentPlayerId,
        selectMode: state.isSelectMode,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): AppMethods {
    return {
        takeCoins: (me: PlayerModel) => (coins: number) => {
            dispatch(attemptActionCreator(takeCoinsActionCreator(coins), me, false));
        },
        acceptTurn: (me: PlayerModel) => () => {
            dispatch<any>(confirmAcceptanceAndTakeTurnIfRelevant(me));
        },
        stealCoins: (me: PlayerModel) => () => {
            dispatch(attemptActionCreator(stealCoinsActionCreator(), me, true))
        },
        selectPlayer: (selectedPlayer: PlayerModel) => () => {
            dispatch(selectPlayerActionCreator(selectedPlayer.playerId));
        }
    }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
