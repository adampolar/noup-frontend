import * as React from 'react';
import { Cards } from '../models/Models';

export interface CardProps {
    cardType: Cards
}

export interface CardMethods {
    onClick: (card: Cards) => void
}

export class Card extends React.Component<CardProps & CardMethods, undefined> {
    render() {
        return (
            <img onClick={() => this.props.onClick(this.props.cardType)} src={
                require('../images/' +
                    ((!this.props.cardType) ?
                        'Default' :
                        Cards[this.props.cardType]) + '.png')
            } />
        )
    }
}
