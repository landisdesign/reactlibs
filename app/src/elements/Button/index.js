import React from 'react';
import PropTypes from 'prop-types';
import { maskObject } from '../../common/common';

import styles from './Button.module.scss';

Button.propTypes = {
	/**
	 *	Additional className to add in addition to the classes providing default styling
	 */
	className: PropTypes.string,
	/**
	 *	Whether or not the button is a submit button or a standard one {true} allows it to submit the form.
	 */
	isSubmit: PropTypes.bool,
	/**
	 *	When set to {true}, provides the "default button" colored styling instead of the standard grey
	 */
	isDefault: PropTypes.bool,
	/**
	 *	The button name. If provided, becomes the name field for the button.
	 */
	name: PropTypes.string,
	/**
	 *	If provided, the onClick handler for the button. The button can be retrieved
	 *	from the handler via e.target.
	 */
	onClick: PropTypes.func,
	/**
	 *	If provided, any addition styling, in standard React style object format
	 */
	style: PropTypes.object,
	/**
	 *	If provided, the title for the button.
	 */
	title: PropTypes.string,
	/**
	 *	The button value. If provided, becomes the value field for the button.
	 */
	value: PropTypes.string
};

/**
 *	Creates a button with standardized styling.
 */
function Button(props) {
	// Performing destructuring here instead of in the arguments to be able to collect the rest of props later
	const {
		isDefault = false,
		isSubmit = false,
		className = '',
		content = '',
		children = <>{content}</>
	} = props;

	// I want to restrict the properties passed into the HTML button tag to the following, along with the constructed className and type below.
	const objectMask = {
		name: true,
		onClick: true,
		style: true,
		title: true,
		value: true,
		disabled: true
	};

	const buttonProps = {
		className: (className && className + ' ') + (isDefault ? styles.default : styles.button),
		type: isSubmit ? "submit" : "button",
		...maskObject(props, objectMask)
	};
	return <button {...buttonProps}>{children}</button>;
}

export default Button;