import { Action } from 'redux';

export enum Cards {
    Ambassador,
    Assassin,
    Captain,
    Contessa,
    Duke
}

export type PlayerModel = {
    playerId: string;
    name: string;
    cards: Cards[];
    coins: number;
    acceptsCurrentTurn: boolean;
}

export type State = {
    otherPlayers: PlayerModel[];
    me: PlayerModel;
    pendingTurn: {
        player: PlayerModel;
        action: Action;
    };
    currentPlayerId: string;
}