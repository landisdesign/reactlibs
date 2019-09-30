import { combineReducers } from 'redux';

import { configReducer } from './config';
import { storiesReducer } from './stories';
import { wordsReducer } from './words';
import { uiReducer } from './ui';

const combinedReducers = {
	config: configReducer,
	stories: storiesReducer,
	words: wordsReducer,
	ui: uiReducer
};

export const reducer = combineReducers(combinedReducers);