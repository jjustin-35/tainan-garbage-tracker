import config from '$config';
import ApiPath from '$constants/apiPath';
import type { ApiResponse, CleaningPoint } from '$constants/types';

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

const getClearPoint = async ({ limit, query }: { limit?: number; query?: string } = {}) => {
	try {
		let url = `${config.TAINAN_API_URL}${ApiPath.GET_TAINAN_DATA}?resource_id=${config.TAINAN_API_ID}`;
		if (limit || query) {
			url += `${limit ? `&limit=${limit}` : ''}${query ? `&${query}` : ''}`;
		}
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
