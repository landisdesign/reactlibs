import React from 'react';

import Modal from '../../layouts/Modal';

import InputRow from '../../elements/forms/InputRow';

import Text from '../../elements/Text';

const EmailModal = (props) => {

	const confirmed = false;

	return null && confirmed ? (
		<Modal title='Send link to story' default='Close'>
			<Text type="story">
				Your story has been sent to {props.email}.
			</Text>
		</Modal>
	) : (
		<Modal title='Send link to story' default='Send e-mail'>
			<Text type='story'>
				When this form is sent to the server, in real life it would generate a link to the e-mail below. This is just a demonstration of e-mail validation, form submission, and confirmation.
			</Text>
			<InputRow type='email' name='email' value='' label='E-mail address'/>
		</Modal>
	);
}

export default EmailModal;