import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setShowEMail } from '../../reducers/ui';

import Text from '../../elements/Text';

import FormLayout from '../../layouts/FormLayout';

/**
 *	Presents the story when created, along with a button open the demo e-mail dialog.
 */
function StoryPanel() {

	function openDialog() {
		dispatch(setShowEMail(true, true));
	}

	const dispatch = useDispatch();
	const story = useSelector(({ui: {output}}) => output);

	const button = [
		{
			content: 'E-mail to a friend',
			disabled: !story,
			onClick: openDialog
		}
	];

	return story ? (
		<FormLayout scrolling={true} buttons={button}>
			<Text type="story" html={story}/>
		</FormLayout>
	) : null;
}

export default StoryPanel;