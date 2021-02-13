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

export const addUserToBetaList = (email, metaData) =>
	apiCall('/api/beta', {
		email,
		metaData
	})
