/**
 * Fetch a querystring parameter's value by key.
 * @param key Key to retrieve from the querystring
 * @param [url] Optional URL parameter if not reading off current querystring
 * @param [noReplace] Optional parameter used when we don't want to replace a "+" sign in query string with a space
 * @returns Parameter's value
 */
export default function getQueryStringParameter(
	key: string,
	url?: string | null,
	noReplace?: boolean
) {
	url = url || location.search; // If no URL passed in then grab location.search off querystring
	key = key.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

	const regex = new RegExp(`[\\?&]${key}=([^&#]*)`, 'i');
	const results = regex.exec(url);

	const parameter = results === null ? null : decodeURIComponent(results[1]);

	if (noReplace) {
		return parameter;
	}

	return parameter !== null ? parameter.replace(/\+/g, ' ') : parameter;
}
