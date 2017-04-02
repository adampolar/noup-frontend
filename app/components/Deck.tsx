import * as React from 'react';

import { Card } from './Card';

export class Deck extends React.Component<undefined, undefined> {
    render() {
        return (
            <div id="deck">
                <Card onClick={() => null } cardType={null} />
            </div>
        )
    }
}