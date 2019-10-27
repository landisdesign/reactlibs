import React from 'react';
import { shallow } from 'enzyme';

import Button from './';
import styles from './Button.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Button/>', () => {

	test('Propless button renders properly', () => {

		const button = shallow(<Button>test</Button>); //

		expect(button.matchesElement(<button type='button' className={styles.button}>test</button>)).toBe(true); //
	});

	test('isDefault renders properly', () => {

		const defaultButton = shallow(<Button isDefault={true}>test</Button>); //
		expect(defaultButton.hasClass(styles.default)).toBe(true);

		const standardButton = shallow(<Button isDefault={false}>test</Button>); //
		expect(standardButton.hasClass(styles.button)).toBe(true); //
	});

	test('isSubmit renders properly', () => {
		const submit = shallow(<Button isSubmit={true}>test</Button>); //
		expect(submit.exists('[type="submit"]')).toBe(true);

		const button = shallow(<Button isSubmit={false}>test</Button>); //
		expect(button.exists('[type="button"]')).toBe(true);
	});

	test('Additional classes properly passed', () => {
		const testClass = 'test';
		const button = shallow(<Button className={testClass}>test</Button>); //

		expect(button.hasClass(styles.button)).toBe(true);
		expect(button.hasClass(testClass)).toBe(true);
	});

	test('Content rendered within button', ()=> {
		const content = 'test';
		const contentButton = shallow(<Button content={content}/>); //
		const childrenButton = shallow(<Button>{content}</Button>); //

		expect(contentButton.html()).toBe(childrenButton.html());
	});

	test('Allowed attributes passed in', () => {
		const testAttributes = {
			name: 'name',
			onClick: ()=>{},
			style: {width: 'auto'},
			title: 'title',
			value: 'value',
			disabled: true
		};
		const testSelector = '[' + Object.entries(testAttributes).map(([attr]) => attr).join('][') + ']';

		const button = shallow(<Button {...testAttributes}>test</Button>); //
		expect(button.exists(testSelector)).toBe(true);
	});

	test('Unspecified attributes not passed in', () => {
		const button = shallow(<Button fooBar='a'>test</Button>); //
		expect(button.exists('[fooBar]')).toBe(false);
	});
});
