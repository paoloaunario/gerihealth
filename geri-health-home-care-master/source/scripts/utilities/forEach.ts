export default function forEach<T extends Node>(
	list: NodeListOf<T> | null,
	callback: (node: T, index?: number) => void,
	scope = this
) {
	if (list) {
		for (let i = 0; i < list.length; i++) {
			callback.call(scope, list[i], i);
		}
	}
}
