import config from '$config';
import ApiPath from '$constants/apiPath';
import type { ApiResponse, CleaningPoint } from '$constants/types';
import { CleaningPointField } from '$constants/types';
import { calculateBoundingBox } from '$helpers/calculateBoundingBox';

export type CleanPointData = {
	help: string;
	success: boolean;
	result: {
		include_total: boolean;
		resource_id: string;
		fields: {
			type: string;
			id: string;
		}[];
		records_format: string;
		records: CleaningPoint[];
		_links: {
			start: string;
			next: string;
		};
		total: number;
	};
};

const getClearPoint = async ({
	limit,
	query,
	boundingSearch
}: {
	limit?: number;
	query?: string;
	boundingSearch?: {
		lat: number;
		lon: number;
		distance: number;
	};
} = {}) => {
	try {
		let url = `${config.TAINAN_API_URL}${ApiPath.GET_TAINAN_DATA}`;
		const params = new URLSearchParams({
			resource_id: config.TAINAN_API_ID
		});

		if (limit) {
			params.append('limit', limit.toString());
		}
		if (query) {
			params.append('q', query);
		}

		// 添加經緯度範圍查詢
		if (boundingSearch) {
			const boundingBox = calculateBoundingBox(
				boundingSearch.lat,
				boundingSearch.lon,
				boundingSearch.distance
			);
			params.append('filters', JSON.stringify({
				[CleaningPointField.LATITUDE]: {
					between: [boundingBox.minLat, boundingBox.maxLat]
				},
				[CleaningPointField.LONGITUDE]: {
					between: [boundingBox.minLon, boundingBox.maxLon]
				}
			}));
		}

		url += `?${params.toString()}`;

		const resp = await fetch(url);
		const data: ApiResponse<CleanPointData> = await resp.json();

		if (data.error) {
			console.error(data.error);
			return;
		}

		return data.result;
	} catch (error) {
		console.error(error);
	}
};

export default getClearPoint;
