import { Action } from 'redux';

import { PlayerModel, Cards } from '../models/Models';

export enum Actions {
    TAKE_COINS,
    STEAL_COINS,
    COUP,
    SELECT_PLAYER_ACTION,
    SELECT_CARD_ACTION,
    ATTEMPT_ACTION,
    CONFIRM_ACCEPTANCE,
    ACTUATE_ACTION,
    END_ACTION,
    SET_NAME_ACTION
}

export class PlayerAction implements Action {
    noFurtherPlayerInteraction: boolean
    type: any;
    againstPlayerId: string;
    requiresAcceptance: boolean;
}

export class TakeCoinsAction extends PlayerAction {
    amount: number;
}

export const takeCoinsActionCreator: (coins: number) => TakeCoinsAction = (coins) => {
    return {
        type: Actions.TAKE_COINS,
        amount: coins,
        noFurtherPlayerInteraction: true,
        againstPlayerId: null,
        requiresAcceptance: true
    }
}

export const stealCoinsActionCreator: () => PlayerAction = () => {
    return {
        type: Actions.STEAL_COINS,
        noFurtherPlayerInteraction: true,
        againstPlayerId: null,
        requiresAcceptance: true
    }
}

export const coupActionCreator: () => PlayerAction = () => {
    return {type: Actions.COUP,
        noFurtherPlayerInteraction: true,
        againstPlayerId: null,
        requiresAcceptance: false
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

export class SelectCardAction implements Action {
    type = Actions.SELECT_CARD_ACTION;
    card: Cards;
}

export const selectCardActionCreator: (card: Cards) => SelectCardAction = (card) => {
    return {
        card: card,
        type: Actions.SELECT_CARD_ACTION
    } as SelectCardAction;
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

export class SetNameAction implements Action {
    type: Actions;
    name: string;
}  

export const setNameActionCreator: (name: string) => SetNameAction = (name) => {
    return {
        type: Actions.SET_NAME_ACTION,
        name: name
    }
}

