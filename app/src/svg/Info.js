import React from 'react';

import Base from './';

import styles from './svg.module.scss';

function Info(props) {
	return (
		<Base {...props}>
			<path d="M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z"></path>
			<path d="M20 24h-8v-2h2v-6h-2v-2h6v8h2z"></path>
			<path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
		</Base>
	);
}

export default Info;