import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { objectEquals } from '../../common/common';

import { setRandom, setShowStory, setStoryIndex, setWillClear, setOutput } from '../../reducers/ui';
import { clearEntries } from '../../reducers/entries';

import ApplicationView from './ApplicationView';

Application.propTypes = {
	/**
	 *	The id of the story to present, typically passed after /stories/ in the
	 *	URL. If id isn't present or is incorrect, a default welcome screen is
	 *	presented and the URL is truncated to /stories. If the id is "surprise",
	 *	and it wasn't previously, a random story will be chosen.
	 */
	id: PropTypes.string
}

const RANDOM_ID = "surprise";

/**
 *	Application wrapper for the entire application. It identifies the story to
 *	present, along with defining the overall presentation.
 */
function Application({id = ''}) {

	function getOptions(state) {
		const options = state.stories.stories.map( ({id, title}) => ({value: id, label: title}) );
		options.push( {value: RANDOM_ID, label: "Pick a random story"} );
		return options;
	}

	function checkOptions(currentOptions, newOptions) {
		return (currentOptions.length === newOptions.length) &&
			currentOptions.every( ({label, value}, i) => (label === newOptions[i].label) && (value === newOptions[i].value) );
	}

	function getTitle({stories: {stories}, ui: {isRandom, storyIndex: index}}) {
		return isRandom ? "(Mystery story)" : (stories[index] && stories[index].title) || "\xA0"; // makes sure space is maitained for title so the UI doesn't jump around.
	}

	const options = useSelector(getOptions, checkOptions);
	const title = useSelector(getTitle);
	const indexMap = useSelector(state => ({...state.stories.idMap}), objectEquals);
	const isLoaded = useSelector(state => state.config.loaded);
	const savedIndex = useSelector(state => state.ui.storyIndex);
	const willClear = useSelector(state => state.ui.willClear);
	const showStory = useSelector(state => state.ui.showStory);

	const dispatch = useDispatch();

	const isRandom = id === RANDOM_ID;
	dispatch(setRandom(isRandom));

	let index = (id in indexMap) ? indexMap[id] : -1;
	if (isRandom && index === -1) {
		if (savedIndex === -1) {
			index = Math.floor(Math.random(options.length - 1));
		}
		else {
			index = savedIndex;
		}
	}
	dispatch(setStoryIndex(index));

	if (!isLoaded) {
		return null;
	}
	else if (id && index === -1) {
		return <Redirect to="/stories"/>;
	}
	else {
		if (willClear) {
			dispatch(setOutput(''));
			dispatch(setShowStory(false));
			dispatch(clearEntries(index));
			dispatch(setWillClear(false));
		}
		if (isRandom) {
			index = options.length - 1;
		}
		// Because the view and application logic are pretty large, I'm splitting them into separate files.
		// I'm keeping the outer wrapper as index.js to keep this transparent to other modules.
		return <ApplicationView {...{index, title, options, showStory}} />;
	}
}

export { RANDOM_ID };
export default Application;