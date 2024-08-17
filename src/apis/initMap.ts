import * as pkg from '@googlemaps/js-api-loader';
const { Loader } = pkg;

let loader: pkg.Loader;
let map: google.maps.Map;

const getCurrentLocation = async () => {
	const geolocation = await new Promise<GeolocationPosition>((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});

	return geolocation.coords;
};

const initMap = async () => {
	const mapElement = document.getElementById('map');

	if (!mapElement) {
		return;
	}

	try {
		loader = new Loader({
			apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
			version: 'weekly',
			libraries: ['geocoding']
		});

		const currentLocation = await getCurrentLocation();
		const { Map } = await loader.importLibrary('maps');
		const { AdvancedMarkerElement } = await loader.importLibrary('marker');
		const { Geocoder } = await loader.importLibrary('geocoding');

		map = new Map(mapElement, {
			center: {
				lat: currentLocation.latitude,
				lng: currentLocation.longitude
			},
			zoom: 15,
			disableDefaultUI: true,
			mapId: import.meta.env.VITE_GOOGLE_MAPS_ID
		});
		const geocoder = new Geocoder();

		const setMarkers = (props: Omit<google.maps.marker.AdvancedMarkerElementOptions, 'map'>) => {
			const marker = new AdvancedMarkerElement({
				map,
				...props
			});

			return marker;
		};

		const getAddress = async (location: { lat: number, lng: number }) => {
			const response = await geocoder.geocode({ location  });
			return response.results[0];
		};

		setMarkers({
			position: { lat: currentLocation.latitude, lng: currentLocation.longitude }
		});

		return { map, currentLocation, setMarkers, getAddress };
	} catch (error) {
		console.error(error);
	}
};

export default initMap;
