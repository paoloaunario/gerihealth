/**
 * @fileOverview header-nav.ts
 * @description Toggle header nav in mobile.
 */

const HEADER_NAV_SELECTOR = 'header';
const HEADER_NAV_BUTTON_SELECTOR = '#button-nav';
const HEADER_NAV_BUTTON_ACTIVE_CLASSNAME = 'header__button--active';
const HEADER_NAV_ACTIVE_CLASSNAME = 'header__nav--active';
const HEADER_NAV_LIST_SELECTOR = '.nav__list';
const HEADER_NAV_LIST_ACTIVE_CLASSNAME = 'nav__list--active';
const MOBILE_LOGO_SELECTOR = '#mobile-logo';
const MAIN_SELECTOR = '.main';

const navButton = document.querySelector(HEADER_NAV_BUTTON_SELECTOR);

export function main() {
	if (navButton) {
		navButton.addEventListener('click', onClickEvent);
		window.addEventListener('click', onOffCanvasClickEvent);
	}

	// Move main section based on header height
	window.onresize = () => setPositions();
	hideLogoOnScroll();
}

/**
 * Hide logo when user scrolls down
 */
function hideLogoOnScroll() {
	const logoHeight = parseFloat(window.getComputedStyle(document.querySelector(MOBILE_LOGO_SELECTOR)!).height!);
	const header = document.querySelector(HEADER_NAV_SELECTOR)!;
	const lastScrollTop = 0;
	let didScroll: boolean;

	window.onscroll = () => {
		didScroll = true;

		if (didScroll) {
			if (window.screen.width < 960) {
				hasScrolled(lastScrollTop, logoHeight, header);
				didScroll = false;
			}
		}
	};
}

function hasScrolled(
	lastScrollTop: number,
	logoHeight: number,
	header: HTMLElement
) {
	const st = window.scrollY;

	if (st > lastScrollTop) {
		header.style.top = '-' + logoHeight + 'px';
	} else {
		header.removeAttribute('style');
	}

	lastScrollTop = st;
}

/**
 * Initiate event when user clicks outside of header.
 */
function onOffCanvasClickEvent(
	e: MouseEvent
) {
	if (e.target instanceof HTMLElement) {
		if (e.target.parentElement) {
			if (!e.target.closest(HEADER_NAV_SELECTOR)) {
				if (navButton instanceof HTMLButtonElement) {
					onOffCanvasClickFunction(navButton);
				}
			}
		}
	}
}

/**
 * When button gets clicked.
 */
function onClickEvent(
	e: MouseEvent
) {
	e.preventDefault();

	const button = e.currentTarget;

	if (button instanceof HTMLButtonElement) {
		toggleButton(button);
		toggleNav(button);
	}
}

/**
 * Toggle navigation active classes.
 */
function toggleNav(
	button: HTMLButtonElement,
) {
	const navSelector = button.getAttribute('aria-controls');

	if (navSelector) {
		const nav = document.getElementById(navSelector);

		if (nav) {
			const navList = nav.querySelector(HEADER_NAV_LIST_SELECTOR);

			if (navList instanceof HTMLElement) {

				if (nav.classList.contains(HEADER_NAV_ACTIVE_CLASSNAME)) {
					nav.classList.remove(HEADER_NAV_ACTIVE_CLASSNAME);

					if (nav.contains(navList)) {
						// Remove
						navList.classList.remove(HEADER_NAV_LIST_ACTIVE_CLASSNAME);
					}

					toggleNavAriaControls(nav);
				} else {
					nav.classList.add(HEADER_NAV_ACTIVE_CLASSNAME);

					if (nav.contains(navList)) {
						navList.classList.add(HEADER_NAV_LIST_ACTIVE_CLASSNAME);
					}

					toggleNavAriaControls(nav);
				}
			}
		}
	}
}

/**
 * Toggle button classname.
 */
function toggleButton(
	button: HTMLButtonElement
) {
	if (button.classList.contains(HEADER_NAV_BUTTON_ACTIVE_CLASSNAME)) {
		button.classList.remove(HEADER_NAV_BUTTON_ACTIVE_CLASSNAME);
	} else {
		button.classList.add(HEADER_NAV_BUTTON_ACTIVE_CLASSNAME);
	}
}

/**
 * Toggle nav aria-hidden attribute.
 */
function toggleNavAriaControls(
	nav: HTMLElement
) {
	if (nav.getAttribute('aria-hidden') === 'false'
		|| nav.getAttribute('aria-hidden') === '') {
		nav.setAttribute('aria-hidden', 'true');
	} else {
		nav.setAttribute('aria-hidden', 'false');
	}
}

/**
 * Close nav on off canvas click
 */
function onOffCanvasClickFunction(
	button: HTMLButtonElement
) {
	const navSelector = button.getAttribute('aria-controls');

	if (navSelector) {
		const nav = document.getElementById(navSelector);

		if (nav) {
			if (nav.classList.contains(HEADER_NAV_ACTIVE_CLASSNAME)) {
				nav.classList.remove(HEADER_NAV_ACTIVE_CLASSNAME);

				toggleNavAriaControls(nav);
			}
		}
	}

	if (button.classList.contains(HEADER_NAV_BUTTON_ACTIVE_CLASSNAME)) {
		button.classList.remove(HEADER_NAV_BUTTON_ACTIVE_CLASSNAME);
	}
}

/**
 * Calculate header height.
 */
function getHeaderHeight() {
	const header = document.querySelector('.header');

	if (header instanceof HTMLElement) {
		return parseFloat(window.getComputedStyle(header).height!);
	}
}

/**
 * Add top margin to main element based on header height. MOBILE ONLY
 */
function setMainPosition(headerHeight: number) {
	const mainEl = document.querySelector(MAIN_SELECTOR);

	if (mainEl) {
		if (window.screen.width < 960) {
			mainEl.setAttribute('style', `margin-top: ${headerHeight}px`);
		} else {
			mainEl.removeAttribute('style');
		}
	}
}

/**
 * Set nav__list position based on header height.
 * @param navList HTMLElement
 */
function setNavListPosition(headerHeight: number) {
	const navList = document.querySelector(HEADER_NAV_LIST_SELECTOR);

	if (navList) {
		if (window.screen.width < 960) {
			navList.setAttribute('style', `top: ${headerHeight}px`);
		} else {
			navList.removeAttribute('style');
		}
	}
}

function setPositions() {
	const headerHeight = getHeaderHeight();

	if (headerHeight) {
		setMainPosition(headerHeight);
		setNavListPosition(headerHeight);
	}
}

hideLogoOnScroll();
setPositions();
main();
