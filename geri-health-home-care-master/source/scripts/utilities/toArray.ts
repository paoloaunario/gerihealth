/**
 * Converts any array-like object into an array
 * @param obj Array-like object
 * @returns Object converted into array
 */
export default function toArray<T>(obj: NodeListOf<Element>): T[] {
	return Array.prototype.slice.call(obj);
}
