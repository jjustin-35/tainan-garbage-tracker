const EARTH_RADIUS = 6371; // 地球半徑（公里）

export const calculateBoundingBox = (lat: number, lon: number, distance: number) => {
	const latRadians = (lat * Math.PI) / 180;
	const lonRadians = (lon * Math.PI) / 180;
	const angularDistance = distance / EARTH_RADIUS;

	const minLat = latRadians - angularDistance;
	const maxLat = latRadians + angularDistance;

	const deltaLon = Math.asin(Math.sin(angularDistance) / Math.cos(latRadians));
	const minLon = lonRadians - deltaLon;
	const maxLon = lonRadians + deltaLon;

	return {
		minLat: (minLat * 180) / Math.PI,
		maxLat: (maxLat * 180) / Math.PI,
		minLon: (minLon * 180) / Math.PI,
		maxLon: (maxLon * 180) / Math.PI
	};
};
