import { apiCall } from '../helpers/transport';

export const request = async (type, data) => {
	return await apiCall('/api/jexia', {
		type: type,
		data,
	});
};
