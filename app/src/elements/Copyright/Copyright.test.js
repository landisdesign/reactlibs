import React from 'react';
import { render } from 'enzyme';

import Copyright from './';
import styles from './Copyright.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Copyright/>', () => {
	test('Copyright content properly output', () => {
		const copyright = render(<Copyright/>); //

		expect(copyright.hasClass(styles.copyright)).toBe(true);
		expect(copyright.html()).toContain("Copyright");
		expect(copyright.html()).toContain("Michael Landis");
	});
});
