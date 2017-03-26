import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppContainer from './App';
import Reducers from '../reducers';

//import css
require('../css/main.scss');

//create store
let store = createStore(Reducers);

class Main extends React.Component<undefined, undefined> {
    render() {
        return (
            <Provider store={store} >
                <AppContainer />
            </Provider>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));