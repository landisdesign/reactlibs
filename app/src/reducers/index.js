import combineReducers from 'redux';

import { configReducer } from './config';

function chainReducers(...reducers) {
	return (state, action) =>  reducers.reduce(reducer => reducer(state, action), state);
}

export const reducer = configReducer;