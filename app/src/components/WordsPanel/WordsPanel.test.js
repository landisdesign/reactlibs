import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { useDispatch, setState, getDispatchArguments, clearArguments } from 'react-redux';

import { clearEntries, setEntries } from '../../reducers/entries';
import { setOutput, setShowStory } from '../../reducers/ui';

import WordsPanel from './';
import FormLayout from '../../layouts/FormLayout';
import WordRow from '../WordRow';
import Refresh from '../../svg/Refresh';
import Text from '../../elements/Text';

import styles from './WordsPanel.module.scss';

[
	'refresh'
].map(style => {styles[style] = style} );

const initialState = {
	ui: {
		storyIndex: 1
	},
	stories: {
		stories: [
			{
				fields: ['c', 'c', 'c'],
				template: 'Story 1: {{1}} {{2}} {{3}} end'
			},
			{
				fields: ['a', 'b', 'a', 'c'],
				template: 'Story 2: {{1}} {{2}} {{3}} {{4}} end'
			}
		]
	},
	words: {
		a: {
			title: 'a',
			help: 'help a',
			words: ['a1', 'a2', 'a3', 'a4']
		},
		b: {
			title: 'b',
			words: ['a1', 'a2', 'a3', 'a4']
		},
		c: {
			title: 'c',
			help: 'help c',
			words: ['c1', 'c2', 'c3', 'c4']
		}
	},
	entries: [
		['v1', 'v2', 'v3'],
		['va', 'vb', '', '']
	]
}

const randomizButtonIndex = 4; // 1st button after field buttons in story 2
const clearButtonIndex = 5; // 2nd button after field buttons in story 2

afterEach(() => {
	initialState.ui.storyIndex = 1;
	clearArguments();
});

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<WordsPanel/>', () => {

	setState(initialState);

	test('Incomplete panel renders', () => {
		const dispatch = useDispatch();

		// I dislike using render, because it requires all subcomponents to work properly, but using shallow or mount makes it hard to go through the component nests
		const output = render(<WordsPanel/>); //

		const defaultButton = {
			content: 'Show story',
			isSubmit: true,
			disabled: true,
			onClick: output.find('[type="submit"]').first().onClick
		};

		const buttons = [
			{
				content: <Refresh className={styles.refresh}/>,
				title: 'Randomize all words',
				onClick: output.find('[type="button"]')[randomizButtonIndex].onClick
			},
			{
				content: 'Clear words',
				title: 'Clear words and output',
				onClick: output.find('[type="button"]')[clearButtonIndex].onClick
			}
		];

		const expectedOutput = render(
			<FormLayout scrolling={true} defaultButton={defaultButton} buttons={buttons}>
				<WordRow storyIndex={1} entryIndex={0} value='va' help='help a' label='a' words={initialState.words.a.words} dispatch={dispatch}/>
				<WordRow storyIndex={1} entryIndex={1} value='vb' label='b' words={initialState.words.b.words} dispatch={dispatch}/>
				<WordRow storyIndex={1} entryIndex={2} value='' help='help a' label='a' words={initialState.words.a.words} dispatch={dispatch}/>
				<WordRow storyIndex={1} entryIndex={3} value='' help='help c' label='c' words={initialState.words.c.words} dispatch={dispatch}/>
			</FormLayout>
		); //

		expect(output).toEqual(expectedOutput);
	});

	test('Complete panel renders', () => {
		const dispatch = useDispatch();

		initialState.ui.storyIndex = 0;

		const output = render(<WordsPanel/>); //

		const defaultButton = {
			content: 'Show story',
			isSubmit: true,
			disabled: false,
			onClick: output.find('[type="submit"]').first().onClick
		};

		const buttons = [
			{
				content: <Refresh className={styles.refresh}/>,
				title: 'Randomize all words',
				onClick: output.find('[type="button"]')[randomizButtonIndex - 1].onClick // one less field
			},
			{
				content: 'Clear words',
				title: 'Clear words and output',
				onClick: output.find('[type="button"]')[clearButtonIndex -1 ].onClick
			}
		];

		const expectedOutput = render(
			<FormLayout scrolling={true} defaultButton={defaultButton} buttons={buttons}>
				<WordRow storyIndex={0} entryIndex={0} value='v1' help='help c' label='c' words={initialState.words.c.words} dispatch={dispatch}/>
				<WordRow storyIndex={0} entryIndex={1} value='v2' help='help c' label='c' words={initialState.words.c.words} dispatch={dispatch}/>
				<WordRow storyIndex={0} entryIndex={2} value='v3' help='help c' label='c' words={initialState.words.c.words} dispatch={dispatch}/>
			</FormLayout>
		); //

		expect(output).toEqual(expectedOutput);
	});

	test('No story renders', () => {
		initialState.ui.storyIndex = -1;

		const output = shallow(<WordsPanel/>); //
		expect(output.exists(FormLayout)).toBe(false);
		expect(output.exists(Text)).toBe(true);
	});

	const sorter = ({type: a}, {type: b}) => (a < b ? -1 : (a > b ? 1 : 0));

	test('Entries cleared', () => {
		const output = mount(<WordsPanel/>);
		output.find('[type="button"]').at(clearButtonIndex).simulate('click');

		const actions = getDispatchArguments();
		const expectedActions = [
			clearEntries(1),
			setOutput('')
		];

		expect(actions.sort(sorter)).toEqual(expectedActions.sort(sorter));
	});

	test('Entries randomized', () => {
		const output = mount(<WordsPanel/>);
		output.find('[type="button"]').at(randomizButtonIndex).simulate('click');

		// I don't like getting into the innards of the actions here, but I want to confirm the values were sent and I don't know them outside of the action itself.
		const [action] = getDispatchArguments();
		expect(action.values).toBeDefined();
		const testAction = setEntries(1, [...action.values]);
		expect(action).toEqual(testAction);

		const {words} = initialState;
		const fields = initialState.stories.stories[1].fields; // This was too convoluted to destructure.
		expect(action.values.every((value, index) => words[fields[index]].words.includes(value))).toBe(true); // confirm words are valid
	});

	test('Entries submitted', () => {
		initialState.ui.storyIndex = 0;
		const output = mount(<WordsPanel/>);
		output.find('[type="submit"]').first().simulate('click');

		const actions = getDispatchArguments();
		const expectedActions = [
			setShowStory(true),
			setOutput('Story 1: v1 v2 v3 end')
		];

		expect(actions.sort(sorter)).toEqual(expectedActions.sort(sorter));
	});
});