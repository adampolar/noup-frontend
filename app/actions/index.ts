import { Action } from 'redux';

import { PlayerModel } from '../models/Models';

export enum Actions {
    TAKE_COINS,
    STEAL_COINS,
    SELECT_PLAYER_ACTION,
    ATTEMPT_ACTION,
    CONFIRM_ACCEPTANCE,
    ACTUATE_ACTION,
    END_ACTION
}

export interface PlayerAction extends Action {
    noFurtherPlayerInteraction: boolean
}

export class AntagonisticPlayerAction implements PlayerAction {
    noFurtherPlayerInteraction: boolean;
    type: any;
    againstPlayerId: string
}

export class TakeCoinsAction implements PlayerAction {
    type: any;
    amount: number;
    noFurtherPlayerInteraction: boolean;
}

export const takeCoinsActionCreator: (coins: number) => TakeCoinsAction = (coins) => {
    return {
        type: Actions.TAKE_COINS,
        amount: coins,
        noFurtherPlayerInteraction: true
    }
}

export const stealCoinsActionCreator: () => AntagonisticPlayerAction = () => {
    return {
        type: Actions.STEAL_COINS,
        noFurtherPlayerInteraction: true,
        againstPlayerId: null
    }
}

export class SelectPlayerAction implements Action {
    type = Actions.SELECT_PLAYER_ACTION;
    selectedPlayerId: string;
}

export const selectPlayerActionCreator: (playerId: string) => SelectPlayerAction = (playerId) => {
    return {
        selectedPlayerId: playerId,
        type: Actions.SELECT_PLAYER_ACTION
    } as SelectPlayerAction;
}

export class ConfirmAcceptanceAction implements Action {
    type: any;
    playerId: string;
}

export const confirmAcceptanceActionCreator: (playerId: string) => ConfirmAcceptanceAction =
    (playerId) => {
        return {
            type: Actions.CONFIRM_ACCEPTANCE,
            playerId: playerId
        }
    }

export class AttemptActionAction implements Action {
    type: any;
    action: Action;
    player: PlayerModel;
    isAntagonistic: boolean;
}

export const attemptActionCreator: (action: Action, player: PlayerModel, isAntagonistic: boolean) => AttemptActionAction =
    (action, player, isAntagonistic) => {
        return {
            type: Actions.ATTEMPT_ACTION,
            action: action,
            player: player,
            isAntagonistic: isAntagonistic,
        }
    }

export const actuateActionCreator: () => Action =
    () => {
        return {
            type: Actions.ACTUATE_ACTION
        }
    }

export const endActionCreator: () => Action =
    () => {
        return {
            type: Actions.END_ACTION
        }
    }

