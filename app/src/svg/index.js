import React from 'react';

import styles from './svg.module.scss';

function Base(props) {
	const {
		viewBox = '0 0 32 32',
		actionable,
		className = styles.icon
	} = props;
	const svgProps = {
		...props,
		viewBox,
		className: (className + (actionable ? ' ' + styles.actionable : '') )
	};
	delete svgProps.children;
	delete svgProps.actionable;

	return (
		<svg {...svgProps}>
			{props.children}
		</svg>
	);
}

export default Base;