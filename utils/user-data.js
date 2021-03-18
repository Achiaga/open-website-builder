import { apiCall } from '../helpers/transport'

export const request = (type, data) => {
	return apiCall('http://localhost:3000/api/jexia', {
		type: type,
		data
	})
}

export const publishResume = (data) => {
	return request('save', data)
}
export const getResumeById = (id) => {
	return request('read-resume', id)
}
export const getUserDataById = (id) => {
	return request('read-user', id)
}
