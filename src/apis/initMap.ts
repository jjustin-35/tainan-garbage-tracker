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
		if (!loader) {
			loader = new Loader({
				apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
				version: 'weekly'
				// libraries: ['places']
			});
		}

		const currentLocation = await getCurrentLocation();
		const { Map } = await loader.importLibrary('maps');
    const { AdvancedMarkerElement } = await loader.importLibrary('marker');

		if (!map) {
			map = new Map(mapElement, {
				center: {
					lat: currentLocation.latitude,
					lng: currentLocation.longitude
				}
			});
		}

    // functions
    const setMarkers = (props: Omit<google.maps.marker.AdvancedMarkerElementOptions, 'map'>) => {
      const marker = new AdvancedMarkerElement({
        map,
        ...props
      });

      return marker;
    };

		return { map, setMarkers };
	} catch (error) {
		console.error(error);
	}
};

export default initMap;
