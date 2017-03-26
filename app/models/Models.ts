export enum Cards {
    Ambassador,
    Assassin,
    Captain,
    Contessa,
    Duke
}

export type PlayerModel = {
    name: string;
    cards: Cards[];
    coins: number;
}

export type State = {
    otherPlayers: PlayerModel[];
    me: PlayerModel;
}