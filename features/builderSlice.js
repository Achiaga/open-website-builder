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
  updateInitialState,
} from './login-helpers'
import { saveData } from '../login/helpers'

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
      state.builderData.blocks = action.payload
    },
    setInitialBuilderData: (state, action) => {
      state.builderData = action.payload
    },
    setLoadingData: (state, action) => {
      state.loadingData = action.payload
    },
    //This functions are to let the user overwrite DB data
    setTempDBData: (state, action) => {
      //We store here the DB data while the user decides
      // if he wants to overwrite it or keep it.
      state.tempDBData = action.payload
    },
    setUserData: (state, action) => {
      state.user = action.payload
    },
    setWebsiteId: (state, action) => {
      state.user.websiteId = action.payload
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
    setHasMobileBeenEdited: (state) => {
      state.builderData.hasMobileBeenEdited = true
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
    setSaveStatus: (state, action) => {
      state.saveStatus = action.payload
    },
    setPublishStatus: (state, action) => {
      state.publishStatus = action.payload
    },
    setAccountCreated: (state, action) => {
      state.accountCreated = action.payload
    },
  },
})

export const {
  setBuilderBlocksData,
  setInitialBuilderData,
  setTempDBData,
  setUserData,
  setWebsiteId,
  setLayout,
  setLayouts,
  setHasMobileBeenEdited,
  setMobileLayout,
  setAddedBlock,
  setStructure,
  setNewDropBlockType,
  setNewDropBlock,
  setSelectedBlockId,
  setResizingBlockId,
  setGridRowHeight,
  setBlockConfig,
  setHierarchy,
  setMobileHierarchy,
  setBuilderDevice,
  setSaveStatus,
  setPublishStatus,
  setAccountCreated,
  setLoadingData,
} = builderSlice.actions

export const loadInitialData = (user, params) => async (dispatch) => {
  const { origin, template } = params
  if (!user) return dispatch(loadInitialDataNoAccount(template))
  if (user && origin === 'login') return dispatch(handleLoginCallback(user))
  if (user && origin !== 'login')
    return dispatch(loadDataFromDB(user, template))
}

export const editBlockConfig = ({ blockId, newData, operationType }) => (
  dispatch
) => {
  if (operationType === DELETE) dispatch(removeblock({ blockId, newData }))
  else dispatch(setBlockConfig({ newData, blockId }))
}

const removeMobileblock = (blockId) => (dispatch, getState) => {
  const state = getState()
  const { blocks } = getBuilderData(getState())
  const layouts = getMobileLayout(state)
  const hierarchy = getMobileHierarchy(state)
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    hierarchy
  )
  batch(() => {
    dispatch(setSelectedBlockId(null))
    dispatch(setMobileHierarchy(newBuilderData.hierarchy))
    dispatch(setMobileLayout(newBuilderData.layouts))
  })
}

export const removeblock = ({ blockId }) => (dispatch, getState) => {
  const state = getState()
  if (getIsMobileBuilder(state)) {
    dispatch(removeMobileblock(blockId))
    return
  }
  const { blocks } = getBuilderData(getState())
  const layouts = getLayout(state)
  const hierarchy = getHierarchy(state)
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    hierarchy
  )
  batch(() => {
    dispatch(setSelectedBlockId(null))
    dispatch(removeMobileblock(blockId))
    dispatch(setBuilderBlocksData(newBuilderData.blocks))
    dispatch(updateHierarchy(newBuilderData.hierarchy))
    dispatch(updateLayouts(newBuilderData.layouts))
  })
}

export const setBlockEditable = (blockId) => (dispatch) => {
  batch(() => {
    dispatch(setSelectedBlockId(blockId))
  })
}

