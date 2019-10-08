import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { setState, getDispatchArguments, clearArguments } from 'react-redux';

import { setOutput, setShowEMail } from '../../reducers/ui';

import StoryPanel from './';
import FormLayout from '../../layouts/FormLayout';
import Text from '../../elements/Text';

const initialState = {
	ui: {
		output: 'This is a story with <abbr>HTML</abbr> in it.'
	}
}
const {ui: {output: initialOutput} } = initialState;

afterEach(() => {
	clearArguments();
	initialState.ui.output = initialOutput;
});

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<StoryPanel/>', () => {

	setState(initialState);

	test('Renders story', () => {
		const output = render(<StoryPanel/>); //

		const button = [
			{
				content: 'E-mail to a friend',
				disabled: false,
				onClick: output.find('[type="button"]')[0].onClick
			}
		];

		const expectedOutput = render(
			<FormLayout scrolling={true} buttons={button}>
				<Text html={initialState.ui.output} />
			</FormLayout>
		); //

		expect(output).toEqual(expectedOutput);
	});

	test('Renders nothing without story', () => {
		initialState.ui.output = '';
		const output = render(<StoryPanel/>); //
		expect(output).toHaveLength(0);
	});

	test('E-mail dialog activated', () => {
		const output = mount(<StoryPanel/>); //
		output.find('[type="button"]').at(0).simulate('click');

		const [action] = getDispatchArguments();
		const expectedAction = setShowEMail(true, true);
		expect(action).toEqual(expectedAction);
	});
});