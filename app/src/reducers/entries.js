const reducerPrefix = "ENTRIES_";
const ENTRIES_INIT_ENTRIES = reducerPrefix + "INIT_ENTRIES";
const ENTRIES_SET_ENTRY = reducerPrefix + "SET_ENTRY";
const ENTRIES_SET_ENTRIES = reducerPrefix + "SET_ENTRIES";
const ENTRIES_CLEAR_ENTRIES = reducerPrefix + "CLEAR_ENTRIES";

function initEntries(stories) {
	return {
		type: ENTRIES_INIT_ENTRIES,
		stories: stories
	}
}

function setEntries(storyIndex, values) {
	return {
		type: ENTRIES_SET_ENTRIES,
		storyIndex,
		values
	};
}

function setEntry({storyIndex, entryIndex, value}) {
	return {
		type: ENTRIES_SET_ENTRY,
		storyIndex,
		entryIndex,
		value
	};
}

function clearEntries(storyIndex) {
	return {
		type: ENTRIES_CLEAR_ENTRIES,
		storyIndex
	};
}

function entriesReducer(state = [], action) {
	switch (action.type) {
		case ENTRIES_INIT_ENTRIES:
			return action.stories.map(story => (new Array(story.fields.length)).fill("") );
		case ENTRIES_SET_ENTRY:
			{
				const newState = state.map(storyEntries => [...storyEntries]);
				const { storyIndex, entryIndex, value } = action;
				newState[storyIndex][entryIndex] = value;
				return newState;
			}
		case ENTRIES_SET_ENTRIES:
			return state.map((entries, index) => (index === action.storyIndex ? [...action.values] : [...entries]));
		case ENTRIES_CLEAR_ENTRIES:
			return state.map((entries, index) => (index === action.storyIndex ? (new Array(entries.length)).fill("", 0, entries.length) : [...entries]));
		default:
			return state;
	}
}

export { initEntries, setEntries, setEntry, clearEntries, entriesReducer };