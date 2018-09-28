/**
 * @overview Utilities for creating and using forms.
 */

const BUTTON_DISABLED_CLASSNAME = 'button--disabled';
const FLOATING_LABEL_INVALID_CLASSNAME = 'floating-label--invalid';
const HELP_TEXT_HIDDEN_CLASSNAME = 'help-text--hidden';
const TEXT_INPUT_INVALID_CLASSNAME = 'text-input--invalid';

export function disableButton(button: Element) {
	button.classList.add(BUTTON_DISABLED_CLASSNAME);

	if (button instanceof HTMLButtonElement) {
		button.disabled = true;
	}
}

export function disableHelpText(input: Element, selector: string) {
	const helpText = input.parentElement!.querySelector(selector);

	if (helpText) {
		helpText.classList.add(HELP_TEXT_HIDDEN_CLASSNAME);
		helpText.setAttribute('aria-hidden', 'true');
	}
}

export function enableButton(button: Element) {
	button.classList.remove(BUTTON_DISABLED_CLASSNAME);

	if (button instanceof HTMLButtonElement) {
		button.disabled = false;
	}
}

export function enableHelpText(input: Element, selector: string) {
	const helpText = input.parentElement!.querySelector(selector);

	if (helpText) {
		helpText.classList.remove(HELP_TEXT_HIDDEN_CLASSNAME);
		helpText.setAttribute('aria-hidden', 'false');
	}
}

export function getAssociatedControl(element: Element) {
	const controlId = element.getAttribute('aria-controls');

	if (controlId) {
		return document.getElementById(controlId);
	}

	return null;
}

export function getLabel(input: Element) {
	const labelId = input.getAttribute('aria-labelledby');

	if (labelId) {
		return document.getElementById(labelId);
	}

	return null;
}

export function validateInput(input: HTMLInputElement | HTMLSelectElement, forceValidation = false) {
	disableHelpText(input, '[data-alert-required]');
	disableHelpText(input, '[data-alert-invalid]');

	if (input.checkValidity()) {
		input.classList.remove(TEXT_INPUT_INVALID_CLASSNAME);
		input.setAttribute('aria-invalid', 'false');

		const label = getLabel(input);

		if (label) {
			label.classList.remove(FLOATING_LABEL_INVALID_CLASSNAME);
		}

		return true;
	} else {
		input.classList.add(TEXT_INPUT_INVALID_CLASSNAME);
		input.setAttribute('aria-invalid', 'true');

		const label = getLabel(input);

		if (label) {
			label.classList.add(FLOATING_LABEL_INVALID_CLASSNAME);
		}

		if (input.required && input.value === '') {
			enableHelpText(input, '[data-alert-required]');
		} else {
			enableHelpText(input, '[data-alert-invalid]');
		}

		return false;
	}
}

// This function is the same as the one above but it displays or hides validation messages
// based on custom functionality.  The "isValid" parameter indicates whether the value is valid.

export function validateInputCustom(input: HTMLInputElement | HTMLSelectElement, isValid: boolean, className: string) {
	disableHelpText(input, '[data-alert-required]');
	disableHelpText(input, '[data-alert-invalid]');
	disableHelpText(input, className);

	if (isValid) {
		input.classList.remove(className);
		input.setAttribute('aria-invalid', 'false');

		const label = getLabel(input);

		if (label) {
			label.classList.remove(FLOATING_LABEL_INVALID_CLASSNAME);
		}

		return true;
	} else {
		input.classList.add(className);
		input.setAttribute('aria-invalid', 'true');

		const label = getLabel(input);

		if (label) {
			label.classList.add(FLOATING_LABEL_INVALID_CLASSNAME);
		}

		enableHelpText(input, className);

		return false;
	}
}
