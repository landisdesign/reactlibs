import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import { setStoryIndex, setWillClear } from '../../reducers/ui';

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

function ApplicationView({options, index, title}) {

	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<>
			<div className={styles.application}>
				<Title packed={true}>MadLibs, React style</Title>
				<Select options={options} value={options[index]} onChange={value => onChange(value, history, dispatch)} isSearchable={false} />
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

export default ApplicationView;