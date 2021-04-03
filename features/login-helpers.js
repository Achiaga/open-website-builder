import { batch } from 'react-redux'
import * as templates from '../builder/initial-data'
import {
  setInitialBuilderData,
  setUserData,
  AUTH0_CUSTOM_CLAIM_PATH,
} from './builderSlice'
import { getUserDataFromLS } from './helper'
import { saveData } from '../login/helpers'
import { getUserDataById } from '../utils/user-data'

async function getUserData(user) {
  try {
    const userData = await getUserDataById(user.sub)
    return userData
  } catch (err) {
    console.error('error con getUserData', err)
    const blocksData = await getUserDataFromLS()
    return { resume_data: blocksData || templates.Fallback }
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
const updateInitialState = ({ resume_data, id, user_id, is_publish }) => async (
  dispatch
) => {
  batch(() => {
    dispatch(setInitialBuilderData(resume_data))
    dispatch(
      setUserData({ resumeId: id, userId: user_id, isPublish: is_publish })
    )
  })
}

const isLogin = (userMetadata) => {
  if (!userMetadata.logins_counts > 1) return true
  return new Date() - new Date(userMetadata.createdAt) > 2 * 60 * 1000
}

const handleSingup = (user) => async (dispatch) => {
  const builderData = await getUserDataFromLS()
  const { resume_data, id, user_id, is_publish } = await saveData({
    user,
    builderData,
  })
  dispatch(updateInitialState({ resume_data, id, user_id, is_publish }))
}

export const loadDataFromDB = (user) => async (dispatch) => {
  const { resume_data, id, user_id, is_publish } = await getUserData(user)
  dispatch(updateInitialState({ resume_data, id, user_id, is_publish }))
}

export const handleLoginCallback = (user) => async (dispatch) => {
  if (isLogin(user[AUTH0_CUSTOM_CLAIM_PATH])) {
    return dispatch(loadDataFromDB(user))
  }
  return dispatch(handleSingup(user))
}
