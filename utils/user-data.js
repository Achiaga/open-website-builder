import { apiCall } from '../helpers/transport'

export const request = (type, data) => {
  return apiCall('/api/db', {
    type: type,
    data,
  })
}

export const requestSaveWebsite = (data) => {
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
export const getUserDataByProjectId = (projectId) => {
  try {
    return request('read-project', projectId)
  } catch (err) {
    console.error('getUserDataByProjectId', err)
  }
}
export const requestUserProjects = (userId) => {
  try {
    return request('read-user-projects', userId)
  } catch (err) {
    console.error('requestUser', err)
  }
}
export const requestRemoveProject = (projectId) => {
  try {
    return request('remove-project', projectId)
  } catch (err) {
    console.error('removeProject', err)
  }
}
