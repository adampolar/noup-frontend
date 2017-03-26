import * as React from 'react';
import { connect, Dispatch, ActionCreator } from 'react-redux';

import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';
import { ControlPanel } from './ControlPanel';

import { Cards, State, PlayerModel } from '../models/Models'
import { takeCoins } from '../actions';

interface AppProps {
    me: PlayerModel;
    otherPlayers: PlayerModel[];
    takeCoins: ()=>void
}

class App extends React.Component<AppProps, undefined> {

    render() {

        let otherPlayerView = [] as JSX.Element[];
        this.props.otherPlayers.forEach((p, i) => otherPlayerView.push(<Player key={i} playerDetails={p} />))

        return (
            <div>
                <div id="other-players">
                    {otherPlayerView}
                </div>
                <Deck></Deck>
                <ControlPanel isTurn={true} takeCoins={this.props.takeCoins} />
                <div id="cards">
                    <Player playerDetails={this.props.me} />
                </div>
            </div>)
    }
}

function mapStateToProps(state: State) {
    return {
        me: state.me,
        otherPlayers: state.otherPlayers,
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        takeCoins: function () {
            dispatch(takeCoins());
        }
    }
}

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
