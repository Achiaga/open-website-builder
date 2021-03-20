import { createSlice } from '@reduxjs/toolkit'
import { getUserDataFromLS } from './helper'

const initialState = {
  builderData: null,
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    loadInitialState: (state, action) => {
      state.builderData = action.payload
    },
    setNewBlockType: (state, action) => {
      state.newBlockType = action.payload
    },
  },
})

export const { loadInitialState, setNewBlockType } = builderSlice.actions

export const loadInitialData = () => async (dispatch) => {
  const userData = await getUserDataFromLS()
  dispatch(loadInitialState(userData))
}

export const getBuilderData = (state) => state.builder.builderData
export const getNewBlockType = (state) => state.builder.newBlockType

export default builderSlice.reducer
