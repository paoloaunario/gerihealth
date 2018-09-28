import { removeAccents } from './removeAccents';

export function toSlug(text: string) {
	let str = removeAccents(text);

	str = str.toLowerCase();

	// Remove invalid characters
	str = str.replace(/[^a-z0-9\s-]/, '');

	// Convert multiple spaces into one space
	str = str.replace(/\s+/, ' ').trim();

	// Hyphens
	str = str.replace('/s/', '-');

	return str;
}
