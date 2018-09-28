let index = 1;

/**
 * Logs message to the console.
 */
export function log(...data: any[]) {
	// We will only log if the console exists. All modern browsers have it,
	// but there is a bug in IE8 where referencing the console
	// will error out if the developer tools haven't been opened.
	// Once they are opened and then even closed the console object will exist.
	if (typeof console !== 'undefined') {
		const msg = `[${index++}]`;

		if ((window as any).Tokens && (window as any).Tokens.DEBUG) {
			if (data.length === 1 && typeof data[0] === 'string') {
				console.log(`${msg} ${data[0]}`);
			} else {
				console.log(msg, data);
			}
		}
	}
}

/**
 * Logs message to the console.
 */
export function error(...data: any[]) {
	if (typeof console !== 'undefined') {
		const msg = `[${index++}]`;

		if ((window as any).Tokens && (window as any).Tokens.DEBUG) {
			if (data.length === 1 && typeof data[0] === 'string') {
				console.log(`${msg} ${data[0]}`);
			} else {
				console.log(msg, data);
			}
		}
	}
}
