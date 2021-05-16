import { batch } from 'react-redux'
import _ from 'lodash'
import templates from '../templates'
import {
  setInitialBuilderData,
  setUserData,
  AUTH0_CUSTOM_CLAIM_PATH,
  setAccountCreated,
  setTempDBData,
  setLoadingData,
} from './builderSlice'
import { getUserDataFromLS } from './helper'
import { saveData } from '../login/helpers'
import { getUserDataById } from '../utils/user-data'

async function getUserData(user) {
  try {
    const userData = await getUserDataById(user.sub)
    if (!Object.keys(userData).length) return null
    return userData
  } catch (err) {
    console.error('error con getUserData', err)
    const blocksData = await getUserDataFromLS()
    return {
      resume_data: blocksData,
    }
  }
}

function arrayToObject(arr) {
  if (!Array.isArray(arr)) return arr
  return arr.reduce((acc, item) => ({ ...acc, [item.i]: item }), {})
}

export const loadInitialDataNoAccount = (template) => async (dispatch) => {
  const LSData = await getUserDataFromLS()
  const templateData = templates[template]
  const data = templateData || LSData || templates.fallback
  dispatch(setInitialBuilderData(data))
}
export const updateInitialState =
  ({ resume_data, publish, userData }) =>
  async (dispatch) => {
    batch(() => {
      dispatch(setInitialBuilderData(resume_data || templates.fallback))
      dispatch(setUserData({ isPublish: publish, ...userData }))
    })
  }

const isLogin = (user) => {
  const userMetadata = user[AUTH0_CUSTOM_CLAIM_PATH]
  if (!userMetadata.logins_counts > 1) return true
  return new Date() - new Date(userMetadata.createdAt) > 2 * 60 * 1000
}

const handleSingup = (user) => async (dispatch) => {
  const builderData = await getUserDataFromLS()
  const { resume_data, user_id, user_email, publish, _id } = await saveData({
    user,
    builderData,
  })
  const userData = { user_email, user_id, websiteId: _id }
  dispatch(updateInitialState({ resume_data, publish, userData }))
  dispatch(setAccountCreated(true))
}

export const loadDataFromDB = (user, template) => async (dispatch) => {
  dispatch(setLoadingData(true))
  const dbData = await getUserData(user, template)
  const { resume_data, publish, _id, domain, subdomain } = dbData || {}
  const userData = {
    user_email: user.email,
    user_id: user.sub,
    domain,
    subdomain,
  }
  if (templates[template] && resume_data) {
    batch(() => {
      dispatch(
        setTempDBData({ resume_data, publish, userData, domain, subdomain })
      )
      dispatch(loadInitialDataNoAccount(template))
    })
    return
  }
  if (!resume_data) {
    batch(() => {
      dispatch(loadInitialDataNoAccount(template))
      dispatch(setUserData(userData))
    })
  } else {
    userData['websiteId'] = _id
    dispatch(updateInitialState({ resume_data, publish, userData, domain }))
  }
  dispatch(setLoadingData(false))
}

export function normalizeBuilderData(data) {
  const normalizedData = {
    ...data,
    layouts: arrayToObject(data.layouts),
    mobileLayout: arrayToObject(data.mobileLayout),
  }
  return normalizedData
}

export const handleLoginCallbackLoadData = (user) => async (dispatch) => {
  const [dbData, LSData] = await Promise.all([
    getUserData(user),
    getUserDataFromLS(),
  ])
  if (!dbData) return dispatch(loadInitialDataNoAccount())
  const { resume_data, user_id, user_email, publish, _id } = dbData || {}
  const userData = { user_email, user_id, websiteId: _id }
  if (!_.isEqual(LSData, resume_data)) {
    dispatch(setTempDBData({ resume_data, publish, userData }))
    dispatch(loadInitialDataNoAccount())
    return
  }
  dispatch(updateInitialState({ resume_data, publish, userData }))
}

export const handleLoginCallback = (user) => async (dispatch) => {
  if (isLogin(user)) {
    return dispatch(handleLoginCallbackLoadData(user))
  }
  //If the it is not login is singup and we handle thate here
  return dispatch(handleSingup(user))
}
