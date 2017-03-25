import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';

require('../css/main.scss');

class Main extends React.Component<undefined, undefined> {
    render() {
        return (
            <App />
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));