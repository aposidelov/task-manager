import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import App from './containers/App';
import rootReducer from './reducers';

export const STORE = createStore (rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

 
ReactDOM.render(
  <Provider store= {STORE}>  
    <App/>
    </Provider>, 
  document.getElementById('root')
);


registerServiceWorker();
