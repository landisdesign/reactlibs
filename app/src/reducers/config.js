/*
 *	NOTE: configReducer cannot be included in a call to combineReducers(),
 *	because reconcileConfig() spreads the configuration across the entire
 *	state object, not just the config slice. Therefore the state object
 *	sent to configReducer is the entire state object, not just the config
 *	portion.
 */

import 'whatwg-fetch';

const reducerPrefix = "CONFIG_";
const LOAD_CONFIG = reducerPrefix + "LOAD_CONFIG";
const LOAD_STORIES = reducerPrefix + "LOAD_STORIES";
const LOAD_WORD_LIST = reducerPrefix + "LOAD_WORD_LIST";
const RECONCILE_CONFIG = reducerPrefix + "RECONCILE_CONFIG";
const START_APPLICATION = reducerPrefix + "START_APPLICATION";

/*
 *	Synchronous actions
 */

function loadConfig(config) {
	return {
		type: LOAD_CONFIG,
		config
	};
}

function loadStories(stories) {
	return {
		type: LOAD_STORIES,
		stories
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
 * Asynchronous actions
 */
function fetchConfig(configUrl) {

	const jsonHeader = new Headers({
		"Accept": "application/json, text/plain"
	});

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
		return fetch(wordDataUrl, jsonHeader).then(async response => {
			checkStatus(response);
			const wordData = await response.json();
console.log("Dispatching for " + wordDataUrl);
			dispatch(loadWordList(wordData, index));
		});
	}

	function fetchStories(storyListUrl, dispatch) {
		return fetch(storyListUrl, jsonHeader).then(async response => {
			checkStatus(response);
			const storyData = await response.json();
console.log("Dispatching for " + storyListUrl);
			dispatch(loadStories(storyData));
		});
	}

	return async function(dispatch) {
		try {
			let response = await fetch(configUrl, jsonHeader);
			checkStatus(response);
			const config = await response.json();
			dispatch(loadConfig(config));

			const fetches = config.wordSources.map((url, index) => fetchWords(url, index, dispatch));
			fetches.push(fetchStories(config.storySource, dispatch));
			Promise.all(fetches).then(() => {
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
/*

		fetch(configUrl, jsonHeader).then(response => {
			checkStatus(response);
			const config = response.json();
			dispatch(loadConfig(config));
			const fetches = config.wordSources.map((url, index) => fetchWords(url, index, dispatch));
			fetches.push(fetchStories(config.storySource, dispatch));
			Promise.all(fetches).then(() => {
				dispatch(reconcileConfig());
			});
		}).catch(error => {
			let message = error.message;
			if ("response" in error) {
				message += "\nurl: " + error.response.url;
			}
			throw error;
		});
*/	};
}

/*
 * Reducer
 *
 * Reminder: This retrieves and returns the entire state, not just a "config" slice.
 */

const initialState = {
	config: {
		loading: false,
		loaded: false,
		wordSources: [],
		storySource: {
			loaded: false
		}
	},
	words: {},
	stories: [],
	entries: [],
	ui: {}
};

function configReducer(state = initialState, action) {

	function createConfig(config, action) {
		config.loaded = false;
		config.loading = true;
		config.wordSources = action.config.wordSources.map(url => ( {url, loaded: false} ) );
		config.storySource = {url: action.config.storySource, loaded: false};
	}

	function updateWordList(config, action) {
		config.wordSources = config.wordSources.map((x, index) => (index == action.index ? {data: action.wordList, loaded: true} : x));
	}

	function updateStorySource(state, action) {
		state.config.storySource = {loaded: true};
		state.stories = [...action.stories];
	}

	function finishConfig(state) {
		const {wordMap, referrers} = state.config.wordSources.reduce((acc, {data: word}) => {
			acc.wordMap[word.id] = word;
			if ("ref" in word) acc.referrers.push(word.id);
			return acc;
		}, {wordMap: {}, referrers: []});

		if (referrers.length) {

			referrers.forEach(id => {
				const word = {...wordMap[id]};
				const refedWord = wordMap[word.ref];
				word.words = refedWord.words;
				delete word.ref;
				wordMap[id] = word;
			});

			state.config.wordSources = state.config.wordSources.map(( {data: {id}} ) => wordMap[id]);
		}

		state.words = wordMap;
		state.config.loading = true;
		state.config.loaded = true;
	}

	function startApp(state) {
		state.config.loading = false;
		state.config.loaded = true;
	}

	const newConfig = Object.assign({}, state.config);
	const newState = Object.assign({}, state, {config: newConfig});

	switch (action.type) {
		case LOAD_CONFIG:
			createConfig(newConfig, action);
			return newState;
		case LOAD_WORD_LIST:
			updateWordList(newConfig, action);
			return newState;
		case LOAD_STORIES:
			updateStorySource(newState, action);
			return newState;
		case RECONCILE_CONFIG:
			finishConfig(newState);
			return newState;
		case START_APPLICATION:
			startApp(newState);
			return newState;
		default:
			return state;
	};
}

// Although there are a ton of synchronous action creators, they are all called by fetchConfig.
// These three methods are the only ones relevant to other modules. Expose reluctantly!
export {
	fetchConfig,
	startApplication,
	configReducer
};