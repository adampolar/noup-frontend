import * as React from 'react';

import { Cards } from './App';

import { Card } from './Card';

export interface CardProps {
    playerDetails: {
        name: string,
        cardsVisible: Cards[]
    }
}


export class Player extends React.Component<CardProps, undefined>{
    render() {

        this.props.playerDetails.cardsVisible
        return (
            <div>
                <div>{this.props.playerDetails.name}</div>
                <Card cardType={this.props.playerDetails.cardsVisible[0]}/>
                <Card cardType={this.props.playerDetails.cardsVisible[1]}/>
            </div>
        )
    }
}