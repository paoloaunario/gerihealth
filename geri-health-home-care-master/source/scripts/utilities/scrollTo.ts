export function scrollTo(element: Node, scrollDuration = 500): void {
	let scrollToX = 0;
	let scrollCount = 0;

	if (element instanceof HTMLElement && typeof element.getBoundingClientRect === 'function') {
		scrollToX = window.pageYOffset + element.getBoundingClientRect().top;
	}

	const  cosParameter = (window.pageYOffset - scrollToX) / 2;
	let oldTimestamp = window.performance.now();

	function step(newTimestamp: any) {
		let tsDiff = newTimestamp - oldTimestamp;

		if (tsDiff > 100) {
			tsDiff = 30;
		}

		scrollCount += Math.PI / (scrollDuration / tsDiff);

		if (scrollCount >= Math.PI) {
			return;
		}

		const  moveStep = Math.round(scrollToX + cosParameter + cosParameter * Math.cos(scrollCount));
		window.scrollTo(0, moveStep);
		oldTimestamp = newTimestamp;
		window.requestAnimationFrame(step);
	}

	window.requestAnimationFrame(step);
}
