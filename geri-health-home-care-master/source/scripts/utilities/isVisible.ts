import { debounce } from './debounce';

/**
 * Determine if an element is within a viewport.
 * @param element
 */
export function isElementInViewport(element: HTMLElement) {
	try {
		const windowTop = window.scrollY;
		const windowBottom = windowTop + window.innerHeight;
		const elementTop = element.getBoundingClientRect().top + windowTop;
		const elementBottom = elementTop + element.offsetHeight;

		return elementBottom <= windowBottom && elementTop >= windowTop;
	} catch (e) {
		return false;
	}
}

/**
 * Run a afterScrollCallback once an element is within a viewport once.
 * @param element
 * @param afterScrollCallback
 */
export function isElementInViewportAfterScroll(
	element: HTMLElement,
	afterScrollCallback: () => void
) {
	const debouncedScrolllCallback = debounce(() => {
		if (isElementInViewport(element)) {
			afterScrollCallback();
		}
	}, 100);

	window.addEventListener('scroll', debouncedScrolllCallback);
}
