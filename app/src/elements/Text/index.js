import React from 'react';
import PropTypes from 'prop-types';

import styles from './Text.module.scss';

Text.propTypes = {
	/**
	 *	Defines a presentation style other than the default sans-serif. Currently
	 *	the only available alternate style is "story". Any other value returns to
	 *	the default.
	 */
	type: PropTypes.string,
	/**
	 *	If provided, overrides any provided children with the HTML in this field.
	 *	THIS FIELD IS INHERENTLY UNSAFE. Be sure to sanitize any HTML before
	 *	allowing it.
	 */
	html: PropTypes.string
};

/**
 *	Wrap the provided content with a particular styling.
 */
function Text({type, html, children}) {
	const style = type in styles ? styles[type] : styles.default;

	return html ? <div className={style} dangerouslySetInnerHTML={{__html: html}}></div> : <div className={style}>{children}</div>;
}

export default Text;