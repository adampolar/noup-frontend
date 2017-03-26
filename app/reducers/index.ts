import { Action } from 'redux';

import * as update from 'immutability-helper';

import { State, Cards } from '../models/Models';

let defaultStateCreator = () => {
    return {
        otherPlayers: [{
            name: "treebeard",
            cards: [null, null],
            coins: 1
        },
        {
            name: "Gandalf",
            cards: [null, Cards.Ambassador],
            coins: 3
        },
        {
            name: "Saruman",
            cards: [Cards.Captain, Cards.Captain],
            coins: 2
        }],
        me: {
            name: "Adam",
            cards: [Cards.Assassin, Cards.Duke],
            coins: 7
        }

    };
}

let initialDefaultState = defaultStateCreator();

//no reducers currently
export default (state: State = initialDefaultState, action: Action) => {
    if (action.type === 'TAKE_COINS') {
        state = update(
            state,
            {
                me:
                {
                    coins:
                    {
                        $set: state.me.coins + 1
                    }
                }
            });
    }
    return state;
};