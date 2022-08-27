import { batch } from 'react-redux'

import {
  setInitialBuilderData,
  setUserData,
  AUTH0_CUSTOM_CLAIM_PATH,
  setAccountCreated,
  setTempDBData,
  setLoadingData,
  saveTemplateOnLocal,
  setProjectId,
} from './builderSlice'
import { getUserDataFromLS } from './helper'
// import dynamic from 'next/dynamic'

import templates from '../templates'
import isEqual from 'lodash/isEqual'

// const isEqual = dynamic(() => import('lodash/isEqual'))
// const templates = dynamic(() => import('../templates'))

export function getHasUserProAdmin(user) {
  return user?.[AUTH0_CUSTOM_CLAIM_PATH]?.role?.includes('Admin')
}
export function getHasUserProRole(user) {
  return user?.[AUTH0_CUSTOM_CLAIM_PATH]?.role?.includes('Pro')
}
export function getIsUserRoles(user) {
  return user?.[AUTH0_CUSTOM_CLAIM_PATH]?.role
}

async function getUserData() {
  try {
    let userData
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
    dispatch(saveTemplateOnLocal(data))
    dispatch(setInitialBuilderData(data))
  })
}
export const loadDataFromTemplate = (user, template) => async (dispatch) => {
  const userData = {
    userEmail: user.email,
    userId: user.sub,
    roles: getIsUserRoles(user),
  }
  const data = templates[template] || templates.fallback
  batch(() => {
    dispatch(setProjectId(null))
    dispatch(saveTemplateOnLocal(data))
    dispatch(setInitialBuilderData(data))
    dispatch(setUserData(userData))
  })
}
export const updateInitialState =
  ({ resume_data }) =>
  async (dispatch) => {
    batch(() => {
      dispatch(setInitialBuilderData(resume_data || templates.fallback))
    })
  }

const isLogin = (user) => {
  const userMetadata = user?.[AUTH0_CUSTOM_CLAIM_PATH]
  if (!userMetadata.logins_counts > 1) return true
  return new Date() - new Date(userMetadata.createdAt) > 2 * 60 * 1000
}

const handleSignup = (user) => async (dispatch) => {
  const userData = {
    userEmail: user.email,
    userId: user.sub,
    publish: false,
    roles: getIsUserRoles(user),
  }
  const builderData = await getUserDataFromLS()
  dispatch(setUserData(userData))
  dispatch(updateInitialState({ resume_data: builderData }))
  dispatch(setAccountCreated(true))
}

export const loadDataFromDB =
  (user, template, projectId) => async (dispatch) => {
    dispatch(setLoadingData(true))
    const dbData = await getUserData(user, projectId)
    const { resume_data, publish, _id, domain, subdomain } = dbData || {}
    const userData = {
      userEmail: user.email,
      userId: user.sub,
      domain,
      subdomain,
      projectId: _id,
      publish,
      roles: getIsUserRoles(user),
    }
    if (!resume_data) {
      batch(() => {
        dispatch(loadInitialDataNoAccount(template))
      })
    } else if (templates[template] && resume_data) {
      batch(() => {
        dispatch(setTempDBData({ resume_data }))
        dispatch(loadInitialDataNoAccount(template))
      })
    } else {
      dispatch(updateInitialState({ resume_data }))
    }
    batch(() => {
      dispatch(setUserData(userData))
      dispatch(setLoadingData(false))
    })
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
  if (!isEqual(LSData, resume_data) && !isFallbackTemplate(LSData)) {
    batch(() => {
      dispatch(setTempDBData({ resume_data, publish, userData }))
      dispatch(loadInitialDataNoAccount())
    })
  } else {
    batch(() => {
      dispatch(updateInitialState({ resume_data }))
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
