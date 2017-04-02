import * as update from 'immutability-helper';

import { PlayerModel, State } from '../models/Models';

export const updatePlayerWithPlayerId: (s: State, perPlayerCallback: (p: PlayerModel) => PlayerModel) => State =
    (state: State, perPlayerCallback: (p: PlayerModel) => PlayerModel) => {

        state = update(state,
            {
                otherPlayers:
                {
                    $apply: (players: Array<PlayerModel>) => {
                        players.forEach(perPlayerCallback);
                        return players;
                    }
                },
                me: {
                    $apply: (player: PlayerModel) => {
                        return perPlayerCallback(player);
                    }
                }
            }
        );
        return state;


    }
