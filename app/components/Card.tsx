import * as React from 'react';
import { Cards } from './App';

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
