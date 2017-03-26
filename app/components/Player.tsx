import * as React from 'react';

import { Cards, PlayerModel } from '../models/Models';

import { Card } from './Card';

export interface CardProps {
    playerDetails: PlayerModel
}


export class Player extends React.Component<CardProps, undefined>{
    render() {

        this.props.playerDetails.cards
        return (
            <div>
                <div>{this.props.playerDetails.name}</div>
                <div> Coin count: {this.props.playerDetails.coins}</div>
                <Card cardType={this.props.playerDetails.cards[0]} />
                <Card cardType={this.props.playerDetails.cards[1]} />
            </div>
        )
    }
}