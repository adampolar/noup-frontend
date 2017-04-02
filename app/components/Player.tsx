import * as React from 'react';

import { Cards, PlayerModel } from '../models/Models';

import { Card } from './Card';

export interface CardProps {
    playerDetails: PlayerModel,
    selectMode: boolean
}
export interface CardMethods {
    selectPlayer: () => void
}


export class Player extends React.Component<CardProps & CardMethods, undefined>{
    render() {

        let selectPlayerIfInSelectMode = () => {
            if (this.props.selectMode) {
                this.props.selectPlayer();
            }
        }

        return (
            <div className="player" onClick={selectPlayerIfInSelectMode}>
                <div>{this.props.playerDetails.name}</div>
                <div> Coin count: {this.props.playerDetails.coins}</div>
                <Card cardType={this.props.playerDetails.cards[0]} />
                <Card cardType={this.props.playerDetails.cards[1]} />
            </div>
        )
    }
}