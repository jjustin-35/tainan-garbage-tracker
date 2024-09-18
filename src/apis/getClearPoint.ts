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
	queries,
	boundingSearch
}: {
	limit?: number;
	queries?: Partial<Record<CleaningPointField, string>>;
	boundingSearch?: {
		lat: number;
		lon: number;
		distance: number;
	};
} = {}) => {
	try {
		let url = `${config.TAINAN_API_URL}${ApiPath.GET_TAINAN_DATA_SQL}`;
		let sqlQuery = `SELECT * FROM "${config.TAINAN_API_ID}"`;
		const whereConditions = [];

		if (boundingSearch) {
			const boundingBox = calculateBoundingBox(
				boundingSearch.lat,
				boundingSearch.lon,
				boundingSearch.distance
			);
			whereConditions.push(
				`"${CleaningPointField.LATITUDE}" BETWEEN ${boundingBox.minLat} AND ${boundingBox.maxLat}`
			);
			whereConditions.push(
				`"${CleaningPointField.LONGITUDE}" BETWEEN ${boundingBox.minLon} AND ${boundingBox.maxLon}`
			);
		}

		if (queries) {
			for (const [key, value] of Object.entries(queries)) {
				whereConditions.push(`"${key}" LIKE '%${value}%'`);
			}
		}

		if (whereConditions.length > 0) {
			sqlQuery += ` WHERE ${whereConditions.join(' AND ')}`;
		}

		if (limit) {
			sqlQuery += ` LIMIT ${limit}`;
		}

		url += `?sql=${sqlQuery}`;

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
