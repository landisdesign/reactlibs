const STORIES_LOAD = "STORIES_LOAD";

function loadStories(storySource) {
	return {
		type: STORIES_LOAD,
		storySource
	};
}

function storiesReducer(state = {stories:[], ids: {}}, action) {
	switch (action.type) {
		case STORIES_LOAD:
			{
				const newState = { stories: action.storySource.map(story => ({...story, fields: [...story.fields] }) ) };
				newState.idMap = newState.stories.reduce((acc, story, index) => {
					acc[story.id] = index;
					return acc;
				}, {});
				return newState;
			}
		default:
			return state;
	}
}

export { loadStories, storiesReducer };