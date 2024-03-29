import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import { reducer } from './reducers';

import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk, logger) );

ReactDOM.render((
	<Provider store={store}>
		<Router basename='/development/madlibs'>
			<App />
		</Router>
	</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
