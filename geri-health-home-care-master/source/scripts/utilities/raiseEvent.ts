export default function raiseEvent(eventName: string) {
	const event = document.createEvent(`Event`);
	event.initEvent(eventName, true, true);
	document.dispatchEvent(event);
}
