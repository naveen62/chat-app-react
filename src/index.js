import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import getStore from './store/store'
import * as serviceWorker from './serviceWorker';
import '../node_modules/bulma/css/bulma.min.css';
import './styles/index.css';

const store = getStore();

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
