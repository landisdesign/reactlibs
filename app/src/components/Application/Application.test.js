import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { getDummyState, setState, getDispatchArguments, clearArguments } from 'react-redux';

import { clearEntries } from '../../reducers/entries'
import { setShowStory, setStoryIndex, setWillClear, setRandom, setOutput } from '../../reducers/ui';

import Application, { RANDOM_ID } from './';
import ApplicationView from './ApplicationView';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Application/>', () => {

	let initialState;

	beforeEach(() => {
		initialState = getDummyState();
		setState(initialState);
		clearArguments();
	});

	const buildOptions = (state) => {
		const options = state.stories.stories.map(({id, title}) => ({label: title, value: id}));
		options.push( {value: RANDOM_ID, label: 'Pick a random story'} );
		return options;
	}

	const sortActions = actionArrayMap => Object.entries(actionArrayMap).reduce((acc, [name, arr]) => {
		acc[name] = arr.sort(({type: a}, {type: b}) => a < b ? -1 : (a > b ? 1 : 0));
		return acc;
	}, {});

	test('Displays nothing before config loaded', () => {
		initialState.config.loaded = false;
		const output = shallow(<Application/>);
		expect(output.children().exists()).toBe(false);
	});

	test('Redirects if invalid ID provided', () => {
		const output = mount(
			<MemoryRouter initialEntries={['/stories/foobar']}>
				<Route render={({location}) => (<Application id='something that would never be used in a URL' location={location}/>)}/>
			</MemoryRouter>
		); //

		expect(output.find(Application).props().location.pathname).toBe('/stories');
	});

	test('Sends proper data for requested story ID', () => {
		const index = 1;
		const {id, title} = initialState.stories.stories[index];
		const showStory = initialState.ui.showStory;
		const options = buildOptions(initialState);

		const output = mount(<Application id={id}/>);
		const appView = output.find(ApplicationView);

		expect(appView.exists()).toBe(true);
		expect(appView.prop('index')).toEqual(index);
		expect(appView.prop('title')).toEqual(title);
		expect(appView.prop('options')).toEqual(options);
		expect(appView.prop('showStory')).toEqual(showStory);

		let actions = getDispatchArguments();
		let expectedActions = [
			setRandom(false),
			setStoryIndex(index)
		];
		sortActions({actions, expectedActions});
		expect(actions).toEqual(expectedActions);
	});

	test('Clears data when requested', () => {
		const index = 1;
		const {id, title} = initialState.stories.stories[index];
		const options = buildOptions(initialState);

		initialState.ui.willClear = true;

		const output = mount(<Application id={id}/>);
		const appView = output.find(ApplicationView);

		expect(appView.exists()).toBe(true);
		expect(appView.prop('index')).toEqual(index);
		expect(appView.prop('title')).toEqual(title);
		expect(appView.prop('options')).toEqual(options);
		expect(appView.prop('showStory')).toEqual(false);

		let actions = getDispatchArguments();
		let expectedActions = [
			setRandom(false),
			setStoryIndex(index),
			setOutput(''),
			setShowStory(false),
			clearEntries(index),
			setWillClear(false)
		];
		sortActions({actions, expectedActions});
		expect(actions).toEqual(expectedActions);
	});

	test('Sends proper data for random story ID with already provided story index', () => {
		const menuIndex = 2;
		const storyIndex = initialState.ui.storyIndex = 1;
		const id = RANDOM_ID;
		const options = buildOptions(initialState);
		const showStory = initialState.ui.showStory;

		const output = mount(<Application id={id}/>);
		const appView = output.find(ApplicationView);

		expect(appView.exists()).toBe(true);
		expect(appView.prop('index')).toEqual(menuIndex);
		expect(appView.prop('title')).toEqual('(Mystery story)');
		expect(appView.prop('options')).toEqual(options);
		expect(appView.prop('showStory')).toEqual(showStory);

		let actions = getDispatchArguments();
		let expectedActions = [
			setRandom(true),
			setStoryIndex(storyIndex)
		];
		sortActions({actions, expectedActions});
		expect(actions).toEqual(expectedActions);
	});

	test('Sends proper data for random story ID before story index is sent', () => {
		const menuIndex = 2;
		const id = RANDOM_ID;
		const options = buildOptions(initialState);
		const showStory = initialState.ui.showStory;

		initialState.ui.storyIndex = -1;

		const output = mount(<Application id={id}/>);
		const appView = output.find(ApplicationView);

		expect(appView.exists()).toBe(true);
		expect(appView.prop('index')).toEqual(menuIndex);
		expect(appView.prop('title')).toEqual('(Mystery story)');
		expect(appView.prop('options')).toEqual(options);
		expect(appView.prop('showStory')).toEqual(showStory);

		const actions = getDispatchArguments();

		const {type:setIndexType} = setStoryIndex(-1);
		const storyIndex = actions.reduce((index, action) => (
			action.type === setIndexType ? action.storyIndex : index
		), -1);
		expect(storyIndex).not.toBe(-1);
		expect(storyIndex).toBeLessThan(initialState.stories.stories.length);

		let expectedActions = [
			setRandom(true),
			setStoryIndex(storyIndex)
		];
		sortActions({actions, expectedActions});
		expect(actions).toEqual(expectedActions);
	});

});