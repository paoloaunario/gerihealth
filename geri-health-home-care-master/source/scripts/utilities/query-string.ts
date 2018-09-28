export function getParameterByName(name: string, url = window.location.href) {
	const parameter = name.replace(/[\[\]]/g, '\\$&');

	const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
	const results = regex.exec(url);

	if (!results) {
		return null;
	}

	if (!results[2]) {
		return '';
	}

	try {
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	} catch (e) {
		return null;
	}
}
