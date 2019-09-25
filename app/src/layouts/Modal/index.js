import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {buildClassNames, chooseList, sleep} from '../../common/common.js';

import ButtonGroup from '../../elements/forms/ButtonGroup';
import ModalHeader from './ModalHeader';

import styles from './Modal.module.scss';

Modal.propTypes = {
	/**
		Whether or not modal should be open on initial render. Closed (false) by default.
	 */
	open: PropTypes.bool,
	/**
		Whether or not modal should fade in or out into that initial render. Does not fade (false) by default.
	 */
	fade: PropTypes.bool,
	/**
		A string representing the CSS 'background' property for the modal mask. By default the mask is 65% black.
	 */
	background: PropTypes.string,
	/**
		The text to appear in the modal's title bar. If not provided, and no close handler is requested, the title bar won't appear.
	 */
	title: PropTypes.string,
	/**
		If provided, a default button to appear at the bottom of the modal. It is displayed with a different style from the other buttons, and Enter will cause its action to fire.

		The provided object has the following properties:

		* content: The content to appear on the face of the button
		* action: The event handler to capture clicks or Enter, or {false} to disable the button. If not provided, it will close the modal
	 */
	defaultButton: PropTypes.shape({
		content: PropTypes.string.isRequired,
		action: PropTypes.func
	}),
	/**
		If provided, an array of buttons that will be presented, right to left, to the left of the default button (if it is defined). None of the buttons are attached to the keyboard, other than by tabbing.

		The objects in the provided array has the following properties:

		* content: The content to appear on the face of the button
		* action: The event handler to capture clicks, or {false} to disable the button. If not provided, it will close the modal.
	 */
	otherButtons: PropTypes.arrayOf(PropTypes.shape({
		content: PropTypes.string.isRequired,
		action: PropTypes.func
	})),
	/**
		Defines close behavior of modal. By default, closing the modal will cause it to fade out, then rapidly fade the mask behind it.

		If populated with {false}, the modal cannot be closed by itself, and will only be closed by changing its states.

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
function Modal(props) {

	async function fadeModal(div, toOpen) {
		// Open class required to provide display grid (display cannot be transitioned)
		const transitionClassNames = buildClassNames(styles, chooseList(toOpen, ["opening", "transitioning"], ["closing"], ["modal", "open"]));
		const completionClassNames = buildClassNames(styles, chooseList(toOpen, ["opening"], ["closing", "transitioning"], ["modal", "open"]));

		div.className = transitionClassNames;
		await sleep(1);
		div.className = completionClassNames;
	};

	function buildFooter(defaultButton, otherButtons, closeHandler) {
		const normalizeButton = button => ({...button, action: ("action" in button) ? button.action : closeHandler});

		if (defaultButton || otherButtons) {
			const normalizedDefaultButton = defaultButton && normalizeButton(defaultButton);
			const normalizedOtherButtons = otherButtons && otherButtons.map(normalizeButton);
			return <ButtonGroup defaultButton={normalizedDefaultButton} otherButtons={normalizedOtherButtons}/>;
		}
		else {
			return null;
		}
	}

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

	const {
		open = false,
		fade = false,
		background,
		title,
		defaultButton,
		otherButtons,
		close, 
		children
	} = props;

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
	const modalFooter = buildFooter(defaultButton, otherButtons, closeHandler);
 
	return (
		<div className={initialClassNames} style={ {background} } ref={div => {modalDiv = div; if (div && fade) fadeModal(div, open);} }>
			<div className={styles["modal-content"]}>
				<ModalHeader title={title} closeHandler={closeHandler}/>
				{ children }
				{ modalFooter }
			</div>
		</div>
	);
}

export default Modal;