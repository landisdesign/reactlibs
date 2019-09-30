import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import { objectEquals } from '../../common/common';
import { setRandom, setStoryIndex } from '../../reducers/ui';

import EmailModal from '../EmailModal';
import StoryPanel from '../StoryPanel';
import WordsPanel from '../WordsPanel';

import Copyright from '../../elements/Copyright';
import Tab from '../../elements/Tab';
import Title from '../../elements/Title';

import MasterDetailLayout, {MasterPanel, DetailPanel} from '../../layouts/MasterDetailLayout';

import styles from './Application.module.scss';


Application.propTypes = {
	/**
	 *	The id of the story to present, typically passed after /stories/ in the
	 *	URL. If id isn't present or is incorrect, a default welcome screen is
	 *	presented and the URL is truncated to /stories. If the id is "surprise",
	 *	and it wasn't previously, a random story will be chosen.
	 */
	id: PropTypes.bool
}

const RANDOM_ID = "surprise";

function getIsLoaded(state) {
	return state.config.loaded;
}

function getIndexMap(state) {
	return {...state.stories.idMap};
}

function getStoryIndex(state) {
	return state.ui.storyIndex;
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

function getTitle({stories: {stories: stories}, ui: {isRandom, storyIndex: index}}) {
	return isRandom ? "(Mystery story)" : (stories[index] && stories[index].title) || "\xA0"; // makes sure space is maitained for title so the UI doesn't jump around.
}

function onChange({value}, history, dispatch) {
	if (value) {
		if (value == RANDOM_ID) {
			dispatch(setStoryIndex(-1));
		}
		history.push("/stories/" + value);
	}
}

/**
 *	Application wrapper for the entire application. It identifies the story to
 *	present, along with defining the overall presentation.
 */
function Application(props) {

	const dispatch = useDispatch();

	const history = useHistory();
	const options = useSelector(getOptions, checkOptions);
	const indexMap = useSelector(getIndexMap, objectEquals);
	const savedIndex = useSelector(getStoryIndex);
	const isLoaded = useSelector(getIsLoaded);

	const {id} = props;
	const isRandom = id === RANDOM_ID;
	dispatch(setRandom(isRandom));

	let index = indexMap[id || " "] || -1;
	if (isRandom && index == -1) {
		if (savedIndex == -1) {
			index = Math.floor(Math.random(options.length - 1));
		}
		else {
			index = savedIndex;
		}
	}
	dispatch(setStoryIndex(index));

	const title = useSelector(getTitle);

	if (!isLoaded) {
		return null;
	}
	else if (id && index === -1) {
		return <Redirect to="/stories"/>;
	}
	else {
		return (
			<>
				<div className={styles.application}>
					<Title packed={true}>MadLibs, React style</Title>
					<Select options={options} value={options[isRandom ? options.length - 1 : index]} onChange={value => onChange(value, history, dispatch)} isSearchable={false} />
					<Title>{title}</Title>
					<MasterDetailLayout id="story" masterLabel="Words" detailLabel="Story">
						<MasterPanel>
							<WordsPanel/>
						</MasterPanel>
						<DetailPanel>
							<StoryPanel/>
						</DetailPanel>
					</MasterDetailLayout>
					<Copyright/>
				</div>
				<EmailModal/>
			</>
		);
	}
}

export default Application;