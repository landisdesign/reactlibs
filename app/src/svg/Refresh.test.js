import React from 'react';
import Refresh from './Refresh';
import renderer from 'react-test-renderer';

// Because we are simply testing that the contents of <Info/> output, we'll just use snapshot comparison.
describe('<Refresh/>', () => {

	test('Renders properly', () => {
		const output = renderer.create(<Refresh/>);
		expect(output.toJSON()).toMatchSnapshot();
	});

});