import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setEntry } from '../../reducers/entries';

import Tooltip from '../../elements/Tooltip';
import Button from '../../elements/Button'

import Info from '../../svg/Info';
import Refresh from '../../svg/Refresh';

import styles from './WordRow.module.scss';

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