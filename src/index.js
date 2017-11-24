import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import Routes from './containers/Routes';
import rootReducer from './reducers';


const history = createHistory();
const historyMiddleware = routerMiddleware(history);

export const STORE = createStore (
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk, historyMiddleware))
);


ReactDOM.render(
    <Provider store = { STORE }>
        <ConnectedRouter history = {history}>  
           <Routes/>
        </ConnectedRouter>   
    </Provider>, 
  document.getElementById('root')
);


registerServiceWorker();
