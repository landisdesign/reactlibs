import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { getDummyState, setState } from 'react-redux';
import { shallow, mount, render } from 'enzyme';

import App from './App';
import Application from './components/Application';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<App/>', () => {

	let initialState;

	beforeEach(() => {
		initialState = getDummyState();
		setState(initialState);
	});

	test('Redirect to home page for entering on invalid pages', () => {

		initialState.config.loaded = false;

		const output = mount(
			<MemoryRouter initialEntries={['/invalid']}>
				<Route component={App}/>
			</MemoryRouter>
		); //

		expect(output.find(App).props().location.pathname).toBe('/');
	});

	test('Provide a story ID', () => {

		const output = mount(
			<MemoryRouter initialEntries={['/stories/a']}>
				<Route component={App}/>
			</MemoryRouter>
		); //

		expect(output.find(Application).prop('id')).toBe('a');
	});
});
