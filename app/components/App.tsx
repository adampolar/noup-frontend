import * as React from 'react';
import { connect, Dispatch, ActionCreator } from 'react-redux';

import {Lobby } from './Lobby';
import { GameTable, GameTableMethods, GameTableProps } from './GameTable'

import { Cards, State, PlayerModel } from '../models/Models'
import {
    takeCoinsActionCreator,
    stealCoinsActionCreator,
    selectPlayerActionCreator,
    selectCardActionCreator,
    attemptActionCreator,
    actuateActionCreator,
    confirmAcceptanceActionCreator,
    Actions
} from '../actions';

import {
    confirmAcceptanceAndTakeTurnIfRelevant,
    setNameRemoteAction
} from '../thunks';

interface AppProps {
    gameTableProps: GameTableProps
}

interface AppMethods {
    setName: (name: string) => void,
    gameTableMethods: GameTableMethods;
}


class App extends React.Component<AppProps & AppMethods, undefined> {

    nameInput: HTMLInputElement;

    render() {

        return this.props.gameTableProps.otherPlayers.length === 3 ? (
            <GameTable
                {
                ...this.props.gameTableMethods
                }
                {
                ...this.props.gameTableProps
                }
            />
        ) : this.props.gameTableProps.me.name ?
                (
                    <Lobby otherPlayers={this.props.gameTableProps.otherPlayers}></Lobby>
                ) : (
                    <div>
                        <input type="text" ref={(_) => this.nameInput = _} />
                        <button onClick={() => {
                            this.props.setName(this.nameInput.value);
                        }}>Enter Lobby</button>
                    </div>
                )
    }
}

function mapStateToProps(state: State): AppProps {
    return {
        gameTableProps: {
            me: state.me,
            otherPlayers: state.otherPlayers,
            pendingTurn: state.pendingTurn,
            currentPlayerId: state.currentPlayerId,
            selectMode: state.isSelectMode,
        }
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>): AppMethods {
    return {
        setName: (name: string) => {
            dispatch(setNameRemoteAction(name));
        },
        gameTableMethods: {
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
            },
            selectCard: (card: Cards) => {
                dispatch(selectCardActionCreator(card));
            }
        }
    }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
