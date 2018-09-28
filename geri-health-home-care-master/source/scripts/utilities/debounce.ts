export function debounce(func: () => void, wait = 100, immediate = false) {
	let timeout: number | null;

	return function() {
		const args = arguments;

		const later = function() {
			timeout = null;

			if (!immediate) {
				func.apply(this, args);
			}
		};

		const callNow = immediate && !timeout;

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(later.bind(this), wait);

		if (callNow) {
			func.apply(this, args);
		}
	};
}

/**
 * Debounce any resize callback on the window.
 * @param func
 * @param wait
 * @param immediate
 */
export function onResize(func: () => void, wait = 100, immediate = false) {
	const onResizeX = debounce(func, wait, immediate);

	window.addEventListener('resize', onResizeX);
}
