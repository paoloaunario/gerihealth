import toArray from './toArray';

export default function getEventTarget(e: Event, selectorStr: string) {
	const target = e.target as HTMLElement;
	const elements = toArray<HTMLElement>(document.querySelectorAll(selectorStr)!);
	const clickedElement = elements.filter((locationEl) => locationEl.contains(target)).pop();

	return clickedElement;
}
