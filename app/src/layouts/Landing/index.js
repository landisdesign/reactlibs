import React from 'react';

import Modal from '../Modal';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

const Landing = () => {


	return (
		<Modal>
			<Image/>
			<Title>MadLibs, React style</Title>
			<ProgressIndicator/>
			<Copyright/>
		</Modal>
	);

}

export default Landing;