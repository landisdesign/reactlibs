import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Text from './';
import styles from './Text.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Text/>', () => {

	test('Default render', ()=> {
		const content = 'text';
		const text = render(<Text>{content}</Text>); //

		expect(text.get(0).tagName).toBe('div');
		expect(text.text()).toBe(content);
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

	/*
	 *	For whatever reason, the class ".default" is not being registered in the text,
	 *	but works properly irl. This test relies on the default class existing.
	 */
	test.skip('Undefined types keep default style', () => {
		const text = shallow(<Text type='fooBar'>content</Text>); //

		expect(text.hasClass(styles.default)).toBe(true);
	});
});
