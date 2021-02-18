const errorHandling = async (response) => {
	const jsonResponse = await response.json()
	let { status, statusText } = response
	if (jsonResponse && jsonResponse.err) statusText = jsonResponse.err
	switch (status) {
		case 500:
			throw { error: { status, statusText } }
		default:
			return jsonResponse
	}
}

const apiCall = async (path, body) => {
	const response = await fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			...body
		})
	})
	const JsonResponse = await errorHandling(response)
	return await JsonResponse
}

export const addUserToBetaList = (email, metaData) => {
	return apiCall('/api/beta', {
		type: 'save',
		email,
		metaData: {
			...metaData,
			origin: document.referrer,
			browser: window.platform.name,
			windowHeight: window.screen.height,
			windowWidth: window.screen.width
		}
	})
}
export const getAllUsers = () =>
	apiCall('/api/beta', {
		type: 'list'
	})
