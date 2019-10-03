import React from 'react';
import styles from './Copyright.module.scss';

/**
 *	Presents the copyright line
 */
function Copyright() {
	return (
		<div className={styles.copyright}>
			Copyright &copy;{ ( new Date() ).getFullYear() } Michael Landis
		</div>
	);
}

export default Copyright;