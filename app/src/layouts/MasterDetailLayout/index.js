import React from 'react';
import PropTypes from 'prop-types';

import styles from './MasterDetailLayout.module.scss';

MasterDetailLayout.propTypes = {
	children: (props, propName, componentName) => {

		const children = props[propName];
		const hasChildren = {
			"MasterPanel" : false,
			"DetailPanel" : false
		};
		let error = null;
		React.Children.forEach(children, child => {
			if (error) return; // only return first error

			if (typeof child === "string") {
				error = new Error(`HTML and text must be contained within the <MasterPanel/> or <DetailPanel/> inside a ${componentName}.`);
			}
			else {
				const childName = child.type.name;

				if (!childName) { // HTML
					error = new Error(`HTML and text must be contained within the MasterPanel or DetailPanel of a ${componentName}.`);
				}
				else if (!(childName in hasChildren)) {
					error = new Error(`${childName} is not a valid child of ${componentName}.`);
				}
				else {
					if (hasChildren[childName]) {
						error = new Error(`There can only be one ${childName} inside each ${componentName}.`);
					}
					else {
						hasChildren[childName] = true;
					}
				}
			}
		});
		if (!error) {
			if (!Object.values(hasChildren).every(x=>x)) {
				error = new Error(`${componentName} must have exactly one MasterPanel and one DetailPanel.`);
			}
		}
		return error;
	}
};

function MasterDetailLayout({ masterLabel, detailLabel, highlightDetail = false, highlightDetailCallback, children}) {

	function switchControl(e) {
		const clickedTab = e.target;

		if (clickedTab.className === styles.currentTab) {
			return; // it's a one-liner, but a premature exit deserves more emphasis than one line.
		}

		if (highlightDetailCallback) {
			highlightDetailCallback(clickedTab.nextElementSibling == null);
			return;
		}

		// define tabs and panels in [master, detail] order
		const tabs = clickedTab.previousElementSibling ? 
			[clickedTab.previousElementSibling, clickedTab] :
			[clickedTab, clickedTab.nextElementSibling]; // Since there's only two tabs, I don't want to deal with nodelists
		// We hard-code the tab order, but not the panel order. Need to determine order by className, but not using querySelector in case there are nested layouts.
		const panels = (tab => {
			const firstPanel = tab.parentElement.parentElement.nextElementSibling.firstElementChild;
			return [firstPanel, firstPanel.nextElementSibling].sort((a, b) => (a.className.indexOf(styles.detailPanel) === -1 ? -1 : 1));
		})(clickedTab);
		const panelStyles = [ styles.masterPanel, styles.detailPanel ];

		tabs.forEach((tab, index) => {
			if (tab === clickedTab) {
				tab.className = styles.currentTab;
				panels[index].className = panelStyles[index] + ' ' + styles.currentPanel;
			}
			else {
				tab.className = styles.tab;
				panels[index].className = panelStyles[index];
			}
		});
	}

	return (
		<div className={styles.container}>
			<div className={styles.tabHolder}>
				<ul className={styles.tabs}>
					<li className={highlightDetail ? styles.tab: styles.currentTab} onClick={switchControl}>{masterLabel}</li>
					<li className={highlightDetail ? styles.currentTab: styles.tab} onClick={switchControl}>{detailLabel}</li>
				</ul>
			</div>
			<div className={styles.panelHolder}>
				{children}
			</div>
		</div>
	);
}

function MasterPanel({children, highlightDetail = false}) {
	return (
		<div className={styles.masterPanel + (highlightDetail ? '' : ' ' + styles.currentPanel)}>
			{children}
		</div>
	);
}

function DetailPanel({children, highlightDetail = false}) {
	return (
		<div className={styles.detailPanel + (highlightDetail ? ' ' + styles.currentPanel : '')}>
			{children}
		</div>
	);
}

export {MasterPanel, DetailPanel};
export default MasterDetailLayout;