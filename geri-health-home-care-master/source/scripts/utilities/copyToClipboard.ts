export function copyToClipboard(text: string): boolean {
	// Internet Explorer specific
	if ((window as any).clipboardData && (window as any).clipboardData.setData) {
		return (window as any).clipboardData.setData('Text', text);
	}

	// all other modern
	const target = document.createElement('textarea');
	target.style.position = 'absolute';
	target.style.left = '-9999px';
	target.style.top = '0';
	target.textContent = text;
	document.body.appendChild(target);

	target.focus();
	target.setSelectionRange(0, target.value.length);

	// copy the selection of fall back to prompt
	try {
		document.execCommand('copy');
		target.remove();

		return true;
	} catch (e) {
		return false;
	}
}
