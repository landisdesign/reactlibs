import React from 'react';

import Modal from '../Modal';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

function Landing() {

	return (
		<Modal open={true} fade={true} close={true} title="Test">
			<Image/>
			<Title>MadLibs, React style</Title>
			<ProgressIndicator/>
			<Copyright/>
		</Modal>
	);

}

export default Landing;