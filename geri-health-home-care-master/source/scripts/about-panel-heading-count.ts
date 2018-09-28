const ABOUT_PANEL_SELECTOR = '.about-panel';
const ABOUT_PANEL_HEADER_SELECTOR = '[data-topic-header]';

function main() {
	const aboutPanel = document.querySelector(ABOUT_PANEL_SELECTOR);

	if (aboutPanel) {
		const headers = aboutPanel.querySelectorAll(ABOUT_PANEL_HEADER_SELECTOR);

		for (let i = 0; i < headers.length; i++) {
			const headingNumberString = '0' + (i + 1);
			headers[i].appendChild(document.createElement('span'));
			headers[i].querySelector('span')!.innerHTML = (headingNumberString).toString();
		}
	}
}

main();
