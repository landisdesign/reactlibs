import React from 'react';

import Modal from '../../layouts/Modal';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

function Landing() {

	return (
		<Modal open={true} fade={true} background="#FFF">
			<Image/>
			<Title>MadLibs, React style</Title>
			<ProgressIndicator current={15} max={100} width="80%" backgroundColor="#DEF" />
			<Copyright/>
		</Modal>
	);

}

export default Landing;