import React from 'react';
import PropTypes from 'prop-types';

import styles from './Image.module.scss';

Image.propTypes = {
	/**
		The required URL of the image resource to present. 
	 */
	src: PropTypes.string.isRequired,
	/**
		The alignment of the image. Currently the only possible value is "center", which centers it horizontally and adds a rem of top and bottom margin. All other values, or no value, renders it as a standard inline image element.
	 */
	align: PropTypes.string
};

/**
 *	Present an <img/> from the provided URL.
 */
function Image({src, align, alt = ''}) {

	const style = align === "center" ? styles.center : null;

	return <img className={style} src={src} alt={alt} />;
}

export default Image;