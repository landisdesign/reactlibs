import React from 'react';
import { shallow } from 'enzyme';

import ModalHeader from './ModalHeader';
import Close from '../../svg/Close';
import styles from './ModalHeader.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<ModalHeader/>', () => {
	
	styles.modalHeader = "modalHeader";
	styles.close = "close";

	test('No attributes', () => {
		const output = shallow(<ModalHeader/>); //
		expect(output.isEmptyRender()).toBe(true);
	});

	test('Close box only', () => {
		const func = ()=>{};
		const output = shallow(<ModalHeader closeHandler={func}/>); //
		const expected = <h1 className={styles.modalHeader}><span></span><span className={styles.close} onClick={func}><Close actionable={true}/></span></h1>; //
		expect(output.equals(expected)).toBe(true);
	});

	test('Title only', () => {
		const title="Text";
		const output = shallow(<ModalHeader title={title}/>); //
		const expected = <h1 className={styles.modalHeader}><span>{title}</span></h1>; //
		expect(output.equals(expected)).toBe(true);
	});

	test('Close box and', () => {
		const title="Text";
		const func = ()=>{};
		const output = shallow(<ModalHeader title={title} closeHandler={func}/>); //
		const expected = <h1 className={styles.modalHeader}><span>{title}</span><span className={styles.close} onClick={func}><Close actionable={true}/></span></h1>; //
		expect(output.equals(expected)).toBe(true);
	});

});