import React from 'react';
import { useHistory, getHistory, clearHistory } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';

import { getDummyState, setState, useDispatch, getDispatchArguments, clearArguments } from 'react-redux';

import { setShowStory, setStoryIndex, setWillClear } from '../../reducers/ui';

import ApplicationView from './ApplicationView';
import { RANDOM_ID } from './';

import Select from 'react-select';

import Copyright from '../../elements/Copyright';
import Title from '../../elements/Title';
import EmailModal from '../../components/EmailModal';
import StoryPanel from '../../components/StoryPanel';
import WordsPanel from '../../components/WordsPanel';

import MasterDetailLayout, {MasterPanel, DetailPanel} from '../../layouts/MasterDetailLayout';

import styles from './ApplicationView.module.scss';

styles.application = 'application';
styles.selector = 'selector';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<ApplicationView/>', () => {

	const testProps = {
		options: [
			{label: 'a', value: 'a'},
			{label: 'b', value: 'b'},
			{label: 'Random', value: RANDOM_ID},
		],
		index: 1,
		title: 'title',
		showStory: false
	};

	/*	This is not a true render test, as I am not comparing snapshots. I'm going to
	 *	be testing only that ApplicationView is properly sending its properties through
	 *	to the various child tags. */
	test('Render properly', () => {

		setState(getDummyState());

		const {
			options,
			index,
			title,
			showStory
		} = testProps;

		const output = shallow(<ApplicationView {...testProps}/>);
		const highlightHandler = output.find(MasterDetailLayout).prop('highlightDetailCallback');

		const expectedDiv = shallow(
			<div className={styles.application}>
				<Title packed={true}>MadLibs, React style</Title>
				<Select className={styles.selector} options={options} value={options[index]} onChange={value => onChange(value, history, dispatch)} isSearchable={false} />
				<Title>{title}</Title>
				<MasterDetailLayout masterLabel="Words" detailLabel="Story" highlightDetail={showStory} highlightDetailCallback={highlightHandler}>
					<MasterPanel highlightDetail={showStory}>
						<WordsPanel/>
					</MasterPanel>
					<DetailPanel highlightDetail={showStory}>
						<StoryPanel/>
					</DetailPanel>
				</MasterDetailLayout>
				<Copyright/>
			</div>
		);//

		const expectedEMail = shallow(<EmailModal/>);

		/* This test is hacky because <Select/> directly defined above doesn't match
		   <Select/> as output through <ApplicationView/>. The ids within the select
		   are different, so using equals doesn't work on shallow or mount, and render
		   doesn't provide insight into the values sent into the selects. debug lets
		   us compare values without going deep into the components. */
		expect(output.childAt(0).debug()).toEqual(expectedDiv.debug());

		expect(output.childAt(1).is(EmailModal)).toEqual(true);
	});

	test('Calls to switch to story view', () => {

		setState(getDummyState());

		const output = mount(<ApplicationView {...testProps}/>);
		output.find('.tab').simulate('click');

		const actions = getDispatchArguments();
		expect(actions).toHaveLength(1);
		expect(actions[0]).toEqual(setShowStory(true));

		clearArguments();
	});

	test('Calls to change stories', () => {

		const output = mount(<ApplicationView {...testProps}/>);
		// react-select values can't be changed directly from a mount, so we are calling the onChange handler directly.
		const onChange = output.find('.' + styles.selector).at(0).prop("onChange");
		onChange(testProps.options[0], useHistory(), useDispatch());

		const actions = getDispatchArguments();
		expect(actions).toHaveLength(1);
		expect(actions[0]).toEqual(setWillClear(true));

		const history = getHistory();
		expect(history[0]).toEqual('/stories/' + testProps.options[0].value);

		clearArguments();
		clearHistory();
	});

	test('Calls to show random story', () => {

		const output = mount(<ApplicationView {...testProps}/>);
		// react-select values can't be changed directly from a mount, so we are calling the onChange handler directly.
		const onChange = output.find('.' + styles.selector).at(0).prop("onChange");
		onChange(testProps.options[2], useHistory(), useDispatch());

		const actions = getDispatchArguments();
		expect(actions).toHaveLength(2);
		const expectedActions = [setStoryIndex(-1), setWillClear(true)];
		const sorter = ({type: a}, {type: b}) => (a < b ? -1 : (a > b ? 1 : 0));
		expect(actions.sort(sorter)).toEqual(expectedActions.sort(sorter));

		const history = getHistory();
		expect(history[0]).toEqual('/stories/' + testProps.options[2].value);

		clearArguments();
		clearHistory();
	});
});