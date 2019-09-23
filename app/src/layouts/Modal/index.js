import React from 'react';

import Button from '../../elements/forms/Button';
import ButtonGroup from '../../elements/forms/ButtonGroup';

import ModalHeader from './ModalHeader';

const Modal = (props) => {

	const modalHeader = props.title ? <ModalHeader title={props.title}/> : '';
	const modalFooter = props.default ? <ButtonGroup><Button/></ButtonGroup> : '';

	return (
		<div>
		{ modalHeader }
		{ props.children }
		{ modalFooter }
		</div>
	);
}

export default Modal;