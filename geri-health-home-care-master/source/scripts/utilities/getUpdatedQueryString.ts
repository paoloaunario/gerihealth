﻿export default function getUpdatedQueryString(
	key: string,
	value: string | null,
	url?: string | null
) {
	if (!url) {
		url = window.location.href;
	}
	const re = new RegExp('([?&])' + key + '=.*?(&|#|$)(.*)', 'gi');

	if (re.test(url)) {
		if (typeof value !== 'undefined' && value !== null) {
			return url.replace(re, '$1' + key + '=' + value + '$2$3');
		} else {
			const hash = url.split('#');
			url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
			if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
				url += '#' + hash[1];
			}

			return url;
		}
	} else {
		if (typeof value !== 'undefined' && value !== null) {
			const separator = url.indexOf('?') !== -1 ? '&' : '?';
			const hash = url.split('#');
			url = hash[0] + separator + key + '=' + value;
			if (typeof hash[1] !== 'undefined' && hash[1] !== null) {
				url += '#' + hash[1];
			}

			return url;
		} else {
			return url;
		}
	}
}
