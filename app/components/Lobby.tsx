import * as React from 'react';

import { PlayerModel } from '../models/Models';

export interface LobbyProps {
    otherPlayers: PlayerModel[]
}

export class Lobby extends React.Component<LobbyProps, undefined> {
    render() {

        let players: JSX.Element[];

        this.props.otherPlayers.forEach(function (player, i) {
            players.push(<div> {player.name}</div>);
        });

        return (
            <div>
                {players}
            </div>
        )
    }
}
