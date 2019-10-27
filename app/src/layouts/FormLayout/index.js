import React from 'react';
import PropTypes from 'prop-types';

import { cancelEvent } from '../../common/common';
import Button from '../../elements/Button';

import styles from './FormLayout.module.scss';

FormLayout.propTypes = {
	/**
	 *	If set to {true}, allows the contents of the form to scroll.
	 */
	scrolling: PropTypes.bool,
	/**
	 *	The function called when the form is submitted. If not provided, the form
	 *	will not be submitted. (This assumes that forms should not be submitting
	 *	outside of AJAX.)
	 */
	onSubmit: PropTypes.func,
	/**
	 *	The contents of the form itself, not including the buttons that should
	 *	appear at the bottom.
	 */
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]),
	/**
	 *	The default button. It will appear to the far right with default styling.
	 */
	defaultButton: PropTypes.exact(Button.propTypes),
	/**
	 *	Any additional buttons, presented from right to left. The most destructive
	 *	actions should be last in the array, to be presented away from the default
	 *	button.
	 */
	buttons: PropTypes.arrayOf(PropTypes.exact(Button.propTypes))
};

/**
 *	A scrollable form. If buttons are provided, they will be presented at the bottom
 *	of the form. If the form is supposed to scroll, It should be in a container whose
 *	size can be known beforehand in some way, otherwise it will collapse.
 */
function FormLayout({ scrolling = false, onSubmit = cancelEvent, defaultButton = null, buttons = [], children }) {

	if (defaultButton) {
		buttons = [{isDefault: true, ...defaultButton}, ...buttons];
	}

	const className = styles[scrolling ? 'containerScrolling' : 'container'];

	const buttonPanel = buttons.length ? (
		<div className={styles.buttons}>
			{
				buttons.map((button, index) => <span key={'button' + index}><Button {...button}/></span>)
			}
		</div>
	) : null;
				
	const fields = scrolling ? <div className={styles.scroller}>{children}</div> : children;

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={className}>
				<div className={styles.fields}>
					{fields}
				</div>
				{buttonPanel}
			</div>
		</form>
	);
}

export default FormLayout;