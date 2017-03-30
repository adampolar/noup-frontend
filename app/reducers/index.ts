import { Action } from 'redux';

import * as update from 'immutability-helper';

import { State, Cards, PlayerModel } from '../models/Models';
import { Actions, TakeCoinsAction, ConfirmAcceptanceAction, AttemptActionAction } from '../actions';

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

let reducers = [
    {
        type: Actions.TAKE_COINS,
        impl: (state: State, action: TakeCoinsAction) =>
            update(
                state,
                {
                    me:
                    {
                        coins:
                        {
                            $set: state.me.coins + (action).amount
                        }
                    }
                })
    }
] as Array<{
    type: Actions,
    impl: (state: State, action: Action) => State;
}>;

const confirmAcceptance = (state: State, action: ConfirmAcceptanceAction) => {
    state = update(state,
        {
            otherPlayers:
            {
                $apply: (player: PlayerModel) => {
                    if (player.playerId === action.playerId) {
                        player.acceptsCurrentTurn = true;
                    }
                    return player;
                }
            }
        }

    )
}

export const getNextPlayer = (state: State) => {
    //there is no find method :(
        let playerIndex = -1;
        let nextTurn = state.otherPlayers.forEach((player, index) => {
            if(player.playerId === state.currentPlayerId) {
                playerIndex = index;
            }
        })

        return playerIndex === -1 ? 
                state.otherPlayers[0].playerId  :
                playerIndex === state.otherPlayers.length - 1 ?
                    state.me.playerId : state.otherPlayers[playerIndex + 1];
}

export default (state: State = initialDefaultState, action: Action) => {

    if (action.type === Actions.END_ACTION) {


        let nextPlayerId = getNextPlayer(state);

        state = update(state, {
            otherPlayers:
            {
                $apply: (player: PlayerModel) => {
                    player.acceptsCurrentTurn = false;
                    return player;
                }
            },
            pendingTurn: { $set: null },
            currentPlayerId: { $set: nextPlayerId }
        });

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
            }
        });
    } else if (action.type === Actions.CONFIRM_ACCEPTANCE) {
        return confirmAcceptance(state, <ConfirmAcceptanceAction>action);
    }

    return state;
};