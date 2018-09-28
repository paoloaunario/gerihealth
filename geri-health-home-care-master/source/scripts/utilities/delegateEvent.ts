import toArray from './toArray';

export default function delegateEvent(
	ancestorSelectorStr: string,
	selectorStr: string,
	eventType: string,
	eventsDict: { [ket: string]: EventListener },
	callbackFn: (e: Event) => void
) {
	const elements = toArray<HTMLInputElement>(document.querySelectorAll(ancestorSelectorStr));

	elements.map((element) => {
		const handleEvent = (e: Event) => {
			const containsSelectorStr = element.querySelectorAll(selectorStr);
			const isMatching = containsSelectorStr
				? toArray<HTMLElement>(containsSelectorStr)
						.filter((el) => el.contains(e.target as HTMLElement))
						.pop()
				: false;
			if (isMatching) {
				callbackFn(e);
			}
		};

		if (eventsDict[`${selectorStr}-${eventType}`]) {
			element.removeEventListener(eventType, eventsDict[`${selectorStr}-${eventType}`]);
		}

		element.addEventListener(eventType, handleEvent);
		eventsDict[`${selectorStr}-${eventType}`] = handleEvent;
	});
}
