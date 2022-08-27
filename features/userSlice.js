import { createSlice } from '@reduxjs/toolkit'
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
  dispatch(setUserData(userData))
}

export const getUserProjects = (state) => state.user.projects

export default userSlice.reducer
