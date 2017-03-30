import { Dispatch } from 'redux';
import { PlayerModel, State } from '../models/Models';
import { 
    confirmAcceptanceActionCreator, 
    actuateActionCreator,
    endActionCreator
 } from '../actions';

const checkTurnShouldGoAhead: (state: State, me: PlayerModel) => boolean =
    (state: State, me: PlayerModel) => {
        let turnShouldGoAhead = true;

        state.otherPlayers.concat(state.otherPlayers, state.me).forEach(player => {
            turnShouldGoAhead = turnShouldGoAhead &&
                (player.acceptsCurrentTurn ||
                    player.playerId === me.playerId ||
                    player.playerId === state.pendingTurn.player.playerId);
        });
        return turnShouldGoAhead;
    }

export const confirmAcceptanceAndTakeTurnIfRelevant:
    (player: PlayerModel) =>
        (dispatch: Dispatch<any>, getState: () => State) => void =

    (player: PlayerModel) => {

        return (dispatch: Dispatch<any>, getState: () => State) => {
            let state = getState();

            if (checkTurnShouldGoAhead(state, player)) {
                dispatch(actuateActionCreator());
                if(state.pendingTurn.action.noFurtherPlayerInteraction) {
                    dispatch(endActionCreator());
                    return;
                }
            }
            dispatch(confirmAcceptanceActionCreator(player.playerId))
        }
    }