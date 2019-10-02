const reducerPrefix = "UI_";
const UI_IS_RANDOM = reducerPrefix + "IS_RANDOM";
const UI_SET_STORY = reducerPrefix + "SET_STORY_INDEX";
const UI_SET_VISIBLE_PANEL = reducerPrefix + "SET_VISIBLE_PANEL";
const UI_SET_WILL_CLEAR = reducerPrefix + "SET_WILL_CLEAR";
const UI_SET_OUTPUT = reducerPrefix + "SET_OUTPUT";
const UI_CLEAR_OUTPUT = reducerPrefix + "CLEAR_OUTPUT";

function setOutput(output) {
	return {
		type: UI_SET_OUTPUT,
		output
	};
}

function setRandom(isRandom) {
	return {
		type: UI_IS_RANDOM,
		isRandom
	};
}

function setStoryIndex(storyIndex) {
	return {
		type: UI_SET_STORY,
		storyIndex
	};
}

function setVisiblePanel(visiblePanel) {
	return {
		type: UI_SET_VISIBLE_PANEL,
		visiblePanel
	};
}

function setWillClear(willClear) {
	return {
		type: UI_SET_WILL_CLEAR,
		willClear
	};
}

const initialUI = {
	isRandom: false,
	willClear: false,
	storyIndex: -1,
	visiblePanel: 'master',
	output: ''
};

function uiReducer(state = initialUI, action) {
	switch (action.type) {
		case UI_IS_RANDOM:
		case UI_SET_STORY:
		case UI_SET_VISIBLE_PANEL:
		case UI_SET_WILL_CLEAR:
		case UI_SET_OUTPUT:
			const data = {...action};
			delete data.type;
			return {...state, ...data};
		default:
			return state;
	}
}

export {setOutput, setRandom, setStoryIndex, setVisiblePanel, setWillClear, uiReducer};