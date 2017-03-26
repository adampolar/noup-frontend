import { Action } from 'redux';

export enum Actions {
    TAKE_COINS
}

export class TakeCoinsAction implements Action {
    type: any;
    amount: number;

}

export const getAction : (a: Actions) => string = (action: Actions) => Actions[action];

export const takeCoins : (coins: number) => TakeCoinsAction = (coins) => {
  return {
    type: getAction(Actions.TAKE_COINS),
    amount: coins
  }
}