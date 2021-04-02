import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { batch } from 'react-redux'

import { ROW_HEIGHT } from '../builder/web-builder/constants'
import { DELETE } from '../builder/blocks/constants'

import {
  addBlock,
  removeblockFromState,
  findBlockParentId,
  getParentBlock,
} from '../builder/web-builder/helpers'
import {
  handleLoginCallback,
  loadInitialDataNoAccount,
  loadDataFromDB,
} from './login-helpers'

export const AUTH0_CUSTOM_CLAIM_PATH =
  'https://standout-resume.now.sh/extraData'

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
    setResizingBlockId: (state, action) => {
      state.resizingBlockId = action.payload
    },
    setGridRowHeight: (state, action) => {
      state.gridRowHeight = action.payload
    },
    setBlockConfig: (state, action) => {
      const { newData, blockId } = action.payload
      state.builderData.blocks[blockId].data = newData
    },
    setLayout: (state, action) => {
      state.builderData.layouts = [...state.builderData.layouts, action.payload]
    },
    setMobileLayout: (state, action) => {
      state.builderData.mobileLayout = action.payload
    },
    setLayouts: (state, action) => {
      state.builderData.layouts = action.payload
    },
    setHierarchy: (state, action) => {
      state.builderData.hierarchy = action.payload
    },
    setMobileHierarchy: (state, action) => {
      state.builderData.mobileHierarchy = action.payload
    },
    setAddedBlock: (state, action) => {
      const { blockID, newBlockData } = action.payload
      state.builderData.blocks[blockID] = newBlockData
    },
    setStructure: (state, action) => {
      const { structureId, structure } = action.payload
      state.builderData.structure[structureId] = structure
    },
    setBuilderDevice: (state, action) => {
      state.device = action.payload
    },
    setBlockDraggable: (state, action) => {
      // const { blockId, prevBlockId } = action.payload
      // if (prevBlockId && state.builderData.layouts[prevBlockId]) {
      //   state.builderData.layouts[prevBlockId].isDraggable = true
      // }
      // if (blockId) state.builderData.layouts[blockId].isDraggable = false
    },
  },
})

export const {
  setBuilderBlocksData,
  setUserData,
  setLayout,
  setLayouts,
  setMobileLayout,
  setAddedBlock,
  setStructure,
  setNewDropBlockType,
  setNewDropBlock,
  setSelectedBlockId,
  setResizingBlockId,
  setGridRowHeight,
  setBlockConfig,
  setBlockDraggable,
  setHierarchy,
  setMobileHierarchy,
  setBuilderDevice,
} = builderSlice.actions

export const loadInitialData = (user, params) => async (dispatch) => {
  const { origin, template } = params
  if (!user) return dispatch(loadInitialDataNoAccount(template))
  if (user && origin === 'login') return dispatch(handleLoginCallback(user))
  if (user && origin !== 'login') return dispatch(loadDataFromDB(user))
}

export const editBlockConfig = ({ blockId, newData, operationType }) => (
  dispatch
) => {
  if (operationType === DELETE) dispatch(removeblock({ blockId, newData }))
  else dispatch(setBlockConfig({ newData, blockId }))
}

export const removeblock = ({ blockId }) => (dispatch, getState) => {
  const { hierarchy, layouts, blocks } = getBuilderData(getState())
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    hierarchy
  )
  batch(() => {
    dispatch(setSelectedBlockId(null))
    dispatch(setBuilderBlocksData(newBuilderData))
  })
}

export const setBlockEditable = (blockId) => (dispatch, getState) => {
  const prevBlockId = getSelectedBlockId(getState())
  batch(() => {
    dispatch(setBlockDraggable({ prevBlockId, blockId }))
    dispatch(setSelectedBlockId(blockId))
  })
}

export const updateLayouts = (newLayout) => (dispatch, getState) => {
  const builderDevice = getBuilderDevice(getState())
  if (builderDevice === 'mobile') {
    dispatch(setMobileLayout(newLayout))
  } else {
    dispatch(setLayouts(newLayout))
  }
}
export const updateHierarchy = (newHierarchy) => (dispatch, getState) => {
  const builderDevice = getBuilderDevice(getState())
  if (builderDevice === 'mobile') {
    dispatch(setMobileHierarchy(newHierarchy))
  } else {
    dispatch(setHierarchy(newHierarchy))
  }
}

export const addNewBlock = (newLayout, blockLayout) => (dispatch, getState) => {
  const state = getState()
  const hierarchy = getHierarchy(state)
  const newBlockData = addBlock(blockLayout.i, getNewBlockType(state))
  const newParent = getParentBlock(newLayout, blockLayout, hierarchy)
  batch(() => {
    dispatch(setAddedBlock({ blockID: blockLayout.i, newBlockData }))
    dispatch(setLayout(blockLayout))
    if (newParent) {
      const newHierarchy = {
        ...hierarchy,
        [newParent.i]: [...(hierarchy?.[newParent?.i] || []), blockLayout.i],
      }
      dispatch(updateHierarchy(newHierarchy))
    }
    dispatch(setNewDropBlock({ type: null }))
  })
}

export const getBuilderData = (state) => state.builder.builderData
export const getBlocks = (state) => state.builder.builderData.blocks
export const getHierarchy = (state) => {
  if (getBuilderDevice === 'mobile') {
    return state.builder.builderData.mobileHierarchy
  }
  return state.builder.builderData.hierarchy
}
export const getBlockData = (id) => (state) =>
  state.builder.builderData.blocks[id]
export const getResumeId = (state) => state.builder?.user?.resumeId
export const getBuilderDevice = (state) => state.builder?.device

export const getNewBlock = (state) => state.builder.newBlock
export const getNewBlockType = (state) => state.builder.newBlock.type
export const getSelectedBlockId = (state) => state.builder.selectedBlockId
export const getResizingBlock = (state) => state.builder.resizingBlockId
export const getBlocksConfig = (state) => state.builder.builderData.blocksConfig
export const getBlockParentId = (id) => (state) => {
  return findBlockParentId(getStructure(state), id)
}

export const getGridRowHeight = (state) => state.builder.gridRowHeight
export const getLayout = (state) => {
  if (getBuilderDevice === 'mobile') {
    return state.builder.builderData.mobileLayout
  }
  return state.builder.builderData.layout
}
export const getStructure = (state) => state.builder.builderData.structure
export default builderSlice.reducer
