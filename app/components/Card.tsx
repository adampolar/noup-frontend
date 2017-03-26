import * as React from 'react';
import { Cards } from '../models/Models';

export interface CardProps {
    cardType: Cards
}

export class Card extends React.Component<CardProps, undefined> {
    render() {
        return (
            <img src={
                    require('../images/' +
                        ((this.props.cardType === null) ?
                            'Default' :
                            Cards[this.props.cardType]) + '.png')
                } />
        )
    }
}
