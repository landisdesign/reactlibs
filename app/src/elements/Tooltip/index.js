import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import styles from './Tooltip.module.scss';

Tooltip.propTypes = {
	/**
	 *	The HTML content that appears in the tooltip
	 */
	content: PropTypes.string.isRequired,
	/**
	 *	The content that triggers the tooltip display when hovering
	 */
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]),
	/**
	 *	The ID that matches the tooltip to the children that highlight the tooltip.
	 */
	id: PropTypes.string.isRequired
};

/**
 *	Creates a tooltip for the provided children.
 */
function Tooltip({content, id, children}) {
	return (<>
		<span data-tip data-for={id}>{children}</span>
		<ReactTooltip className={styles.content} id={id} type='info' effect='solid' html={true}>{content}</ReactTooltip>
	</>);
}

export default Tooltip;