import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { FallbackData } from '../builder/initial-data'
import { ROW_HEIGHT } from '../builder/web-builder/constants'
import { getUserDataFromLS } from './helper'

const initialState = {
  builderData: null,
  newBlock: {
    id: uuid(),
  },
  gridRowHeight: ROW_HEIGHT,
}

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    loadInitialState: (state, action) => {
      state.builderData = action.payload
    },
    setNewBlockType: (state, action) => {
      state.newBlock.type = action.payload
    },
    setNewBlockId: (state, action) => {
      state.newBlock.id = action.payload
    },
    setNewBlock: (state, action) => {
      state.newBlock.type = action.payload.type
      state.newBlock.id = uuid()
    },
    setSelectedBlockId: (state, action) => {
      state.selectedBlockId = action.payload
    },
    setGridRowHeight: (state, action) => {
      state.gridRowHeight = action.payload
    },
  },
})

export const {
  loadInitialState,
  setNewBlockType,
  setNewBlockId,
  setNewBlock,
  setSelectedBlockId,
  setGridRowHeight,
} = builderSlice.actions

export const loadInitialData = () => async (dispatch) => {
  const userData = await getUserDataFromLS()
  dispatch(loadInitialState(userData))
}

export const getBuilderData = (state) => state.builder.builderData
export const getNewBlock = (state) => state.builder.newBlock
export const getSelectedBlockId = (state) => state.builder.selectedBlockId
export const getGridRowHeight = (state) => state.builder.gridRowHeight

export default builderSlice.reducer
