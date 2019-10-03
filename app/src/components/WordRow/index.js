import React from 'react';
import PropTypes from 'prop-types';

import { setEntry } from '../../reducers/entries';

import Tooltip from '../../elements/Tooltip';
import Button from '../../elements/Button'

import Info from '../../svg/Info';
import Refresh from '../../svg/Refresh';

import styles from './WordRow.module.scss';

WordRow.propTypes = {
	/**
	 *	The index of the entry in the current story
	 */
	entryIndex: PropTypes.number.isRequired,
	/**
	 *	The index of the current story
	 */
	storyIndex: PropTypes.number.isRequired,
	/**
	 *	The value to present in the text field
	 */
	value: PropTypes.string.isRequired,
	/**
	 *	If provided, help content that appears in a tooltip next to the label
	 */
	help: PropTypes.string,
	/**
	 *	The label for the text field
	 */
	label: PropTypes.string.isRequired,
	/**
	 *	The array of words to provide as random value options
	 */
	words: PropTypes.arrayOf(PropTypes.string).isRequired,
	/**
	 *	The useDispatch() function created by the parent
	 */
	dispatch: PropTypes.func.isRequired
};

/**
 *	An individual row in the form for populating the story. All state comes from
 *	the parent WordsPanel to prevent issues with varying numbers of calls to
 *	useSelector from story to story.
 */
function WordRow({entryIndex, storyIndex, value, help, label, words, dispatch}) {

	function changeWord(value) {
		dispatch(setEntry({
			storyIndex,
			entryIndex,
			value
		}));
	}

	function onChange(e) {
		changeWord(e.target.value);
	}

	function loadNewWord() {
		changeWord(words[Math.floor(Math.random() * words.length)]);
	}

	const fieldName = 'field-' + entryIndex;
	const tooltipId = 'tooltip-' + entryIndex;

	return (
		<div className={styles['word-row']} key={fieldName}>
			<div className={styles['label-row']}>
				<label className={styles.label} htmlFor={fieldName}>{label}</label>
				{ help && <Tooltip id={tooltipId} content={help}><Info className={styles.tooltip}/></Tooltip>}
			</div>
			<div>
				<input type='text' className={styles.input} name={fieldName} id={fieldName} value={value} onChange={onChange}/>
				<Button className={styles.button} onClick={loadNewWord} title="Randomize this word"><Refresh className={styles.refresh}/></Button>
			</div>
		</div>
	);
}

export default WordRow;