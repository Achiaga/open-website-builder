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

export const addUserToBetaList = (email, userType) => {
  return apiCall('/api/beta', {
    type: userType,
    email,
  })
}
export const getAllUsers = () =>
  apiCall('/api/beta', {
    type: 'list',
  })

async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json())
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}
export const getSessionData = (session_id, user) =>
  fetchPostJSON(`/api/checkout_sessions/${session_id}`, {
    user,
  })
