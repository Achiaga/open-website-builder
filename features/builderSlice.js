import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { FallbackData } from '../builder/initial-data'
import { ROW_HEIGHT } from '../builder/web-builder/constants'
import {
  addBlock,
  denormalizeBlockData,
  editBlock,
  editItemDraggableProperty,
  normalizeBlockStructure,
  normalizeLayout,
  saveOnLocal,
  reconstructBlocksConfig,
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
    setLayout: (state, action) => {
      state.builderData.layout = action.payload
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
  setLayout,
  setBlocksConfig,
} = builderSlice.actions

export const loadInitialData = () => async (dispatch) => {
  const userData = await getUserDataFromLS()
  const blocksConfig = normalizeBlockStructure(userData)
  const layout = normalizeLayout(userData)
  dispatch(loadInitialState({ blocksConfig, layout }))
}
export const upadateLayout = ({ newLayout, editableBlockId }) => (
  dispatch,
  getState
) => {
  const layout = getLayout(getState())
  let updatedLayout = newLayout
  if (editableBlockId || editableBlockId === null) {
    updatedLayout = editItemDraggableProperty(layout, editableBlockId)
  }
  console.log('updatedLayout', updatedLayout)
  dispatch(setLayout([...updatedLayout]))
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
  const updatedBlocksConfig = editBlock(
    getBlocksConfig(getState()),
    blockId,
    newData,
    operationType
  )
  dispatch(setBlocksConfig(updatedBlocksConfig))
}

export const addBlockConfig = ({ newBlockId }) => (dispatch, getState) => {
  const blocksConfig = getBlocksConfig(getState())
  const newBlockType = getNewBlockType(getState())
  const updatedBlocksConfig = addBlock(newBlockId, newBlockType, blocksConfig)
  dispatch(setBlocksConfig(updatedBlocksConfig))
}
export const setBlockEditable = (editableBlockId) => (dispatch) => {
  dispatch(setSelectedBlockId(editableBlockId))
  dispatch(upadateLayout({ editableBlockId }))
}

export const getBuilderData = (state) => state.builder.builderData
export const getNewBlock = (state) => state.builder.newBlock
export const getNewBlockType = (state) => state.builder.newBlock.type
export const getSelectedBlockId = (state) => state.builder.selectedBlockId
export const getGridRowHeight = (state) => state.builder.gridRowHeight
export const getLayout = (state) => state.builder.builderData.layout
export const getBlocksConfig = (state) => state.builder.builderData.blocksConfig

export default builderSlice.reducer
