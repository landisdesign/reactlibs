import React from 'react';
import PropTypes from 'prop-types';

import styles from './MasterDetailLayout.module.scss';

MasterDetailLayout.propTypes = {
	/**
	 *	The text to appear in the tab for the master panel in small devices
	 */
	masterLabel: PropTypes.string.isRequired,

	/**
	 *	The text to appear in the tab for the detail panel in small devices
	 */
	detailLabel: PropTypes.string.isRequired,

	/**
	 *	Set to {true} if the details tab should appear highlighed by default in phone
	 *	media instead of the master tab.
	 */
	highlightDetail: PropTypes.bool,

	/**
	 *	By default, clicking a tab will show that panel. If this is provided, clicking
	 *	a tab will call this function instead, with a boolean argument set to {true}
	 *	if the detail panel should be presented. This is intended to be used to trigger
	 *	state changes in the application components, which would then redraw the panels
	 *	by sending the argument through 'highlightDetails'.
	 */
	highlightDetailCallback: PropTypes.func,

	/**
	 *	MasterDetailLayout must have two child elements, a MasterPanel and a DetailPanel.
	 *	No HTML or content can appear outside those panels.
	 */
	children: (props, propName, componentName) => {

		const children = props[propName];
		const hasChildren = {
			'MasterPanel' : false,
			'DetailPanel' : false
		};
		let error = null;
		React.Children.forEach(children, child => {
			if (error) return; // only return first error

			if (typeof child === 'string') {
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

/**
 *	A layout that shows two panels side by side, or as tabs in phone media. The Master
 *	panel is displayed first, with the larger Detail panel to its right on tablets and
 *	desktops.

 *	MasterDetailPanels must have only two direct children, a single MasterPanel and a
 *	single DetailPanel, available as non-default exports in this module.
 */
function MasterDetailLayout({ masterLabel, detailLabel, highlightDetail = false, highlightDetailCallback, children }) {

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
			// eslint-disable-next-line no-unused-vars
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

// I'm including MasterPanel and DetailPanel in this same file because they're simple dependent children that will always be used with MasterDetailLayout

MasterPanel.propTypes = {
	/**
	 *	The contents to appear in the MasterPanel
	 */
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]),
	/**
	 *	If set to {true}, the MasterPanel will be hidden by default in phone media.
	 */
	highlightDetail: PropTypes.bool
};

/**
 *	The MasterPanel to appear in a MasterDetailLayout component
 */
function MasterPanel({children, highlightDetail = false}) {
	return (
		<div className={styles.masterPanel + (highlightDetail ? '' : ' ' + styles.currentPanel)}>
			{children}
		</div>
	);
}

DetailPanel.propTypes = {
	/**
	 *	The contents to appear in the DetailPanel
	 */
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]),
	/**
	 *	If set to {true}, the DetailPanel will be shown by default in phone media.
	 */
	highlightDetail: PropTypes.bool
};

/**
 *	The DetailPanel to appear in a MasterDetailLayout component
 */
function DetailPanel({children, highlightDetail = false}) {
	return (
		<div className={styles.detailPanel + (highlightDetail ? ' ' + styles.currentPanel : '')}>
			{children}
		</div>
	);
}

export {MasterPanel, DetailPanel};
export default MasterDetailLayout;