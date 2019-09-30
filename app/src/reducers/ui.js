const reducerPrefix = "UI_";
const UI_IS_RANDOM = reducerPrefix + "IS_RANDOM";
const UI_SET_STORY = reducerPrefix + "SET_STORY_INDEX";
const UI_SET_VISIBLE_PANEL = reducerPrefix + "UI_SET_VISIBLE_PANEL";

function setStoryIndex(storyIndex) {
	return {
		type: UI_SET_STORY,
		storyIndex
	};
}

function setRandom(isRandom) {
	return {
		type: UI_IS_RANDOM,
		isRandom
	};
}

function setVisiblePanel(visiblePanel) {
	return {
		type: UI_SET_VISIBLE_PANEL,
		visiblePanel
	};
}

const initialUI = {
	isRandom: false,
	storyIndex: -1,
	visiblePanel: "master"
};

function uiReducer(state = initialUI, action) {
	switch (action.type) {
		case UI_IS_RANDOM:
		case UI_SET_STORY:
		case UI_SET_VISIBLE_PANEL:
			const data = {...action};
			delete data.type;
			return {...state, ...data};
		default:
			return state;
	}
}

export {setStoryIndex, setRandom, setVisiblePanel, uiReducer};