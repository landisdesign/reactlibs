import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { arrayEquals, objectEquals } from '../../common/common';
import { clearEntries, setEntries } from '../../reducers/entries';
import { setOutput } from '../../reducers/ui';

import styles from './WordsPanel.module.scss';

import WordRow from '../WordRow';

import Text from '../../elements/Text';

import FormLayout from '../../layouts/FormLayout';

import Refresh from '../../svg/Refresh';

function getFields({ui: {storyIndex}, stories: {stories}, words, entries}) {

	if (storyIndex === -1) {
		return [];
	}

	return stories[storyIndex].fields.map((field, index) => ({
		storyIndex,
		entryIndex: index,
		words: words[field].words,
		label: words[field].title,
		value: entries[storyIndex][index],
		help: (words[field].help || null)
	}) );
}

function getTemplate({ui: {storyIndex}, stories: {stories}}) {
	return storyIndex === -1 ? '' : stories[storyIndex].template;
}

function checkFields(a, b) {
	return arrayEquals(a, b, objectEquals);
}

function WordsPanel() {

	const fields = useSelector(getFields, checkFields);
	const dispatch = useDispatch();
	const isComplete = fields.every(({value}) => (value.length > 0));
	const template = useSelector(getTemplate);

	function randomize() {
		dispatch(setEntries(
			fields[0].storyIndex,
			fields.map(({words}) => words[Math.floor(Math.random() * words.length)])
		));
	}

	function clear() {
		dispatch(clearEntries(fields[0].storyIndex));
		dispatch(setOutput(''));
	}

	function buildStory() {
		const output = template.replace(/\{\{(\d+)\}\}/g, (match, index) => {
			return fields[+index - 1].value.replace(/</g, '&gt;');
		});
		dispatch(setOutput(output));
	}

	const defaultButton = {
		content: 'Show story',
		isSubmit: true,
		disabled: !isComplete,
		onClick: buildStory
	};

	const buttons = [
		{
			content: <Refresh className={styles.refresh}/>,
			title: 'Randomize all words',
			onClick: randomize
		},
		{
			content: 'Clear words',
			title: 'Clear words and output',
			onClick: clear
		}
	];

	return fields.length ? (
		<FormLayout scrolling={true} defaultButton={defaultButton} buttons={buttons}>
			{
				fields.map(field => WordRow({dispatch, ...field}) )
			}
		</FormLayout>
	) : (
		<Text>
			Welcome to MadLibs, React Style. Pick a story from the choices in the menu above, or choose &ldquo;Pick a random story&rdquo; to choose a story blindly. Enter words for the fields, then click &ldquo;Create&rdquo; to see the results.
		</Text>
	);
}

export default WordsPanel;