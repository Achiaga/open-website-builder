import { createSlice } from '@reduxjs/toolkit'
import { requestUser } from '../utils/user-data'

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

export const { setUserProjects } = userSlice.actions

export const loadUserInitialData = (userId) => async (dispatch) => {
  const { websitesData } = await requestUser(userId)
  dispatch(setUserProjects(websitesData))
}

export const getUserProjects = (state) => state.user.projects

export default userSlice.reducer
