let draggedItem = null;

/**
 * Enables dragging behavior for a DOM node.
 *
 * @param {HTMLElement} node - The DOM node to enable dragging on.
 * @param {Object} options - The options for dragging behavior.
 * @param {any} options.item - The item associated with the DOM node.
 * @param {Function} options.onDrag - The callback function to be called when dragging occurs.
 * @returns {Object} - An object with a `destroy` method to remove the dragging behavior.
 */
export const drag = (node, { item, onDrag }) => {
	let x, y;
	let dragging = false;

	/**
	 * Handles the mouse down event.
	 *
	 * @param {MouseEvent} e - The mouse event.
	 * @param {number} e.clientX - The horizontal coordinate within the application's viewport.
	 * @param {number} e.clientY - The vertical coordinate within the application's viewport.
	 */
	function handleMouseDown({ clientX, clientY }) {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		x = clientX;
		y = clientY;
		draggedItem = item;
	}

	/**
	 * Handles the mouse move event.
	 *
	 * @param {MouseEvent} event - The mouse event.
	 * @param {number} event.clientX - The horizontal coordinate within the application's viewport.
	 * @param {number} event.clientY - The vertical coordinate within the application's viewport.
	 */
	function handleMouseMove({ clientX, clientY }) {
		if (!dragging && (Math.abs(clientX - x) > 5 || Math.abs(clientY - y) > 5)) {
			dragging = true;
		}

		node.setAttribute(
			'style',
			`
			transform: translate(${clientX - x}px, ${clientY - y}px);
			z-index: 10;
			cursor: grabbing;
			`
		);

		if (onDrag && typeof onDrag === 'function') {
			onDrag();
		}
	}

	/**
	 * Handles the mouse up event.
	 */
	function handleMouseUp() {
		dragging = false;

		node.setAttribute(
			'style',
			`
			transform: unset;
			z-index: unset;
			cursor: grab;
			`
		);

		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	node.addEventListener('mousedown', handleMouseDown);

	return {
		/**
		 * Removes the dragging behavior from the DOM node.
		 */
		destroy() {
			node.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}
	};
};

/**
 * Handles the drop action.
 *
 * @param {HTMLElement} node - The node to apply the action to.
 * @param {Object} options - The options for dragging behavior.
 * @param {String} options.colName - The name of the drop zone.
 * @param {Function} options.onDrop - The callback function to be called when an item is dropped.
 */
export const drop = (node, { colName, onDrop }) => {
	/**
	 * Handles the mouse move event.
	 *
	 * @param {MouseEvent} event - The mouse event.
	 * @param {number} event.clientX - The horizontal coordinate within the application's viewport.
	 * @param {number} event.clientY - The vertical coordinate within the application's viewport.
	 */
	function handleMouseUp({ clientX, clientY }) {
		const rect = node.getBoundingClientRect();
		const isDropInNode =
			clientX >= rect.left &&
			clientX <= rect.right &&
			clientY >= rect.top &&
			clientY <= rect.bottom;

		if (isDropInNode) {
			onDrop(colName, draggedItem);
			draggedItem = null;
		}
	}

	window.addEventListener('mouseup', handleMouseUp);

	return {
		/**
		 * Removes the drop action from the DOM node.
		 */
		destroy() {
			window.removeEventListener('mouseup', handleMouseUp);
		}
	};
};
