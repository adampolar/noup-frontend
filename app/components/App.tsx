import * as React from 'react';

import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';

export enum Cards {
    Ambassador,
    Assassin,
    Captain,
    Contessa,
    Duke
}

export class App extends React.Component<undefined, undefined> {

    render() {

        let CARDS = [
            Cards.Assassin,
            Cards.Duke
        ]

        let OTHER_PLAYERS = [
            {
                name: "treebeard",
                cardsVisible: [null, null]
            },
            {
                name: "Gandalf",
                cardsVisible: [null, Cards.Ambassador]
            },
            {
                name: "Saruman",
                cardsVisible: [Cards.Captain, Cards.Contessa]
            }
        ]

        let cardView = [] as JSX.Element[];
        CARDS.forEach((c, i) => cardView.push(<Card cardType={c} key={i} />), this);

        let otherPlayerView = [] as JSX.Element[];
        OTHER_PLAYERS.forEach((p, i) => otherPlayerView.push(<Player key={i} playerDetails={p} />))

        return (
            <div>
                <div id="other-players">
                    {otherPlayerView}
                </div>
                <Deck></Deck>
                <div id="cards">
                    {cardView}
                </div>
            </div>)
    }
}
