import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AppContainer from './App';
import Reducers from '../reducers';

//import css
require('../css/main.scss');

//create store
let store = createStore(Reducers, applyMiddleware(thunk));

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