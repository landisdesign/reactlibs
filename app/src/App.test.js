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

it('renders without crashing', () => {
	const div = document.createElement('div');

	const store = createStore(reducer, applyMiddleware(thunk, logger) );

	ReactDOM.render((
		<Provider store={store}>
			<Router basename="/development/madlibs">
				<App />
			</Router>
		</Provider>
	), div);

	ReactDOM.unmountComponentAtNode(div);
});
