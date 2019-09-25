import React from 'react';
import styles from './Copyright.module.scss';

const Copyright = () => (
	<div className={styles.copyright}>
		Copyright &copy;{ ( new Date() ).getFullYear() } Michael Landis
	</div>
);

export default Copyright;