export const updateLayouts = (updatedLayout) => (dispatch, getState) => {
  const builderDevice = getBuilderDevice(getState())
  const hasMobileBeenEdited = getHasMobileBeenEdited(getState())

  if (builderDevice === 'mobile') {
    dispatch(setMobileLayout(updatedLayout))
    if (!hasMobileBeenEdited) {
      dispatch(setHasMobileBeenEdited())
    }
  } else {
    if (!hasMobileBeenEdited) {
      dispatch(setMobileLayout(updatedLayout))
    }
    dispatch(setLayouts(updatedLayout))
  }
}
export const addNewLayoutItem = (newLayout) => (dispatch, getState) => {
  const layouts = getLayout(getState())
  const mobileLayout = getMobileLayout(getState())
  dispatch(setMobileLayout([...mobileLayout, newLayout]))
  dispatch(setLayouts([...layouts, newLayout]))
}
export const updateHierarchy = (newHierarchy) => (dispatch, getState) => {
  const builderDevice = getBuilderDevice(getState())
  if (builderDevice === 'mobile') {
    dispatch(setMobileHierarchy(newHierarchy))
  } else {
    dispatch(setHierarchy(newHierarchy))
  }
}
export const addNewHierachyItem = (blockLayoutId, newParentId) => (
  dispatch,
  getState
) => {
  const builderDevice = getBuilderDevice(getState())
  const hierarchy = getHierarchy(getState())
  const newHierarchy = {
    ...hierarchy,
    [newParentId]: [...(hierarchy?.[newParentId] || []), blockLayoutId],
  }
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
    dispatch(addNewLayoutItem(blockLayout))
    if (newParent) {
      dispatch(addNewHierachyItem(blockLayout.i, newParent.i))
    }
    dispatch(setNewDropBlock({ type: null }))
  })
}
export const publishWebsite = (user) => async (dispatch, getState) => {
  dispatch(setPublishStatus('loading'))
  const builderData = getBuilderData(getState())
  const websiteId = getWebsiteId(getState())
  const res = await saveData({ user, builderData, publish: true })
  batch(() => {
    !websiteId && dispatch(setWebsiteId(res._id))
    dispatch(setPublishStatus('success'))
  })
}

export const overwriteDBData = () => async (dispatch, getState) => {
  const builderData = getBuilderData(getState())
  const { publish, userData } = getTempDBData(getState())
  await saveData({
    builderData,
    user: { sub: userData.user_id, email: userData.user_email, publish },
  })
  dispatch(setSaveStatus('null'))
  dispatch(setTempDBData(null))
}
export const denyOverwriteData = () => (dispatch, getState) => {
  const tempInitialData = getTempDBData(getState())
  dispatch(updateInitialState(tempInitialData))
  dispatch(setTempDBData(null))
}

// SELECTORS ****************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************

export const getBuilderData = (state) => state.builder.builderData
export const getIsLoadingData = (state) => state.builder.loadingData
export const getUserData = (state) => state.builder.user
export const getWebsiteId = (state) => state.builder.user.websiteId
export const getBlocks = (state) => state.builder.builderData.blocks
export const getHierarchy = (state) => {
  if (getBuilderDevice(state) === 'mobile') {
    return getMobileHierarchy(state)
  }
  return getDesktopHierarchy(state)
}
const getMobileHierarchy = (state) => state.builder.builderData.mobileHierarchy
const getDesktopHierarchy = (state) => state.builder.builderData.hierarchy
export const getBlockData = (id) => (state) =>
  state.builder.builderData.blocks[id]
export const getResumeId = (state) => state.builder?.user?.resumeId
export const getBuilderDevice = (state) => state.builder?.device
export const getIsMobileBuilder = (state) => state.builder?.device === 'mobile'

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
  if (getBuilderDevice(state) === 'mobile') {
    return getMobileLayout(state)
  }
  return getDesktopLayout(state)
}
const getMobileLayout = (state) => state.builder.builderData.mobileLayout
const getDesktopLayout = (state) => state.builder.builderData.layouts
export const getStructure = (state) => state.builder.builderData.structure
export const getHasMobileBeenEdited = (state) =>
  state.builder.builderData.hasMobileBeenEdited
export const getSaveStatus = (state) => state.builder.saveStatus
export const getPublishStatus = (state) => state.builder.publishStatus
export const getAccountCreated = (state) => state.builder.accountCreated
export const getTempDBData = (state) => state.builder.tempDBData

export default builderSlice.reducer
