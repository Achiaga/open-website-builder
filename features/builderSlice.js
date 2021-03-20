import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { batch } from 'react-redux'

import { FallbackData } from '../builder/initial-data'
import { ROW_HEIGHT } from '../builder/web-builder/constants'
import {
  addBlock,
  denormalizeBlockData,
  editItemDraggableProperty,
  saveOnLocal,
  reconstructBlocksConfig,
  findBlock,
  getBlockById,
} from '../builder/web-builder/helpers'
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
    setBlocksConfig: (state, action) => {
      state.builderData.blocksConfig = action.payload
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
      if (prevBlockId)
        state.builderData.layouts[prevBlockId].isDraggable = false
      if (blockId) state.builderData.layouts[blockId].isDraggable = true
    },
  },
})

export const {
  loadInitialState,
  setLayout,
  setAddedBlock,
  setStructure,
  setNewBlockType,
  setNewBlockId,
  setNewBlock,
  setSelectedBlockId,
  setGridRowHeight,
  setBlocksConfig,
  setBlockConfig,
  setBlockDraggable,
} = builderSlice.actions

export const loadInitialData = () => async (dispatch) => {
  const userData = await getUserDataFromLS()
  console.log(JSON.stringify(userData, null, 2))
  const { blocks, layouts, structure } = userData
  dispatch(loadInitialState({ blocks, layouts, structure }))
}
export const upadateLayout = ({ newLayout, editableBlockId }) => (
  dispatch,
  getState
) => {
  const layout = getLayout(getState())

  dispatch(setLayout(updatedLayout))
}

export const udpateBlocksConfigInception = ({ newBlocks, parentBlockKey }) => (
  dispatch,
  getState
) => {
  const blocksConfig = getBlocksConfig(getState())
  const layout = getLayout(getState())
  const newBlocksConfig = reconstructBlocksConfig(
    blocksConfig,
    parentBlockKey,
    newBlocks
  )
  saveOnLocal(denormalizeBlockData(layout, newBlocksConfig))
  dispatch(setBlocksConfig(newBlocksConfig))
}

export const editBlockConfig = ({ blockId, newData, operationType }) => (
  dispatch,
  getState
) => {
  const blockInfo = findBlock(getBlocksConfig(getState()), blockId)
  dispatch(setBlockConfig({ blockInfo, newData, blockId }))
}

export const addBlockConfig = ({ newBlockId }) => (dispatch, getState) => {
  const blocksConfig = getBlocksConfig(getState())
  const newBlockType = getNewBlockType(getState())
  const updatedBlocksConfig = addBlock(newBlockId, newBlockType, blocksConfig)
  dispatch(setBlocksConfig(updatedBlocksConfig))
}
export const setBlockEditable = (blockId) => (dispatch, getState) => {
  const prevBlockId = getSelectedBlockId(getState())
  dispatch(setBlockDraggable({ prevBlockId, blockId }))
  dispatch(setSelectedBlockId(blockId))
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
    dispatch(setNewBlock({ type: null }))
  })
}

export const getBuilderData = (state) => state.builder.builderData
export const getBlockData = (id) => (state) =>
  state.builder.builderData.blocks[id]

export const getNewBlock = (state) => state.builder.newBlock
export const getNewBlockType = (state) => state.builder.newBlock.type
export const getSelectedBlockId = (state) => state.builder.selectedBlockId
export const getGridRowHeight = (state) => state.builder.gridRowHeight
export const getLayout = (state) => state.builder.builderData.layout
export const getStructure = (state) => state.builder.builderData.structure
export const getBlocksConfig = (state) => state.builder.builderData.blocksConfig

export default builderSlice.reducer
