import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {buildClassNames, chooseList, sleep} from '../../common/common.js';

import ButtonGroup from '../../elements/forms/ButtonGroup';
import ModalHeader from './ModalHeader';

import styles from './Modal.module.scss';

Modal.propTypes = {
	/**
		Whether or not modal should be open when rendered. Closed (false) by default.
	 */
	open: PropTypes.bool,
	/**
		Defines the fade behavior for how the modal is rendered. By default there is no fade effect and the modal is simply visible or not based upon the "open" property.

		If set to {true}, the modal will fade into the state provided by "open". If "open" is {true}, the modal will appear to fade into visibility. If "open" is {false}, it will fade out and disappear.

		If set to a function, the modal will fade, but once the fade completes, the function will be called, with the value of "open" passed as the only argument.
	 */
	fade:  PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func
	]),
	/**
		A string representing the CSS 'background' property for the modal mask. By default the mask is 65% black.
	 */
	background: PropTypes.string,
	/**
		The text to appear in the modal's title bar. If not provided, and no close handler is requested, the title bar won't appear.
	 */
	title: PropTypes.string,
	/**
		Defines close behavior of modal. By default, closing the modal will cause it to fade out, then rapidly fade the mask behind it.

		If populated with {false}, the modal cannot be closed by itself, and will only be closed by changing its properties.

		If populated with an event handler, it will be called whenever the modal should close (by pressing the Escape key or clicking a button that doesn't have a defined handler). If you want the default behavior after your close handler is complete, rerender the dialog, with open set to {false} and fade set to {true}.
	 */
	close: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.func
	])
};

/**
	A simple modal using a grid instead of vertical alignment for positioning the modal content.
 */
function Modal({open = false, fade = false, close = true, background, title, children}) {

	async function fadeModal(div, toOpen, fade) {
		// Open class required to provide display grid (display cannot be transitioned)
		const transitionClassNames = buildClassNames(styles, chooseList(toOpen, ["opening", "transitioning"], ["closing"], ["modal", "open"]));
		const completionClassNames = buildClassNames(styles, chooseList(toOpen, ["opening"], ["closing", "transitioning"], ["modal", "open"]));

		div.className = transitionClassNames;
		await sleep(1);
		div.className = completionClassNames;
		if (typeof fade === "function") {
			await sleep(toOpen ? 600 : 650);
			fade(toOpen);
		}
	};

	function defaultCloseHandler(e) {
		e.stopPropagation();
		fadeModal(modalDiv, false);
		closed = true;
	}

	function modalKeyHandler(e) {
		switch (e.key) {
			case 'Escape':
				if (closeHandler && modalDiv && !closed) {
					closeHandler(e);
				}
		}
	}

	useEffect(() => {
		document.addEventListener("keyup", modalKeyHandler);
		return () => {
			document.removeEventListener("keyup", modalKeyHandler);
		};
	})

	let
		modalDiv = null,
		closed = !open,
		closeHandler = close
	;

	if (closeHandler) {
		if (typeof closeHandler != "function") {
			closeHandler = defaultCloseHandler;
		}
	}

	const initialClassNames = buildClassNames(styles, chooseList(open ? !fade : fade, ["open"], ["closed"], ["modal"]));
 
	return (
		<div className={initialClassNames} style={ {background} } ref={div => {modalDiv = div; if (div && fade) fadeModal(div, open, fade);} }>
			<div className={styles["modal-content"]}>
				<ModalHeader title={title} closeHandler={closeHandler}/>
				<div>
					{ children }
				</div>
			</div>
		</div>
	);
}

export default Modal;