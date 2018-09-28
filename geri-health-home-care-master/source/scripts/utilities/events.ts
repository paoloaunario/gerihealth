import { log } from './logger';

export function event(
	category: string,
	action: string,
	label?: string | null,
	value?: string | null,
	nonInteraction = false
): void {
	if (typeof (window as any).dataLayer !== 'undefined') {
		const eventX: any = {
			event: 'GAevent',
			eventAction: action,
			eventCategory: category,
			eventNoninteraction: nonInteraction
		};

		if (label && label !== '') {
			eventX.eventLabel = label;
		}

		if (value && value !== '') {
			eventX.eventValue = value;
		}

		(window as any).dataLayer.push(eventX);

		log('[events][event] Pushed GAevent:', category, action, label);
	} else if (typeof (window as any).ga !== 'undefined') {
		if (value && value !== '') {
			(window as any).ga('send', 'event', category, action, label, value);
		} else {
			(window as any).ga('send', 'event', category, action, label);
		}
	} else {
		log('[events][event] dataLayer variable not present. Events may not be recorded.');
	}
}

export function virtualPageView(url: string, pageTitle: string) {
	if (typeof (window as any).dataLayer !== 'undefined') {
		const eventX: any = {
			event: 'GAvirtualPageView',
			virtualPageTitle: pageTitle,
			virtualPageUrl: url
		};

		(window as any).dataLayer.push(eventX);

		log('[events][virtualPageView] Pushed VirtualPageView:', url, pageTitle);
	} else if (typeof (window as any).ga !== 'undefined') {
		(window as any).ga('send', 'pageview', url, pageTitle);
	} else {
		log(
			'[events][virtualPageView] dataLayer variable not present. Virtual page views may not be recorded.'
		);
	}
}
