import { Action } from 'redux';

import * as update from 'immutability-helper';

import reducers from '../reducers/GameMoveReducers';
import { State, Cards, PlayerModel } from '../models/Models';
import { updatePlayerWithPlayerId } from '../models/ModelUtils';
import {
    Actions,
    TakeCoinsAction,
    AttemptActionAction,
    ConfirmAcceptanceAction,
    SelectPlayerAction
} from '../actions';

let defaultStateCreator = () => {
    return {
        otherPlayers: [{
            playerId: "treebeard",
            name: "treebeard",
            cards: [null, null],
            coins: 1
        },
        {
            playerId: "Gandalf",
            name: "Gandalf",
            cards: [null, Cards.Ambassador],
            coins: 3
        },
        {
            playerId: "Saruman",
            name: "Saruman",
            cards: [Cards.Captain, Cards.Captain],
            coins: 2
        }],
        me: {
            playerId: "Adam",
            name: "Adam",
            cards: [Cards.Assassin, Cards.Duke],
            coins: 7
        },
        pendingTurn: null,
        currentPlayerId: "Adam"
    } as State;
}

let initialDefaultState = defaultStateCreator();


const confirmAcceptance = (state: State, action: ConfirmAcceptanceAction) => {
    updatePlayerWithPlayerId(state, player => {
        if (player.playerId === action.playerId) {
            player.acceptsCurrentTurn = true;
        }
        return player;
    });
    state = update(state,
        {
            currentPlayerId: { $set: getNextPlayer(state, state.currentPlayerId) }
        }
    );
    return state;
}

export const getNextPlayer = (state: State, playerId: string) => {
    //there is no find method :(
    let playerIndex = -1;
    let nextTurn = state.otherPlayers.forEach((player, index) => {
        if (player.playerId === playerId) {
            playerIndex = index;
        }
    })

    return playerIndex === -1 ?
        state.otherPlayers[0].playerId :
        playerIndex === state.otherPlayers.length - 1 ?
            state.me.playerId : state.otherPlayers[playerIndex + 1].playerId;
}

export default (state: State = initialDefaultState, action: Action) => {

    if (action.type === Actions.SELECT_PLAYER_ACTION) {
        state = update(state, {
            pendingTurn: {
                action: {
                    againstPlayerId: { $set: (<SelectPlayerAction>action).selectedPlayerId }
                }
            },
            isSelectMode: {
                $set: false
            },
            currentPlayerId: {
                $set: getNextPlayer(state, state.currentPlayerId)
            }

        });
        return state;
    }

    if (action.type === Actions.END_ACTION) {

        let nextPlayerId = getNextPlayer(state, state.pendingTurn.player.playerId);

        state = update(state, {
            otherPlayers:
            {
                $apply: (players: Array<PlayerModel>) => {
                    players.forEach(player => {
                        player.acceptsCurrentTurn = false;
                    });
                    return players;
                }
            },
            me: {
                acceptsCurrentTurn: { $set: false }
            },
            pendingTurn: { $set: null },
            currentPlayerId: { $set: nextPlayerId }
        });

        return state;

    }

    if (action.type === Actions.ACTUATE_ACTION) {
        var state = reducers.filter(
            reducer => reducer.type === state.pendingTurn.action.type
        )[0].impl(state, state.pendingTurn.action);

        return state;

    } else if (action.type === Actions.ATTEMPT_ACTION) {
        return update(state, {
            pendingTurn: {
                $set: {
                    action: (<AttemptActionAction>action).action,
                    player: (<AttemptActionAction>action).player
                }
            },
            isSelectMode: {
                $set: (<AttemptActionAction>action).isAntagonistic
            },
            currentPlayerId: {
                $set:
                (<AttemptActionAction>action).isAntagonistic ?
                    state.currentPlayerId :
                    getNextPlayer(state, (<AttemptActionAction>action).player.playerId)
            }
        });
    } else if (action.type === Actions.CONFIRM_ACCEPTANCE) {
        return confirmAcceptance(state, <ConfirmAcceptanceAction>action);
    }

    return state;
};