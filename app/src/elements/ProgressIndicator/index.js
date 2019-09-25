import React from 'react';
import PropTypes from 'prop-types';

const ProgressIndicator = (props) => {
	return (
		<div>
		</div>
	);
}

ProgressIndicator.propTypes = {
	current: PropTypes.number.isRequired,
	maximum: PropTypes.number.isRequired,
	containerColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	fillColor: PropTypes.string
};

export default ProgressIndicator;