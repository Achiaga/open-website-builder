import { batch } from 'react-redux'
import * as templates from '../builder/initial-data'
import {
  setInitialBuilderData,
  setUserData,
  AUTH0_CUSTOM_CLAIM_PATH,
  setAccountCreated,
} from './builderSlice'
import { getUserDataFromLS } from './helper'
import { saveData } from '../login/helpers'
import { getUserDataById } from '../utils/user-data'

async function getUserData(user, template) {
  try {
    const userData = await getUserDataById(user.sub)
    return userData
  } catch (err) {
    console.error('error con getUserData', err)
    const blocksData = await getUserDataFromLS()
    return {
      resume_data: templates[template] || blocksData || templates.Fallback,
    }
  }
}

export const loadInitialDataNoAccount = (template) => async (dispatch) => {
  const blocksData = await getUserDataFromLS()
  dispatch(
    setInitialBuilderData(
      templates[template] || blocksData || templates.Fallback
    )
  )
}
const updateInitialState = ({ resume_data, publish, userData }) => async (
  dispatch
) => {
  batch(() => {
    dispatch(setInitialBuilderData(resume_data))
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
  const { resume_data, user_id, user_email, publish, _id } = await getUserData(
    user,
    template
  )
  const userData = { user_email, user_id, websiteId: _id }
  dispatch(updateInitialState({ resume_data, publish, userData }))
}

export const handleLoginCallback = (user) => async (dispatch) => {
  if (isLogin(user)) {
    return dispatch(loadDataFromDB(user))
  }
  //If the it is not login is singup and we handle thate here
  return dispatch(handleSingup(user))
}
