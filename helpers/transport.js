const errorHandling = async (response) => {
  const jsonResponse = await response.json()
  let { status, statusText } = response
  if (jsonResponse && jsonResponse.err) statusText = jsonResponse.err
  switch (status) {
    case 500:
      throw { error: { status, statusText } }
    case 404:
      throw { error: { status, statusText } }
    default:
      return jsonResponse
  }
}

export const apiCall = async (path, body) => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...body,
    }),
  })
  const JsonResponse = await errorHandling(response)
  return await JsonResponse
}

export async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    })
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}
