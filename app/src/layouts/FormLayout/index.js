import React from 'react';

import { cancelEvent } from '../../common/common';
import Button from '../../elements/Button';

import styles from './FormLayout.module.scss';

function FormLayout({
	scrolling = false,
	onSubmit = cancelEvent,
	defaultButton = null,
	buttons = [],
	children
}) {

	if (defaultButton) {
		buttons = [{isDefault: true, ...defaultButton}, ...buttons];
	}

	const className = styles[scrolling ? "containerScrolling" : "container"];
	const buttonPanel = buttons.length ? (
		<div className={styles.buttons}>
			{
				buttons.map((button, index) => <span key={"button" + index}><Button {...button}/></span>)
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