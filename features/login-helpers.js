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
  saveData,
  saveDataOnLocal,
} from './builderSlice'
import { getUserDataFromLS } from './helper'
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
  batch(() => {
    dispatch(saveDataOnLocal(data))
    dispatch(setInitialBuilderData(data))
  })
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

const handleSignup = () => async (dispatch) => {
  // const builderData = await getUserDataFromLS()
  dispatch(saveData())
  // const userData = { user_email, userId: user_id, projectId: _id, publish }
  // dispatch(updateInitialState({ resume_data, publish, userData }))
  dispatch(setAccountCreated(true))
}

export const loadDataFromDB = (user, template) => async (dispatch) => {
  dispatch(setLoadingData(true))
  const dbData = await getUserData(user, template)
  const { resume_data, publish, _id, domain, subdomain } = dbData || {}
  const userData = {
    userEmail: user.email,
    userId: user.sub,
    domain,
    subdomain,
    projectId: _id,
    publish,
  }
  if (!resume_data) {
    batch(() => {
      dispatch(loadInitialDataNoAccount(template))
      dispatch(setUserData(userData))
    })
  } else if (templates[template] && resume_data) {
    batch(() => {
      dispatch(setTempDBData({ resume_data }))
      dispatch(loadInitialDataNoAccount(template))
      dispatch(setUserData(userData))
    })
  } else {
    batch(() => {
      dispatch(updateInitialState({ resume_data }))
      dispatch(setUserData(userData))
    })
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

function isFallbackTemplate(LSData) {
  return LSData?.blocks[
    'text-7748f2a1-dd59-4599-9bee-7e109c71984c'
  ]?.data?.text?.includes(
    '<h3><strong style="color: rgb(11, 110, 153);">Welcome to your website!</strong></h3>'
  )
}

export const handleLoginCallbackLoadData = (user) => async (dispatch) => {
  const [dbData, LSData] = await Promise.all([
    getUserData(user),
    getUserDataFromLS(),
  ])
  if (!dbData) return dispatch(loadInitialDataNoAccount())
  const { resume_data, user_id, user_email, publish, _id, subdomain, domain } =
    dbData || {}
  const userData = {
    user_email,
    userId: user_id,
    projectId: _id,
    subdomain,
    domain,
    publish,
  }
  console.log({ LSData, resume_data })
  if (!_.isEqual(LSData, resume_data) && !isFallbackTemplate(LSData)) {
    batch(() => {
      dispatch(setTempDBData({ resume_data, publish, userData }))
      dispatch(loadInitialDataNoAccount())
    })
  } else {
    batch(() => {
      dispatch(updateInitialState({ resume_data, publish, userData }))
    })
  }
  dispatch(setUserData(userData))
}

export const handleLoginCallback = (user) => async (dispatch) => {
  if (isLogin(user)) {
    return dispatch(handleLoginCallbackLoadData(user))
  }
  //If the it is not login is signup and we handle that here
  return dispatch(handleSignup(user))
}
