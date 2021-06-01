import { createSlice } from '@reduxjs/toolkit'
import { requestUserProjects, requestRemoveProject } from '../utils/user-data'

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

export const loadUserProjectsData = (userId) => async (dispatch) => {
  const { projects } = await requestUserProjects(userId)
  dispatch(setUserProjects(projects))
}
export const removeProject = (projectId, userId) => async (dispatch) => {
  const { websitesData } = await requestRemoveProject({ projectId, userId })
  dispatch(setUserProjects(websitesData))
}

export const getUserProjects = (state) => state.user.projects

export default userSlice.reducer
