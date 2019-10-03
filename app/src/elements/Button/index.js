import React from 'react';
import PropTypes from 'prop-types';
import { maskObject } from '../../common/common';

import styles from './Button.module.scss';

Button.propTypes = {
	className: PropTypes.string,
	isSubmit: PropTypes.bool,
	isDefault: PropTypes.bool,
	name: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.object,
	title: PropTypes.string,
	value: PropTypes.string
};

const objectMask = {
	name: true,
	onClick: true,
	style: true,
	title: true,
	value: true,
	disabled: true
};

function Button(props) {
	// Performing destructuring here instead of in the arguments to be able to collect the rest of props later
	const {
		isDefault = false,
		isSubmit = false,
		className = '',
		content = '',
		children = <>{content}</>
	} = props;
	const type = isSubmit ? "submit" : "button";

	const buttonProps = {
		className: (className && className + ' ') + (isDefault ? styles.default : styles.button),
		type,
		...maskObject(props, objectMask)
	};
	return <button {...buttonProps}>{children}</button>;
}

export default Button;