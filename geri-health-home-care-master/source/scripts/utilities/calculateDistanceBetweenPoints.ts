import toRadians from './toRadians';

export default function calculateDistanceBetweenPoints(
	from: { lat: number; lng: number },
	to: { lat: number; lng: number }
) {
	const R = 6371; // Radius of the earth in km
	const dLat = toRadians(to.lat - from.lat); // toRadians below
	const dLon = toRadians(to.lng - from.lng);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(from.lat)) *
			Math.cos(toRadians(to.lat)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c; // Distance in km

	return d;
}
