import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import { setShowStory, setStoryIndex, setWillClear } from '../../reducers/ui';

import EmailModal from '../EmailModal';
import StoryPanel from '../StoryPanel';
import WordsPanel from '../WordsPanel';

import Copyright from '../../elements/Copyright';
import Title from '../../elements/Title';

import MasterDetailLayout, {MasterPanel, DetailPanel} from '../../layouts/MasterDetailLayout';

import styles from './ApplicationView.module.scss';

import { RANDOM_ID } from './';

function onChange({value}, history, dispatch) {
	if (value) {
		if (value === RANDOM_ID) {
			dispatch(setStoryIndex(-1));
		}
		history.push("/stories/" + value);
		dispatch(setWillClear(true));
	}
}

function ApplicationView({options, index, title, showStory}) {

	const history = useHistory();
	const dispatch = useDispatch();

	function showDetail(show) {
		dispatch(setShowStory(show));
	}

	return (
		<>
			<div className={styles.application}>
				<Title packed={true}>MadLibs, React style</Title>
				<Select className={styles.selector} options={options} value={options[index]} onChange={value => onChange(value, history, dispatch)} isSearchable={false} />
				<Title>{title}</Title>
				<MasterDetailLayout id="story" masterLabel="Words" detailLabel="Story" highlightDetail={showStory} highlightDetailCallback={showDetail}>
					<MasterPanel highlightDetail={showStory}>
						<WordsPanel/>
					</MasterPanel>
					<DetailPanel highlightDetail={showStory}>
						<StoryPanel/>
					</DetailPanel>
				</MasterDetailLayout>
				<Copyright/>
			</div>
			<EmailModal/>
		</>
	);
}

export default ApplicationView;