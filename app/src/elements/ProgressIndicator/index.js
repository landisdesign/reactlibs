import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressIndicator.module.scss';

ProgressIndicator.propTypes = {
	/**
		The current number. If below 0, the bar will appear empty. If above max, the bar will appear full.
	 */
	current: PropTypes.number.isRequired,
	/**
		The maximum. If negative, the current number must also be negative, or the bar will appear to be empty.
	 */
	max: PropTypes.number.isRequired,
	/**
		A specific CSS width for the bar. If not specified, the bar will be as wide as its container, indented by .5rem on each side.
	 */
	width: PropTypes.string,
	/**
		Overrides the default background color of #FFF.
	 */
	backgroundColor: PropTypes.string,
	/**
		Overrides the default fill color of #369.
	 */
	fillColor: PropTypes.string
};

/**
	A progress bar, showing the percentage completion of a task
 */
function ProgressIndicator(props) {

	const buildBackground = ({current, max, backgroundColor = '#FFF', fillColor = '#369'}) => {
		const fraction = Math.round(1000 * current / max) / 10;
		if (fraction < .2) {
			return backgroundColor;
		}
		if (fraction > 99.8) {
			return fillColor;
		}
		return `linear-gradient(to right, ${fillColor} ${fraction - 0.1}%, ${backgroundColor} ${fraction + 0.1}%)`;
	};

	const { width = "calc(100% - 1rem)" } = props;

	const style = {
		width,
		background: buildBackground(props)
	};

	return (
		<div className={styles["progress-indicator"]} style={style}></div>
	);
}

export default ProgressIndicator;