import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Text from './';
import styles from './Text.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Text/>', () => {

	// Styles is not set up in the scss module. Explicitly set it up here to return values.
	styles.default = "default";
	styles.story = "story";

	test('Default render', ()=> {
		const content = 'text';
		const text = shallow(<Text>{content}</Text>); //
		const expected = <div className={styles.default}>{content}</div>; //

		expect(text.equals(expected)).toBe(true);
	});

	test('Unsafe content escaped', () => {
		const content = '<b>text</b>';
		const text = render(<Text>{content}</Text>); //

		expect(text.text()).toBe(content);
	});

	test('Unsafe content produced', () => {
		const content = 'text';
		const html = '<b>' + content + '</b>';
		const text = render(<Text html={html}/>); //

		expect(text.text()).toBe(content);
		expect(text.html()).toBe(html);
	});

	test('Story type changes style', () => {
		const text = render(<Text type='story'>content</Text>); //
		expect(text.hasClass(styles.story)).toBe(true);
	});

	test('Undefined types keep default style', () => {
		const text = shallow(<Text type='fooBar'>content</Text>); //
		expect(text.hasClass(styles.default)).toBe(true);
	});
});
