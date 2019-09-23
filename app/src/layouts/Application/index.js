import React from 'react';
import Select from 'react-select';

import Story from '../Story';
import TabLayout from '../TabLayout';

import EmailModal from '../../components/EmailModal';
import StoryPanel from '../../components/StoryPanel';
import WordsPanel from '../../components/WordsPanel';

import Copyright from '../../elements/Copyright';
import Tab from '../../elements/Tab';
import Title from '../../elements/Title';

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