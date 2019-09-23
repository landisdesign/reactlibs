import React from 'react';

import Button from '../../elements/forms/Button';
import ButtonGroup from '../../elements/forms/ButtonGroup';

import TabPanel from '../../elements/TabPanel';
import Text from '../../elements/Text';

const StoryPanel = (props) => {
	return props.result ? (
		<TabPanel>
			<Text type='story'>{ props.result }</Text>
			<ButtonGroup>
				<Button/>
				<Button/>
			</ButtonGroup>
		</TabPanel>
	) :
	null;
}

export default StoryPanel;