import { combineReducers } from 'redux';

import { configReducer } from './config';
import { entriesReducer } from './entries';
import { storiesReducer } from './stories';
import { wordsReducer } from './words';
import { uiReducer } from './ui';

// I choose to name the functions reducers instead of using ES6 property population to retain descriptive function names and illustraing their connections here.
const combinedReducers = {
	config: configReducer,
	entries: entriesReducer,
	stories: storiesReducer,
	words: wordsReducer,
	ui: uiReducer
};

export const reducer = combineReducers(combinedReducers);