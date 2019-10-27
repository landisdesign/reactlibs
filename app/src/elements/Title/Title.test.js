import React from 'react';
import { shallow } from 'enzyme';

import Title from './';
import styles from './Title.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Title/>', () => {

	styles.title = 'title';
	styles['title-packed'] = 'title-packed';

	test('Outputs standard title properly', ()=> {
		const output = shallow(<Title>text</Title>); //
		const expectedOutput = (<h1 className={styles.title}>text</h1>); //
		expect(output.equals(expectedOutput)).toBe(true);
	});

	test('Outputs packed title properly', ()=> {
		const output = shallow(<Title packed={true}>text</Title>); //
		const expectedOutput = (<h1 className={styles['title-packed']}>text</h1>); //
		expect(output.equals(expectedOutput)).toBe(true);
	});

});
