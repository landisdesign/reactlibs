import React from 'react';

import styles from './Title.module.scss';

/**
	Present the enclosed content as a title.
 */
function Title({children}) {
	return <h1 className={styles.title}>{children}</h1>;
}

export default Title;