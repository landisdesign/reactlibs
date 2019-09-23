import React from 'react';

import WordRow from '../WordRow';

import Button from '../../elements/forms/Button';
import ButtonGroup from '../../elements/forms/ButtonGroup';

import TabPanel from '../../elements/TabPanel';
import Text from '../../elements/Text';

const WordsPanel = (props) => {

	const story = props.story;

	return story ? (
		<TabPanel>
			{
				story.fields.map( (field, index) => WordRow() )
			}
			<ButtonGroup>
				<Button/>
				<Button/>
				<Button/>
			</ButtonGroup>
		</TabPanel>
	) : (
		<TabPanel>
			<Text type="intro">
				Welcome to MadLibs, React Style. Pick a story from the choices in the menu above, or choose &ldquo;Pick a random story&rdquo; to choose a story blindly. Enter words for the fields, then click &ldquo;Create&rdquo; to see the results.
			</Text>
		</TabPanel>
	);
}

export default WordsPanel;