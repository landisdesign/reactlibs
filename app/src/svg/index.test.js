import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Base from './';
import styles from './svg.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Base/>', () => {

	// Styles is not set up in the scss module. Explicitly set it up here to return values.
	styles.icon = 'icon';
	styles.actionable = 'actionable';

	test('Default render', () => {
		const output = render(<Base/>); //

		expect(output.get(0).tagName).toBe('svg');
		expect(output.attr('viewBox')).toBe('0 0 32 32');
		expect(output.hasClass(styles.icon)).toBe(true);
	});

	test('Custom render', () => {
		const content = "test";
		const className = 'foo';
		const viewBox = '0 0 16 16';
		const func = () => {};
		const output = shallow(<Base actionable={true} className={className} viewBox={viewBox} onClick={func}>{content}</Base>); //

		expect(output.hasClass(styles.actionable)).toBe(true);
		expect(output.hasClass(className)).toBe(true);
		expect(output.hasClass(styles.icon)).toBe(false);
		expect(output.prop('viewBox')).toBe(viewBox);
		expect(output.prop('onClick')).toBe(func);
		expect(output.text()).toBe(content);
	});
});
