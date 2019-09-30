import React from 'react';

import styles from './Title.module.scss';

/**
	Present the enclosed content as a title.
 */
function Title({packed = false, children}) {
	return <h1 className={styles[packed ? "title-packed" : "title"] }>{children}</h1>;
}

export default Title;