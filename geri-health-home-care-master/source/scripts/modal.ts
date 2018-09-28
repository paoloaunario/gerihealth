import forEach from './utilities/forEach';

const BUTTON_SELECTOR = '[data-modal-button]';
const MODAL_ACTIVE_CLASSNAME = 'modal--active';

function main() {
	const modalButtons = document.querySelectorAll(BUTTON_SELECTOR);

	forEach (modalButtons, (modalButton) => {
		if (modalButton instanceof HTMLButtonElement) {
			modalButton.addEventListener('click', onClickEvent);
		}
	});

	window.addEventListener('click', onOffCanvasClickEvent);
}

/**
 * On click event.
 */
function onClickEvent(e: MouseEvent) {
	const button = e.currentTarget;
	const body = document.querySelector('body')!;

	if (button instanceof HTMLButtonElement) {
		const modalSelector = button.getAttribute('aria-controls');

		if (modalSelector) {
			const modal = document.getElementById(modalSelector);

			if (modal) {
				displayModal(modal, body);
				onEndScroll(modal);
			}
		}
	}
}

/**
 * Display current modal.
 */
function displayModal(
	modal: HTMLElement,
	body: HTMLElement
) {
	if (modal.classList.contains(MODAL_ACTIVE_CLASSNAME)) {
		modal.classList.remove(MODAL_ACTIVE_CLASSNAME);

		if (body.hasAttribute('style')) {
			body.removeAttribute('style');
		}
	} else {
		modal.classList.add(MODAL_ACTIVE_CLASSNAME);

		if (!body.hasAttribute('style')) {
			body.setAttribute('style', 'overflow: hidden');
		}
	}
}

/**
 * Remove fade effect when user reaches bottom of content-container.
 */
function onEndScroll(
	modal: HTMLElement,
	modalScrollHiddenClassname = 'modal__content-container--hidden'
) {
	const modalContent = modal.querySelector('.modal__content');

	if (modalContent) {
		modalContent.addEventListener('scroll', () => {
			const height = parseInt(window.getComputedStyle(modalContent, null).height!, 10);

			if (modalContent.scrollTop + height === modalContent.scrollHeight) {
				modalContent.parentElement!.classList.add(modalScrollHiddenClassname);
			} else {
				modalContent.parentElement!.classList.remove(modalScrollHiddenClassname);
			}
		});
	}
}

/**
 * Initiate event when user clicks outside of modal.
 */
function onOffCanvasClickEvent(
	e: MouseEvent
) {
	const body = document.querySelector('body')!;

	if (e.target instanceof HTMLElement) {
		if (e.target.parentElement) {
			if (!e.target.closest(MODAL_ACTIVE_CLASSNAME)) {
				if (e.target.classList.contains(MODAL_ACTIVE_CLASSNAME)) {
					e.target.classList.remove(MODAL_ACTIVE_CLASSNAME);

					if (body.hasAttribute('style')) {
						body.removeAttribute('style');
					}
				}
			}
		}
	}
}

main();
