import { Action } from 'redux';

export enum Actions {
    TAKE_COINS
}

export const getAction : (a: Actions) => string = (action: Actions) => Actions[action];

export const takeCoins : () => Action = () => {
  return {
    type: getAction(Actions.TAKE_COINS)
  }
}