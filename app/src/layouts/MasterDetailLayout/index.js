import React from 'react';

import styles from './MasterDetailLayout.module.scss';

function MasterPanel(props) {
	return (
		<div className={styles.masterPanel}>
			{props.children}
		</div>
	);
}

function DetailPanel(props) {
	return (
		<div className={styles.detailPanel}>
			{props.children}
		</div>
	);
}

function MasterDetailLayout(props) {

	let masterTabRef = null;
	let detailTabRef = null;

	let tabs = "", tabList = "";

	if (props.masterLabel) {
		tabs = <li ref={masterTabRef} className={styles.tab}>{props.masterLabel}</li>;
	}
	if (props.masterLabel) {
		tabs = <>{tabs} <li ref={detailTabRef} className={styles.tab}>{props.detailLabel}</li></>;
	}
	if (tabs !== "") {
		tabs = <div className={styles.tabHolder}><ul className={styles.tabs}>{tabs}</ul></div>;
	}

	return (
		<div className={styles.container}>
			{tabs}
			<div className={styles.panelHolder}>
				{props.children}
			</div>
		</div>
	);
}

export {MasterPanel, DetailPanel};
export default MasterDetailLayout;