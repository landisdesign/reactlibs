import React from 'react';
import { render } from 'enzyme';

import ProgressIndicator from './';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<ProgressIndicator/>', () => {

	const gradient = (fg, bg) => `linear-gradient(to right, ${fg} 49.9%, ${bg} 50.1%)`;

	test('Default indicator', () => {
		const bg = '#FFF';
		const fg = '#369';
		const width = 'calc(100% - 1rem)';

		let indicator = render(<ProgressIndicator current={0} max={1}/>);
		expect(indicator.css('background')).toBe(bg);

		indicator = render(<ProgressIndicator current={1} max={1}/>);
		expect(indicator.css('background')).toBe(fg);

		indicator = render(<ProgressIndicator current={1} max={2}/>);
		expect(indicator.css('background')).toBe(gradient(fg, bg));

		indicator = render(<ProgressIndicator current={1} max={2}/>);
		expect(indicator.css('width')).toBe(width);
	});

	test('Custom indicator', () => {
		const bg = '#000';
		const fg = '#FFF';
		const width = '75%';

		let indicator = render(<ProgressIndicator fillColor={fg} backgroundColor={bg} width={width} current={0} max={1}/>);
		expect(indicator.css('background')).toBe(bg);

		indicator = render(<ProgressIndicator fillColor={fg} backgroundColor={bg} width={width} current={1} max={1}/>);
		expect(indicator.css('background')).toBe(fg);

		indicator = render(<ProgressIndicator fillColor={fg} backgroundColor={bg} width={width} current={1} max={2}/>);
		expect(indicator.css('background')).toBe(gradient(fg, bg));

		indicator = render(<ProgressIndicator fillColor={fg} backgroundColor={bg} width={width} current={1} max={2}/>);
		expect(indicator.css('width')).toBe(width);
	});

});
