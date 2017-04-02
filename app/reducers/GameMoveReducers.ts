import {Action } from 'redux';

import { State } from '../models/Models';
import { updatePlayerWithPlayerId } from '../models/ModelUtils';
import { 
    Actions, 
    TakeCoinsAction,
    AntagonisticPlayerAction
} from '../actions';

export default [
    {
        type: Actions.TAKE_COINS,
        impl: (state: State, action: TakeCoinsAction) => {
            return updatePlayerWithPlayerId(state, player => {
                if (state.pendingTurn.player.playerId === player.playerId) {
                    player.coins += action.amount;
                }
                return player;
            });
        }
    },
    {
        type: Actions.STEAL_COINS,
        impl: (state: State, action: AntagonisticPlayerAction) => {
            return updatePlayerWithPlayerId(state, player => {
                if (action.againstPlayerId === player.playerId) {
                    player.coins -= 2;
                } else if (player.playerId === state.pendingTurn.player.playerId) {
                    player.coins += 2;
                }
                return player;
            });
        }
    },
] as Array<{
    type: Actions,
    impl: (state: State, action: Action) => State;
}>;