import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { objectEquals } from '../../common/common';
import { setShowEMail } from '../../reducers/ui';

import Modal from '../../layouts/Modal';

import Text from '../../elements/Text';

function EmailModal() {

	const dispatch = useDispatch();
	const {showEMail, transitionEMail} = useSelector(({ui: {showEMail, transitionEMail}}) => ({showEMail, transitionEMail}), objectEquals);

	function fadeOpenHandler() {
		dispatch(setShowEMail(true, false));
	}

	function fadeCloseHandler() {
		dispatch(setShowEMail(false, false));
	}

	function closeHandler() {
		dispatch(setShowEMail(false, true));
	}

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