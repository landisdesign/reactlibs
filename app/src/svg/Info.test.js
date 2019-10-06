import React from 'react';
import Info from './Info';
import renderer from 'react-test-renderer';

// Because we are simply testing that the contents of <Info/> output, we'll just use snapshot comparison.
describe('<Info/>', () => {

	test('Renders properly', () => {
		const output = renderer.create(<Info/>);
		expect(output.toJSON()).toMatchSnapshot();
	});

});