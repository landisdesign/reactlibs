import React from 'react';
import PropTypes from 'prop-types';

import styles from './Title.module.scss';

Title.propTypes = {
	/**
	 *	If set to {true}, removes all vertical margins and padding
	 */
	packed: PropTypes.bool
};

/**
 *	Present the enclosed content as a title.
 */
function Title({packed = false, children}) {
	return <h1 className={styles[packed ? "title-packed" : "title"] }>{children}</h1>;
}

export default Title;