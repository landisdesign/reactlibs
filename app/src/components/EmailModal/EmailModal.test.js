import React from 'react';
import { mount } from 'enzyme';

import { setState, getDispatchArguments, clearArguments } from 'react-redux';

import { setShowEMail } from '../../reducers/ui';

import EmailModal from './';

import Modal from '../../layouts/Modal';
import Close from '../../svg/Close';

const initialState = {
	ui: {
		showEMail: false,
		transitionEMail: false
	}
};

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<EmailModal/>', () => {

	beforeEach(() => {
		clearArguments();
	});

	setState(initialState);

	test('Closed modal', () => {
		const output = mount(<EmailModal/>);//
		const { fade, open } = output.find(Modal).props();
		expect(fade).toBe(false);
		expect(open).toBe(false);
	});

	test('Modal opens', done => {

		initialState.ui = {
			showEMail: true,
			transitionEMail: true
		};

		const output = mount(<EmailModal/>);//

		getDispatchArguments(1).then(actions => {
				expect(actions[0]).toEqual(setShowEMail(true, false));
				done();
			},
			actions => {
				expect(actions).toHaveLength(1);
				done();
			}
		);

		const { fade, open } = output.find(Modal).props();
		expect(fade).toBeTruthy(); // it will be a function, but most importantly, fading is happening.
		expect(open).toBe(true);
	});

	test('Modal is open', () => {

		initialState.ui.transitionEMail = false;

		const output = mount(<EmailModal/>);//

		const { fade, open } = output.find(Modal).props();
		expect(fade).toBe(false);
		expect(open).toBe(true);

		output.find(Close).simulate('click');

		const actions = getDispatchArguments();
		expect(actions).toHaveLength(1);
		expect(actions[0]).toEqual(setShowEMail(false, true));
	});

	test('Modal closes', done => {

		initialState.ui = {
			showEMail: false,
			transitionEMail: true
		};

		const output = mount(<EmailModal/>);//

		getDispatchArguments(1).then(actions => {
				expect(actions[0]).toEqual(setShowEMail(false, false));
				done();
			},
			actions => {
				expect(actions).toHaveLength(1);
				done();
			}
		);

		const { fade, open } = output.find(Modal).props();
		expect(fade).toBeTruthy(); // it will be a function, but most importantly, fading is happening.
		expect(open).toBe(false);
	});
});