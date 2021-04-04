import { apiCall } from '../helpers/transport'

export const request = (type, data) => {
  return apiCall('/api/db', {
    type: type,
    data,
  })
}

export const saveWebsite = (data) => {
  try {
    return request('save', data)
  } catch (err) {
    console.error('publishResume', err)
  }
}
export const getResumeById = (id) => {
  return request('read-website', id)
}
export const getUserDataById = (id) => {
  try {
    return request('read-user', id)
  } catch (err) {
    console.error('getUserDataById', err)
  }
}
