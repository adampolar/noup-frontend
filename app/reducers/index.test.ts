import { getNextPlayer } from './index';

import { State, Cards, PlayerModel } from '../models/Models';

import { expect } from 'chai';
import 'mocha';

let createStateWithCurrentPlayer = (playerId: string) => {
    return {
        otherPlayers: [{
            playerId: "treebeard",
            name: "treebeard",
            cards: [null, null],
            coins: 1
        },
        {
            playerId: "Gandalf",
            name: "Gandalf",
            cards: [null, Cards.Ambassador],
            coins: 3
        },
        {
            playerId: "Saruman",
            name: "Saruman",
            cards: [Cards.Captain, Cards.Captain],
            coins: 2
        }],
        me: {
            playerId: "Adam",
            name: "Adam",
            cards: [Cards.Assassin, Cards.Duke],
            coins: 7
        },
        pendingTurn: null,
        currentPlayerId: playerId
    } as State;
}




describe('GetNextPlayer', () => {
  it('should return next player', () => {
    const result = getNextPlayer(createStateWithCurrentPlayer('Adam'));
    expect(result).to.equal('treebeard');
  });
  it('should return next player', () => {
    const result = getNextPlayer(createStateWithCurrentPlayer('treebeard'));
    expect(result).to.equal('Gandalf');
  });
  it('should return next player', () => {
    const result = getNextPlayer(createStateWithCurrentPlayer('Gandalf'));
    expect(result).to.equal('Saruman');
  });
  it('should return next player', () => {
    const result = getNextPlayer(createStateWithCurrentPlayer('Saruman'));
    expect(result).to.equal('Adam');
  });
});