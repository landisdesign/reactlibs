import React from 'react';

import Close from '../../svg/Close';

import styles from './ModalHeader.module.scss';

const ModalHeader = (props) => {
	const {title, closeHandler} = props;

	if (title || closeHandler) {
		return (
			<h1 className={styles.modalHeader}>
					<span>{title}</span>
					{closeHandler ? <span className={styles.close} onClick={closeHandler}><Close actionable={true}/></span> : null }
			</h1>
		);
	}
	else {
		return null;
	}
}

export default ModalHeader;