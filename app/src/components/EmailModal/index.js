import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { objectEquals } from '../../common/common';
import { setShowEMail } from '../../reducers/ui';

import Modal from '../../layouts/Modal';

import Text from '../../elements/Text';

/**
 *	Demonstration of the modal dialog. In a real application there would also be a form,
 *	validation and submission to the server.
 *
 *	All input values are managed by state.
 */
function EmailModal() {

	// fired when dialog is finished fading open to signal open completion
	function fadeOpenHandler() {
		dispatch(setShowEMail(true, false));
	}

	// fired when dialog is finished fading closed to signal close completion.
	function fadeCloseHandler() {
		dispatch(setShowEMail(false, false));
	}

	// fired when dialog needs to begin close transition
	function closeHandler() {
		dispatch(setShowEMail(false, true));
	}

	const dispatch = useDispatch();
	const {showEMail, transitionEMail} = useSelector(({ui: {showEMail, transitionEMail}}) => ({showEMail, transitionEMail}), objectEquals);

	let fade = transitionEMail && (showEMail ? fadeOpenHandler : fadeCloseHandler);

	return (
		<Modal title='Send link to story' fade={fade} open={showEMail} close={closeHandler}>
			<Text type='story'>
				In real life this would generate a link to an e-mail address you&rsquo;d enter. This is just a demonstration of a grid-based modal.
			</Text>
		</Modal>
	);
}

export default EmailModal;