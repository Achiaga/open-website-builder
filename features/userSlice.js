import { createSlice } from '@reduxjs/toolkit'
import { requestUserProjects, requestRemoveProject } from '../utils/user-data'
import { setUserData } from './builderSlice'
import { getIsUserRoles } from './login-helpers'

const initialState = {
  projects: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProjects: (state, action) => {
      state.projects = action.payload
    },
  },
})

export const { setUserProjects, setRemoveProjectStatus } = userSlice.actions

export const loadUserProjectsData = (user) => async (dispatch) => {
  const userData = {
    userEmail: user.email,
    userId: user.sub,
    roles: getIsUserRoles(user),
  }
  const { projects } = await requestUserProjects(user.sub)
  dispatch(setUserProjects(projects))
  dispatch(setUserData(userData))
}
export const removeProject = (projectId, userId) => async (dispatch) => {
  const { websitesData } = await requestRemoveProject({ projectId, userId })
  dispatch(setUserProjects(websitesData))
}

export const getUserProjects = (state) => state.user.projects

export default userSlice.reducer
