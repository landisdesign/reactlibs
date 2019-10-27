import React from 'react';
import { shallow, render } from 'enzyme';

import FormLayout from './';

import Button from '../../elements/Button';

import styles from './FormLayout.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<FormLayout/>', () => {

	// Manually adding these to styles to prevent attempts to test invalid class names
	[
		'form',
		'container',
		'containerScrolling',
		'fields',
		'scroller',
		'buttons',
		'button',
		'default'
	].forEach(className => styles[className] = className);

	test('display default container', () => {
		const children = "children";
		const output = render(<FormLayout>{children}</FormLayout>); //
		const onSubmit = output.find('form').first().prop("onSubmit");
		const expected = render(
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.container}>
					<div className={styles.fields}>
						{children}
					</div>
				</div>
			</form>
		); //

		expect(output).toEqual(expected);
	});

	test('display scrolling container', () => {
		const children = "children";
		const output = render(<FormLayout scrolling={true}>{children}</FormLayout>); //
		const onSubmit = output.find('form').first().prop("onSubmit");
		const expected = render(
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.containerScrolling}>
					<div className={styles.fields}>
						<div className={styles.scroller}>
							{children}
						</div>
					</div>
				</div>
			</form>
		); //

		expect(output).toEqual(expected);
	});

	test('provide buttons', () => {
		const children = "children";
		// The buttons are rudimentary at best, because the actual button functionality isn't being tested.
		const defaultButton = {
			content: "Default",
			isSubmit: true
		};
		const otherButtons = [
			{
				content: "a"
			},
			{
				content: "b"
			}
		];
		const output = render(<FormLayout defaultButton={defaultButton} buttons={otherButtons}>{children}</FormLayout>); //
		const onSubmit = output.find('form').first().prop("onSubmit");
		const expected = render(
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.container}>
					<div className={styles.fields}>
						{children}
					</div>
					<div className={styles.buttons}>
						<span key="button-0"><Button {...defaultButton} isDefault={true} /></span>
						<span key="button-1"><Button {...otherButtons[0]} /></span>
						<span key="button-2"><Button {...otherButtons[1]} /></span>
					</div>
				</div>
			</form>
		); //

		expect(output).toEqual(expected);
	});

	test('provide independent submit function', () => {
		const submit = jest.fn(()=>false);

		const children = "children";
		const defaultButton = {
			content: "Default",
			isSubmit: true
		}
		const output = shallow(<FormLayout onSubmit={submit} defaultButton={defaultButton}>{children}</FormLayout>); //
		expect(output.find('form').prop('onSubmit')).toEqual(submit);
	})
});