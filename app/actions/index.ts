import { Action } from 'redux';

export const takeCoins : () => Action = () => {
  return {
    type: 'TAKE_COINS'
  }
}