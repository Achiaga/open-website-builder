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

export const sendEmailNotifiaction = (projectId, subscriberEmail) => {
  return apiCall('/api/notifications', {
    type: 'newSubscriberEmail',
    projectId,
    subscriberEmail,
  })
}

export const uploadWebsiteToS3 = (html, domain) => {
  return apiCall('/api/aws', { html, domain, key: 'website' })
}
export const uploadImageToS3 = (file, name, type, userId) => {
  return apiCall('/api/aws', { file, key: 'image', name, type, userId })
}
export const addDomain = (domain, projectId) => {
  return apiCall('/api/domain', { domain, projectId })
}
export const requestDomainStatus = (domain) => {
  return apiCall('/api/domain', { domain, key: 'check' })
}
export const requestSubDomainAvailability = (subdomain, projectId) => {
  return apiCall('/api/db', {
    data: { subdomain, projectId },
    type: 'subdomain-availability',
  })
}
