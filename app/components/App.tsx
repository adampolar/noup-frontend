import * as React from 'react';
import { connect, Dispatch, ActionCreator } from 'react-redux';
import { Action } from 'redux';

import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';
import { ControlPanel } from './ControlPanel';

import { Cards, State, PlayerModel } from '../models/Models'
import {
    takeCoinsActionCreator,
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
    currentPlayerId: string
}

interface AppMethods {
    takeCoins: (a: PlayerModel) => (a: number) => void,
    acceptTurn: (a: PlayerModel) => () => void
}

class App extends React.Component<AppProps & AppMethods, undefined> {

    render() {

        let otherPlayerView = [] as JSX.Element[];
        this.props.otherPlayers.forEach((p, i) => otherPlayerView.push(<Player key={i} playerDetails={p} />))

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
                    pendingTurn={this.props.pendingTurn}
                    acceptTurn={this.props.acceptTurn(this.props.me)} />
                <div id="cards">
                    <Player playerDetails={this.props.me} />
                </div>
                <ControlPanel
                    me={this.props.otherPlayers[0]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[0])}
                    pendingTurn={this.props.pendingTurn}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[0])} />
                <ControlPanel
                    me={this.props.otherPlayers[1]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[1])}
                    pendingTurn={this.props.pendingTurn}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[1])} />
                <ControlPanel
                    me={this.props.otherPlayers[2]}
                    currentPlayerId={this.props.currentPlayerId}
                    takeCoins={this.props.takeCoins(this.props.otherPlayers[2])}
                    pendingTurn={this.props.pendingTurn}
                    acceptTurn={this.props.acceptTurn(this.props.otherPlayers[2])} />
            </div>)
    }
}

function mapStateToProps(state: State): AppProps {
    return {
        me: state.me,
        otherPlayers: state.otherPlayers,
        pendingTurn: state.pendingTurn,
        currentPlayerId: state.currentPlayerId
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): AppMethods {
    return {
        takeCoins: (me: PlayerModel) => (coins: number) => {
            dispatch(attemptActionCreator(takeCoinsActionCreator(coins), me));
        },
        acceptTurn: (me: PlayerModel) => () => {
            dispatch<any>(confirmAcceptanceAndTakeTurnIfRelevant(me));
        }
    }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
