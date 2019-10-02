import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { objectEquals } from '../../common/common';

import { setRandom, setStoryIndex, setWillClear, setOutput } from '../../reducers/ui';
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

function getIndexMap(state) {
	return {...state.stories.idMap};
}

function getIsLoaded(state) {
	return state.config.loaded;
}

function getOptions(state) {
	const options = state.stories.stories.map( ({id, title}) => ({value: id, label: title}) );
	options.push( {value: RANDOM_ID, label: "Pick a random story"} );
	return options;
}

function checkOptions(currentOptions, newOptions) {
	return (currentOptions.length === newOptions.length) &&
		currentOptions.every( ({label, value}, i) => (label === newOptions[i].label) && (value === newOptions[i].value) );
}

function getStoryIndex(state) {
	return state.ui.storyIndex;
}

function getTitle({stories: {stories: stories}, ui: {isRandom, storyIndex: index}}) {
	return isRandom ? "(Mystery story)" : (stories[index] && stories[index].title) || "\xA0"; // makes sure space is maitained for title so the UI doesn't jump around.
}

function getWillClear({ui: {willClear}}) {
	return willClear;
}

/**
 *	Application wrapper for the entire application. It identifies the story to
 *	present, along with defining the overall presentation.
 */
function Application(props) {

	const dispatch = useDispatch();

	const indexMap = useSelector(getIndexMap, objectEquals);
	const isLoaded = useSelector(getIsLoaded);
	const options = useSelector(getOptions, checkOptions);
	const savedIndex = useSelector(getStoryIndex);
	const title = useSelector(getTitle);
	const willClear = useSelector(getWillClear);

	const {id = ""} = props;
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
			dispatch(clearEntries(index));
		}
		if (isRandom) {
			index = options.length - 1;
		}
		return <ApplicationView {...{index, title, options}} />;
	}
}

export { RANDOM_ID };
export default Application;