/*
 *	NOTE: configReducer cannot be included in a call to combineReducers(),
 *	because reconcileConfig() spreads the configuration across the entire
 *	state object, not just the config slice. Therefore the state object
 *	sent to configReducer is the entire state object, not just the config
 *	portion.
 */

import 'whatwg-fetch';

import { sleep } from '../common/common';
import { initEntries } from './entries';

const reducerPrefix = "CONFIG_";
const INIT_CONFIG = reducerPrefix + "INIT_CONFIG";
const LOAD_STORIES = reducerPrefix + "LOAD_STORIES";
const LOAD_WORD_LIST = reducerPrefix + "LOAD_WORD_LIST";
const RECONCILE_CONFIG = reducerPrefix + "RECONCILE_CONFIG";
const START_APPLICATION = reducerPrefix + "START_APPLICATION";

/*
 *	Synchronous actions. All of them are called internally by the thunks, to
 *	update the UI as fetchConfig manages the config retrieval and creation,
 *	and to update the state to reflect the UI's splash page completion.
 */

function initConfig(config) {
	return {
		type: INIT_CONFIG,
		config
	};
}

function loadStories(storyData) {
	return {
		type: LOAD_STORIES,
		storyData
	};
}

function loadWordList(wordList, index) {
	return {
		type: LOAD_WORD_LIST,
		wordList,
		index
	};
}

function reconcileConfig() {
	return {
		type: RECONCILE_CONFIG
	};
}

function startApplication() {
	return {
		type: START_APPLICATION
	};
}

/*
 *	Asynchronous actions. These are the only actions available outside the module.
 */

/**
 *	Load the config file, then load the word and story files identified by the
 *	config. fetchConfig dispatches the above synchronous actions to update the
 *	progress UI and inform the UI when everything has loaded. The start and
 *	minDelay fields dictate how long the startup process should take for the
 *	splash screen to be presented.
 */
function fetchConfig( {url: configUrl, minDelay} ) {

	const requestOptions = {
		headers: new Headers({
			"Accept": "application/json, text/plain"
		}),
		mode: "same-origin"
	};

	function checkStatus(response) {
		if (response.ok) {
			return response;
		}
		else {
			const error = new Error(response.text);
			error.response = response;
			throw error;
		}
	}

	function fetchWords(wordDataUrl, index, dispatch) {
		return fetch(wordDataUrl, requestOptions).then(async response => {
			checkStatus(response);
			const wordData = await response.json();
			dispatch(loadWordList(wordData, index));
		});
	}

	function fetchStories(storyListUrl, dispatch) {
		return fetch(storyListUrl, requestOptions).then(async response => {
			checkStatus(response);
			const storyData = await response.json();
			dispatch(loadStories(storyData));
			dispatch(initEntries(storyData));
		});
	}

	return async function(dispatch) {
		try {
			const activationTime = minDelay + Date.now();
			const response = await fetch(configUrl, requestOptions);
			checkStatus(response);
			const config = await response.json();
			dispatch(initConfig(config));

			const fetches = config.wordSources.map((url, index) => fetchWords(url, index, dispatch));
			fetches.push(fetchStories(config.storySource, dispatch));

			Promise.all(fetches).then(async () => {
				const now = Date.now();
				if (now < activationTime) {
					await sleep(activationTime - now);
				}
				dispatch(reconcileConfig());
			});
		}
		catch (e) {
			console.error(e);
			if (e.response) {
				console.error(e.response.url);
				console.error(e.response.body);
			}
		}
	};
}

/**
 *	Signal that the UI has completed the landing page presentation.
 */
function acknowledgeConfigCompletion(delay = 0) {
	return async function(dispatch) {
		await sleep(delay);
		dispatch(startApplication());
	}
}


/**
 *	The initial state structure handled by config.js
 */
const initialConfig = {
	loading: false,
	loaded: false,
	wordSources: [],
	storySource: {
		loaded: false
	}
};

/**
 * Reducer
 *
 * Reminder: This retrieves and returns the entire state, not just a "config" slice.
 */
function configReducer(config = initialConfig, action) {

	function cloneConfig(config) {

		function cloneWordList(wordList) {
			const newList = {...wordList};
			if ("words" in wordList) {
				newList.words = [...wordList.words];
			}
			return newList;
		}

		return {
			...config,
			wordSources: config.wordSources.map(cloneWordList),
			storySource: {...config.storySource}
		};
	}

	switch (action.type) {
		case INIT_CONFIG:
			const {activationTime, wordSources, storySource} = action.config;
			return {
				loading: true,
				loaded: false,
				activationTime,
				wordSources: wordSources.map(url => ({url, loaded: false}) ),
				storySource: {url: storySource, loaded: false}
			};
		case LOAD_WORD_LIST:
			const {index, wordList} = action;
			return cloneConfig({
				...config,
				wordSources: config.wordSources.map( (source, i) => {
					return i === index ? {...wordList, loaded: true} : source; 
				})
			});
		case LOAD_STORIES:
			return cloneConfig({
				...config,
				storySource: {loaded: true, stories: [...action.storyData]}
			});
		case RECONCILE_CONFIG:
			return cloneConfig({
				...config,
				loading: true,
				loaded: true
			});
		case START_APPLICATION:
			return cloneConfig({
				...config,
				loading: false,
				loaded: true
			});
		default:
			return config;
	};
}

// I really dislike exposing these, and am only doing so for use in test cases.
// I couldn't get babel-plugin-rewire to work to expose these.
const __test__ = {
	initConfig,
	loadStories,
	loadWordList,
	reconcileConfig,
	startApplication
};

// These three methods are the only ones relevant to other modules. Expose reluctantly!
export {
	fetchConfig,
	acknowledgeConfigCompletion,
	configReducer,
	__test__
};