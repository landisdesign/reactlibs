import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Modal from './';
import ModalHeader from './ModalHeader';
import styles from './Modal.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Modal/>', () => {

	// CSS module isn't parsed by Jest, need to stub it out
	['modal', 'open', 'closed', 'opening', 'closing', 'modal-content', 'transitioning'].forEach(style => styles[style] = style);

	const children = 'children';

	/*
	 *	We are directly examining the output HTML instead of className, because the className property doesn't change when the component internally changes the HTML over time.
	 */
	const collateClasses = (wrapper, classes) => ({
		expected: classes.sort(),
		received: /^\S+\s+class="([^"]+)"/.exec(wrapper.html())[1].split(/\s+/).sort()
	});

	const hasContent = (wrapper, content) => {
		expect(wrapper.childAt(0).prop("className")).toBe(styles['modal-content']);
		expect(wrapper.childAt(0).children().last().equals(<div>{content}</div>)).toBe(true); //
	};

	const header = wrapper => wrapper.children().childAt(0);

	test('No attributes', () => {
		const output = shallow(<Modal>{children}</Modal>); //
		const {expected, received} = collateClasses(output, [styles.closed, styles.modal]);
		expect(received).toEqual(expected);

		hasContent(output, children);

		const headerWrapper = header(output);
		expect(headerWrapper.is(ModalHeader)).toBe(true);
		expect(headerWrapper.prop('title')).toBeUndefined();
		expect(typeof headerWrapper.prop('closeHandler')).toBe('function');
	});

	test('Open at start', () => {
		const output = shallow(<Modal open={true}>{children}</Modal>); //
		const {expected, received} = collateClasses(output, [styles.open, styles.modal]);
		expect(received).toEqual(expected);
	});

	test('Title presented', () => {
		const title = 'title';
		const output = shallow(<Modal title={title}>{children}</Modal>); //
		expect(header(output).prop('title')).toBe(title);
	});

	test('No close function', () => {
		const output = shallow(<Modal close={false}>{children}</Modal>); //
		expect(header(output).prop('closeHandler')).toBe(false);
	});

	test('Defined close function', () => {
		const func = ()=>{};
		const output = shallow(<Modal close={func}>{children}</Modal>); //
		expect(header(output).prop('closeHandler')).toBe(func);
	});

	test('Defined fade function', done => {
		const func = () => {done();};
		const output = mount(<Modal fade={func}>{children}</Modal>); //
	});

	test('Fades closed', done => {
		const func = () => {
			const {expected, received} = collateClasses(output, [styles.closing, styles.transitioning, styles.open, styles.modal]);
			expect(received).toEqual(expected);
			done();
		};

		const output = mount(<Modal fade={func}>{children}</Modal>).childAt(0); // mount adds another enclosing wrapper that shallow does not
		const {expected, received} = collateClasses(output, [styles.open, styles.modal, styles.closing]);
		expect(received).toEqual(expected);
	});

	test('Fades open', done => {
		const func = () => {
			const {expected, received} = collateClasses(output, [styles.opening, styles.open, styles.modal]);
			expect(received).toEqual(expected);
			done();
		};

		const output = mount(<Modal open={true} fade={func}>{children}</Modal>).childAt(0); // mount adds another enclosing wrapper that shallow does not
		const {expected, received} = collateClasses(output, [styles.open, styles.modal, styles.opening, styles.transitioning]);
		expect(received).toEqual(expected);
	});

});