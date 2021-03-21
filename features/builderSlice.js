import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { batch } from 'react-redux'
import localforage from 'localforage'

import { FallbackData } from '../builder/initial-data'
import { ROW_HEIGHT } from '../builder/web-builder/constants'
import { DELETE } from '../builder/blocks/constants'

import { addBlock, removeblockFromState } from '../builder/web-builder/helpers'
import { getUserDataFromLS } from './helper'
import { getUserDataById } from '../utils/user-data'

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
    setBuilderBlocksData: (state, action) => {
      state.builderData = action.payload
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setNewDropBlockType: (state, action) => {
      state.newBlock.type = action.payload
    },
    setNewDropBlock: (state, action) => {
      state.newBlock.type = action.payload.type
      state.newBlock.id = uuid()
    },
    setSelectedBlockId: (state, action) => {
      state.selectedBlockId = action.payload
    },
    setGridRowHeight: (state, action) => {
      state.gridRowHeight = action.payload
    },
    setBlockConfig: (state, action) => {
      const { newData, blockId } = action.payload
      state.builderData.blocks[blockId].data = newData
    },
    setLayout: (state, action) => {
      const { i } = action.payload
      state.builderData.layouts[i] = action.payload
    },
    setAddedBlock: (state, action) => {
      const { blockID, newBlockStructure } = action.payload
      state.builderData.blocks[blockID] = newBlockStructure
    },
    setStructure: (state, action) => {
      const { structureId, structure } = action.payload
      state.builderData.structure[structureId] = structure
    },
    setBlockDraggable: (state, action) => {
      const { blockId, prevBlockId } = action.payload
      if (prevBlockId && state.builderData.layouts[prevBlockId]) {
        state.builderData.layouts[prevBlockId].isDraggable = true
      }
      if (blockId) state.builderData.layouts[blockId].isDraggable = false
    },
  },
})

export const {
  setBuilderBlocksData,
  setUserData,
  setLayout,
  setAddedBlock,
  setStructure,
  setNewDropBlockType,
  setNewDropBlock,
  setSelectedBlockId,
  setGridRowHeight,
  setBlockConfig,
  setBlockDraggable,
} = builderSlice.actions

async function getUserData(user) {
  console.log(user)
  if (user) {
    const userData = await getUserDataById(user.sub)
    return userData
  }
  // const userData = await getUserResumeData()
  // return userData || FallbackData
}

export const loadInitialData = (user) => async (dispatch) => {
  const { resume_data, id, user_id, is_publish } = await getUserData(user)
  // const userData = await getUserDataFromLS()
  // console.log(JSON.stringify(userData, null, 2))
  dispatch(setBuilderBlocksData(resume_data))
  dispatch(
    setUserData({ resumeId: id, userId: user_id, isPublish: is_publish })
  )
}

export const editBlockConfig = ({ blockId, newData, operationType }) => (
  dispatch
) => {
  if (operationType === DELETE) dispatch(removeblock({ blockId, newData }))
  else dispatch(setBlockConfig({ newData, blockId }))
}

export const removeblock = ({ blockId }) => (dispatch, getState) => {
  const { structure, layouts, blocks } = getBuilderData(getState())
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    structure
  )
  dispatch(setBuilderBlocksData(newBuilderData))
}

export const setBlockEditable = (blockId) => (dispatch, getState) => {
  const prevBlockId = getSelectedBlockId(getState())
  batch(() => {
    dispatch(setBlockDraggable({ prevBlockId, blockId }))
    dispatch(setSelectedBlockId(blockId))
  })
}
export const addNewBlock = (blockLayout, parentBlockId) => (
  dispatch,
  getState
) => {
  const state = getState()
  const structure = getStructure(state)
  const newBlockStructure = addBlock(blockLayout.i, getNewBlockType(state))
  const structureId = parentBlockId || 'main'
  batch(() => {
    dispatch(setAddedBlock({ blockID: blockLayout.i, newBlockStructure }))
    dispatch(setLayout(blockLayout))
    dispatch(
      setStructure({
        structure: [...(structure[structureId] || []), blockLayout.i],
        structureId,
      })
    )
    dispatch(setNewDropBlock({ type: null }))
  })
}

export const getBuilderData = (state) => state.builder.builderData
export const getBlockData = (id) => (state) =>
  state.builder.builderData.blocks[id]
export const getResumeId = (state) => state.builder?.user?.resumeId

export const getNewBlock = (state) => state.builder.newBlock
export const getNewBlockType = (state) => state.builder.newBlock.type
export const getSelectedBlockId = (state) => state.builder.selectedBlockId
export const getGridRowHeight = (state) => state.builder.gridRowHeight
export const getLayout = (state) => state.builder.builderData.layout
export const getStructure = (state) => state.builder.builderData.structure
export const getBlocksConfig = (state) => state.builder.builderData.blocksConfig

export default builderSlice.reducer
