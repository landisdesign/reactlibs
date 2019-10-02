import React from 'react';
import { useSelector } from 'react-redux';

import Text from '../../elements/Text';

import FormLayout from '../../layouts/FormLayout';

function StoryPanel() {

	const story = useSelector(({ui: {output}}) => output);

	return story ? (
		<FormLayout scrolling={true}>
			<Text type="story" html={story}/>
		</FormLayout>
	) : null;
}

export default StoryPanel;