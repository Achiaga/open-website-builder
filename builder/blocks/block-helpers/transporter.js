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

export const sendEmailNotifiaction = (websiteId, subscriberEmail) => {
  return apiCall('/api/notifications', {
    type: 'newSubscriberEmail',
    websiteId,
    subscriberEmail,
  })
}

export const uploadFileToS3 = (html) => {
  console.log('uploadFileToS3', html)
  return apiCall('/api/aws', { html })
}
export const testDomains = () => {
  return apiCall('/api/domain')
}
