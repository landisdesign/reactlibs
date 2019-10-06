import React from 'react';
import Close from './Close';
import renderer from 'react-test-renderer';

// Because we are simply testing that the contents of <Close/> output, we'll just use snapshot comparison.
describe('<Close/>', () => {

	test('Renders properly', () => {
		const output = renderer.create(<Close/>);
		expect(output.toJSON()).toMatchSnapshot();
	});

});