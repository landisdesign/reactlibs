import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Image from './';
import styles from './Image.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Image/>', () => {
	test('Image src properly output', () => {
		const src = 'test';
		// For whatever reason, although they produce identical HTML, I cannot use shallow().equals() to compare. Grrr.
		const image = render(<Image src={src}/>); //
		const test = render(<img src={src} alt=''/>); //

		expect(image.html()).toBe(test.html());
	});

	test('alt attribute properly rendered', () => {
		const attrs = {
			src: 'test',
			alt: 'alt text'
		};

		const image = render(<Image {...attrs}/>);
		expect(image.attr('alt')).toBe(attrs.alt);
	});

	test('Centering added', () => {
		const attrs = {
			src: 'test',
			align: 'center'
		};

		const image = render(<Image {...attrs}/>);
		expect(image.hasClass(styles.center)).toBe(true);
	});
});
