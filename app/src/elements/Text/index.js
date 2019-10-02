import React from 'react';

import styles from './Text.module.scss';


function Text({type, html, children}) {
	const style = styles[type] || styles.default;

	return html ? <div className={style} dangerouslySetInnerHTML={{__html: html}}></div> : <div className={style}>{children}</div>;
}

export default Text;