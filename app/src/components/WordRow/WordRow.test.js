import React from 'react';
import { shallow, mount } from 'enzyme';

import { setEntry } from '../../reducers/entries';

import WordRow from './';
import Button from '../../elements/Button';
import Tooltip from '../../elements/Tooltip';
import Info from '../../svg/Info';
import Refresh from '../../svg/Refresh';

import styles from './WordRow.module.scss';

[
	'word-row',
	'label-row',
	'label',
	'tooltip',
	'input',
	'button',
	'refresh'
].map(style => {styles[style] = style} );

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<WordRow/>', () => {

	const testProps = {
		entryIndex: 1,
		storyIndex: 2,
		value: "test",
		help: "help",
		label: "word",
		words: [
			"a",
			"b"
		],
		dispatch: jest.fn()
	},
	{
		entryIndex,
		storyIndex,
		value,
		help,
		label,
		words,
		dispatch
	} = testProps;

	test('renders properly', () => {
		const output = shallow(<WordRow {...testProps}/>); //
		const onChange = output.find('input').first().prop('onChange');
		const onClick = output.find(Button).first().prop('onClick');

		const expectedOutput = shallow(<div className={styles['word-row']} key={'field-' + entryIndex}>
			<div className={styles['label-row']}>
				<label className={styles.label} htmlFor={'field-' + entryIndex}>{label}</label>
				<Tooltip id={'tooltip-' + entryIndex} content={help}><Info className={styles.tooltip}/></Tooltip>
			</div>
			<div>
				<input type='text' className={styles.input} name={'field-' + entryIndex} id={'field-' + entryIndex} value={value} onChange={onChange}/>
				<Button className={styles.button} onClick={onClick} title="Randomize this word"><Refresh className={styles.refresh}/></Button>
			</div>
		</div>); //

		expect(output.equals(expectedOutput));
	});

	test('handles events properly', () => {
		const output = mount(<WordRow {...testProps}/>); //

		output.find('button').simulate('click');

		expect(dispatch.mock.calls).toHaveLength(1);
		let action = dispatch.mock.calls[0][0];
		expect(words.includes(action.value)).toBe(true);
		let expectedAction = setEntry({storyIndex, entryIndex, value: action.value});
		expect(action).toEqual(expectedAction);

		dispatch.mockClear();

		const newValue = "new";
		output.find('input').simulate('change', {
			target: {
				value: newValue
			}
		});

		expect(dispatch.mock.calls).toHaveLength(1);
		action = dispatch.mock.calls[0][0];
		expect(action.value).toEqual(newValue);
		expectedAction = setEntry({storyIndex, entryIndex, value: newValue});
		expect(action).toEqual(expectedAction);

		dispatch.mockClear();
	});
});