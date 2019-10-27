import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, render } from 'enzyme';

import { setState, getDispatchArguments, clearArguments } from 'react-redux';

import { loadStories } from '../../reducers/stories';
import { loadWords } from '../../reducers/words';

import Landing from './';

import Modal from '../../layouts/Modal';
import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

const initialState = {
	config: {
		loading: false,
		loaded: false,
		wordSources: [],
		storySource: {
			loaded: false
		}
	}
};

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Landing/>', () => {

	setState(initialState);

	afterEach(() => {
		clearArguments();
	});
	/*
	 *	The tests are done in order, with progressive completion of initialState until the last test where the buildout is complete.
	 */

	test('Initial opening', () => {
		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={true} fade={false} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={0} max={1} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);

		const [thunk] = getDispatchArguments();
		expect(typeof thunk).toBe('function');
	});

	test('Config load presentation', () => {
		initialState.config = {
			loading: true,
			loaded: false,
			wordSources: [
				{
					url: 'b',
					loaded: false
				},
				{
					url: 'c',
					loaded: false
				}
			],
			storySource: {
				url: 'a',
				loaded: false
			}
		};

		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={true} fade={false} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={0} max={3} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);
	});

	test('Word load presentation', () => {
		initialState.config.wordSources[0] = {
			id: 'b',
			title: 'B',
			help: 'B help',
			words: ['b1', 'b2'],
			loaded: true
		};

		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={true} fade={false} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={1} max={3} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);
	});

	test('Story load presentation', () => {
		initialState.config.storySource = {
			stories: [
				{
					id: 'x',
					title: 'X',
					fields: ['a', 'b'],
					template: 'Story X'
				},
				{
					id: 'y',
					title: 'Y',
					fields: ['b', 'a'],
					template: 'Story Y'
				}
			],
			loaded: true
		};

		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={true} fade={false} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={2} max={3} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);
	});

	test('Final word load presentation', () => {
		initialState.config.wordSources[1] = {
			id: 'a',
			title: 'A',
			ref: 'b',
			loaded: true
		};

		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={true} fade={false} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={3} max={3} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);
	});

	test('Load complete presentation', () => {
		initialState.config.loaded = true;

		const output = render(
			<MemoryRouter initialEntries={['/']}>
				<Landing/>
			</MemoryRouter>
		); //

		const expectedOutput = render(
			<Modal open={false} fade={true} background='#FFF' close={false}>
				<Image src='/development/madlibs/logo.png' align='center'/>
				<Title>MadLibs, React style</Title>
				<ProgressIndicator current={3} max={3} width='80%' backgroundColor='#DEF' />
				<Copyright/>
			</Modal>
		);//

		expect(output).toEqual(expectedOutput);

		const actions = getDispatchArguments();
		expect(typeof actions.pop()).toBe('function');

		const sorter = ({type: a}, {type: b}) => a < b ? -1 : (a > b ? 1 : 0);

		const expectedActions = [
			loadStories(initialState.config.storySource.stories),
			loadWords(initialState.config.wordSources)
		].sort(sorter);

		expect(actions.sort(sorter)).toEqual(expectedActions);
	});

	test('Application start', () => {
		initialState.config.loading = false;

		const output = mount(
			<MemoryRouter initialEntries={['/']}>
				<Route component={Landing}/>
			</MemoryRouter>
		); //

		expect(output.find(Landing).props().location.pathname).toBe('/stories');
	});
});
