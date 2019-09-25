import React from 'react';
import Select from 'react-select';

import EmailModal from '../EmailModal';
import StoryPanel from '../StoryPanel';
import WordsPanel from '../WordsPanel';

import Copyright from '../../elements/Copyright';
import Tab from '../../elements/Tab';
import Title from '../../elements/Title';

import Story from '../../layouts/Story';
import TabLayout from '../../layouts/TabLayout';

const Application = (props) => {
	return (
		<div>
			<Title>MadLibs, React style</Title>
			<Select/>
			<Story>
				<Title>{props.title || false}</Title>
				<TabLayout>
					<Tab>Words</Tab>
					<WordsPanel/>
					<Tab>Story</Tab>
					<StoryPanel/>
				</TabLayout>
			</Story>
			<Copyright/>
			<EmailModal/>
		</div>
	);
}

export default Application;