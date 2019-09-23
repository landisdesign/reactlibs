import React from 'react';

import InputLabel from '../InputLabel';
import TextInput from '../TextInput';

const InputRow = (props) => {

	const helpContent = props.help || '';
	const extraContent = props.extra || '';

	return (
		<div>
			<div><InputLabel/> { helpContent }</div>
			<div><TextInput/> { extraContent }</div>
		</div>
	);
}

export default InputRow;