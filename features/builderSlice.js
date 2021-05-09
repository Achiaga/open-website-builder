import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { batch } from 'react-redux'

import { GRID_COLUMNS, ROW_HEIGHT } from '../builder/web-builder/constants'
import { DELETE, DUPLICATE } from '../builder/blocks/constants'

import {
  addBlock,
  removeblockFromState,
  findBlockParentId,
  getParentBlock,
  isBlockInHierarchy,
  getUpdatedHierarchy,
  saveOnLocal,
  cleanLayouts,
} from '../builder/web-builder/helpers'
import {
  handleLoginCallback,
  loadInitialDataNoAccount,
  loadDataFromDB,
  updateInitialState,
  normalizeBuilderData,
} from './login-helpers'
import { saveData } from '../login/helpers'

export const AUTH0_CUSTOM_CLAIM_PATH =
  'https://standout-resume.now.sh/extraData'

const initialState = {
  builderData: null,
  newBlock: {
    id: uuid(),
  },
  user: {},
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
      state.builderData = normalizeBuilderData(action.payload)
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
    setDraggingBlock: (state, action) => {
      state.draggingBlock = action.payload
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
    setBulkAddItems: (state, action) => {
      const { blocks, layouts, hierarchy, mobileLayouts } = action.payload
      state.builderData.layouts = { ...state.builderData.layouts, ...layouts }
      state.builderData.mobileLayout = {
        ...state.builderData.mobileLayout,
        ...mobileLayouts,
      }
      state.builderData.blocks = { ...state.builderData.blocks, ...blocks }
      state.builderData.hierarchy = {
        ...state.builderData.hierarchy,
        ...hierarchy,
      }
    },
    setMobileLayout: (state, action) => {
      state.builderData.mobileLayout = cleanLayouts(action.payload)
    },
    setMobileEditedBlocks: (state, action) => {
      state.builderData.mobileEditedBlocks = action.payload
    },
    setHasMobileBeenEdited: (state) => {
      state.builderData.hasMobileBeenEdited = true
    },
    setLayouts: (state, action) => {
      state.builderData.layouts = cleanLayouts(action.payload)
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
  setMobileEditedBlocks,
  setMobileLayout,
  setAddedBlock,
  setStructure,
  setNewDropBlockType,
  setNewDropBlock,
  setSelectedBlockId,
  setDraggingBlock,
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
  setBulkAddItems,
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
  if (operationType === DELETE) {
    dispatch(removeblock({ blockId, newData }))
  } else if (operationType === DUPLICATE) {
    dispatch(duplicateBlock(blockId))
  } else {
    dispatch(setBlockConfig({ newData, blockId }))
  }
  dispatch(saveDataOnLocal())
}

const removeMobileblock = (blockId) => (dispatch, getState) => {
  const state = getState()
  const { blocks } = getBuilderData(getState())
  const layouts = getMobileLayout(state)
  const hierarchy = getMobileHierarchy(state)
  const mobileEditedBlocks = getMobileEditedBlocks(getState())
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    hierarchy,
    mobileEditedBlocks
  )
  batch(() => {
    dispatch(setSelectedBlockId(null))
    dispatch(setMobileHierarchy(newBuilderData.hierarchy))
    dispatch(setMobileLayout(newBuilderData.layouts))
    dispatch(setMobileEditedBlocks(newBuilderData.mobileEditedBlocks))
  })
}

export const removeblock = ({ blockId }) => (dispatch, getState) => {
  const state = getState()
  const { blocks } = getBuilderData(getState())
  const layouts = getLayout(state)
  const hierarchy = getHierarchy(state)
  const newBuilderData = removeblockFromState(
    blockId,
    layouts,
    blocks,
    hierarchy
  )
  const isLastBlock = !Object.keys(newBuilderData.layouts).length

  if (isLastBlock) return
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

function applyAutoMobileToBlock(block) {
  const updatedBlock = {
    x: block.x / 2,
    y: block.y,
    w: block.w / 2,
    h: block.h,
    i: block.i,
  }
  return updatedBlock
}

function bulkApplyAutoMobileLayout(blocks, mobileLayout) {
  const newMobLayouts = Object.values(blocks).reduce(
    (acc, block) => {
      const newBlock = applyAutoMobileToBlock(block)
      return {
        ...acc,
        [block.i]: newBlock,
      }
    },
    { ...mobileLayout }
  )
  return newMobLayouts
}

function autoMobileLayout(mobileLayout, blockId, updatedLayout) {
  const updatedMobile = { ...mobileLayout }
  const block = updatedLayout[blockId]
  if (!block) return updatedMobile
  updatedMobile[blockId] = applyAutoMobileToBlock(block)
  return updatedMobile
}

function applyMobileLayout(mobileLayout, blockId, updatedLayout, hierarchy) {
  const childrenId = hierarchy[blockId]
  if (childrenId) {
    const blocksIdsToTransform = [blockId, ...childrenId]
    const blocksToTransform = Object.values(updatedLayout)
      .filter((blockId) => blocksIdsToTransform.includes(blockId.i))
      .reduce((acc, item) => ({ ...acc, [item.i]: item }), {})
    return bulkApplyAutoMobileLayout(blocksToTransform, mobileLayout)
  }
  return autoMobileLayout(mobileLayout, blockId, updatedLayout)
}

export const updateBlockLayout = (newBlockLayout) => (dispatch, getState) => {
  const layouts = { ...getLayout(getState()) }
  layouts[newBlockLayout.i] = newBlockLayout
  dispatch(updateLayouts(layouts, newBlockLayout.i))
  dispatch(saveDataOnLocal())
}

export const updateLayouts = (updatedLayout, blockId) => (
  dispatch,
  getState
) => {
  const builderDevice = getBuilderDevice(getState())
  const mobileEditedBlocks = getMobileEditedBlocks(getState())
  const mobileLayout = getMobileLayout(getState())
  const hierarchy = getHierarchy(getState())
  const isBlockMobileEdited = mobileEditedBlocks.includes(blockId)
  if (builderDevice === 'mobile') {
    batch(() => {
      dispatch(setMobileLayout(updatedLayout))
      if (!isBlockMobileEdited) {
        dispatch(setMobileEditedBlocks([...mobileEditedBlocks, blockId]))
      }
    })
  } else {
    if (!isBlockMobileEdited) {
      dispatch(
        setMobileLayout(
          applyMobileLayout(mobileLayout, blockId, updatedLayout, hierarchy)
        )
      )
    }
    dispatch(setLayouts(updatedLayout))
  }
  dispatch(saveDataOnLocal())
}
export const addNewLayoutItem = (newLayout) => (dispatch, getState) => {
  const layouts = getLayout(getState())
  const mobileLayout = getMobileLayout(getState())
  dispatch(
    setMobileLayout({
      ...mobileLayout,
      [newLayout.i]: applyAutoMobileToBlock(newLayout),
    })
  )
  dispatch(setLayouts({ ...layouts, [newLayout.i]: newLayout }))
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
    dispatch(setMobileHierarchy(newHierarchy))
    dispatch(setHierarchy(newHierarchy))
  }
}

export const addNewBlock = (blockLayout) => (dispatch, getState) => {
  const state = getState()
  const newLayout = getLayout(state)
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
  dispatch(saveDataOnLocal())
}

function objectToArrray(data) {
  if (Array.isArray(data)) return data
  return Object.values(data)
}

export function denormalizeBuilderData(data) {
  const deNormalizedData = {
    ...data,
    layouts: objectToArrray(data.layouts),
    mobileLayout: objectToArrray(data.mobileLayout),
  }
  return deNormalizedData
}

export const publishWebsite = (user) => async (dispatch, getState) => {
  dispatch(setPublishStatus('loading'))
  const builderData = denormalizeBuilderData(getBuilderData(getState()))
  const websiteId = getWebsiteId(getState())
  const res = await saveData({ user, builderData, publish: true })
  batch(() => {
    !websiteId && dispatch(setWebsiteId(res._id))
    dispatch(setPublishStatus('success'))
  })
}

export const saveWebsite = (user) => async (dispatch, getState) => {
  dispatch(setSaveStatus('loading'))
  const builderData = denormalizeBuilderData(getBuilderData(getState()))
  const userData = getUserData(getState())
  const res = await saveData({ user, builderData })
  const updatedUserData = {
    isPublish: res.publish,
    user_email: res.user_email,
    user_id: res.user_id,
    websiteId: res._id || userData?.websiteId,
  }
  batch(() => {
    dispatch(setUserData(updatedUserData))
    dispatch(setSaveStatus('success'))
  })
}

export const keepTemplate = () => async (dispatch, getState) => {
  const builderData = getBuilderData(getState())
  const { publish, userData } = getTempDBData(getState())
  await saveData({
    builderData,
    user: { sub: userData.user_id, email: userData.user_email, publish },
  })
  dispatch(setSaveStatus('null'))
  dispatch(setTempDBData(null))
  dispatch(setLoadingData(false))
}
export const keepDBData = () => (dispatch, getState) => {
  const tempInitialData = getTempDBData(getState())
  dispatch(updateInitialState(tempInitialData))
  dispatch(setTempDBData(null))
  dispatch(setLoadingData(false))
}
export const addDuplicatedBlock = (blockLayout, newBlockData) => (dispatch) => {
  batch(() => {
    dispatch(setAddedBlock({ blockID: blockLayout.i, newBlockData }))
    dispatch(addNewLayoutItem(blockLayout))
    dispatch(setNewDropBlock({ type: null }))
  })
}

const addDuplicatedToHierarchy = (
  newHierarchy,
  childId,
  oldHierarchy,
  relationsTable
) => {
  const updatedHierarchy = { ...newHierarchy }
  const parent = isBlockInHierarchy(oldHierarchy, childId)
  updatedHierarchy[relationsTable[parent]] = [
    ...(updatedHierarchy[relationsTable[parent]] || []),
    relationsTable[childId],
  ]
  return updatedHierarchy
}
const bulkDuplicate = (allChilds, blockId, newBlockId, state) => {
  const oldLayouts = getLayout(state)
  const oldHierarchy = getHierarchy(state)
  let newHierarchy = { [newBlockId]: [] }
  const newLayoutItems = {}
  const newBlocks = {}
  const relationsTable = { [blockId]: newBlockId }
  for (let childId of allChilds) {
    const blockData = getBlockData(childId)(state)
    if (blockData) {
      const layoutItem = { ...oldLayouts[childId] }
      const newBlockId = `${blockData.type}-${uuid()}`
      layoutItem.i = newBlockId
      layoutItem.x = layoutItem.x + 10
      layoutItem.y = layoutItem.y + 10
      newLayoutItems[layoutItem.i] = layoutItem
      newBlocks[layoutItem.i] = blockData
      relationsTable[childId] = newBlockId
      newHierarchy = addDuplicatedToHierarchy(
        newHierarchy,
        childId,
        oldHierarchy,
        relationsTable
      )
    }
  }

  return { newLayoutItems, newBlocks, newHierarchy }
}

// This is only for internal use
export const duplicateBlock = (blockId) => (dispatch, getState) => {
  const blockData = getBlockData(blockId)(getState())
  const blockType = blockData.type
  const oldLayouts = getLayout(getState())

  const oldHierarchy = getHierarchy(getState())
  const allChilds = [...new Set(findAllChildren(oldHierarchy, blockId))]
  const mobileLayout = getMobileLayout(getState())
  const duplicatedBlockLayout = { ...oldLayouts[blockId] }

  const newBlockId = `${blockType}-${uuid()}`
  duplicatedBlockLayout.i = newBlockId
  duplicatedBlockLayout.x = duplicatedBlockLayout.x + 10
  duplicatedBlockLayout.y = duplicatedBlockLayout.y + 10

  const { newLayoutItems, newBlocks, newHierarchy } = bulkDuplicate(
    allChilds,
    blockId,
    newBlockId,
    getState()
  )
  const mobileLayouts = bulkApplyAutoMobileLayout(newLayoutItems, mobileLayout)
  batch(() => {
    dispatch(addDuplicatedBlock(duplicatedBlockLayout, blockData))
    dispatch(
      setBulkAddItems({
        layouts: newLayoutItems,
        blocks: newBlocks,
        hierarchy: newHierarchy,
        mobileLayouts,
      })
    )
  })
  dispatch(saveDataOnLocal())
}

// NEW FUNCTUIONS ***********************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************

export const handleDragStop = (blockPos, blockId) => (dispatch, getState) => {
  const blockLayout = getBlockLayoutById(blockId)(getState())
  const gridRowHeight = getGridRowHeight(getState())
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
  const newX = blockPos.x / gridColumnWidth
  const newY = blockPos.y / gridRowHeight
  const newBlockLayout = {
    ...blockLayout,
    x: newX,
    y: newY,
  }
  const layouts = { ...getLayout(getState()) }
  const hierarchy = getHierarchy(getState())
  layouts[newBlockLayout.i] = newBlockLayout
  const updatedHierarchy = getUpdatedHierarchy(
    layouts,
    newBlockLayout,
    hierarchy
  )
  batch(() => {
    dispatch(updateLayouts(layouts, newBlockLayout.i))
    dispatch(updateHierarchy(updatedHierarchy))
  })
  dispatch(saveDataOnLocal())
}

export const handleResizeStop = (delta, blockId, blockType) => (
  dispatch,
  getState
) => {
  const blockLayout = getBlockLayoutById(blockId)(getState())
  const gridRowHeight = getGridRowHeight(getState())
  const isMobile = getIsMobileBuilder(getState())
  const gridsWidth = isMobile ? 100 : GRID_COLUMNS
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
  let width = blockLayout.w + delta.width / gridColumnWidth
  const height = blockLayout.h + delta.height / gridRowHeight
  width = width >= gridsWidth ? gridsWidth : width
  let textSize
  if (blockType === 'text') {
    const textEl = document.getElementById(blockId).childNodes
    textSize = textEl[textEl.length - 1].getBoundingClientRect()?.height
    textSize = textSize / gridRowHeight
  }
  dispatch(
    updateBlockLayout({
      ...blockLayout,
      w: width,
      h: textSize || height,
    })
  )
}

export const saveDataOnLocal = () => async (dispatch, getState) => {
  dispatch(setSaveStatus(null))
  setTimeout(() => {
    const builderData = getBuilderData(getState())
    saveOnLocal(builderData)
  }, 0)
}
export const handleResizeTextBlock = (newSize, blockId) => (
  dispatch,
  getState
) => {
  const blockLayout = getBlockLayoutById(blockId)(getState())
  const gridRowHeight = getGridRowHeight(getState())
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
  const width = newSize.width / gridColumnWidth
  const height = newSize.height / gridRowHeight
  dispatch(
    updateBlockLayout({
      ...blockLayout,
      w: width,
      h: height,
    })
  )
}

export function findAllChildren(hierarchy, elementDragginId) {
  let values = []
  if (!hierarchy?.[elementDragginId]) return null
  for (let elemId of hierarchy[elementDragginId]) {
    values = [
      ...values,
      ...hierarchy[elementDragginId],
      ...(hierarchy[elemId] || []),
      ...(findAllChildren(hierarchy, elemId) || []),
    ]
  }
  return values
}

export const handleDrag = (
  blockPos,
  newBlockLayout,
  blockId,
  gridColumnWidth,
  gridRowHeight
) => (dispatch, getState) => {
  const builderDevice = getBuilderDevice(getState())
  const hierarchy = getHierarchy(getState())
  const children = [...new Set(findAllChildren(hierarchy, blockId))]
  const layouts = { ...getLayout(getState()) }
  const updatedHierarchy = getUpdatedHierarchy(
    layouts,
    newBlockLayout,
    hierarchy
  )
  if (children) {
    for (let item of children) {
      let layoutItem = { ...layouts[item] }
      const newX =
        (layoutItem.x * gridColumnWidth + blockPos.deltaX) / gridColumnWidth
      const newY =
        (layoutItem.y * gridRowHeight + blockPos.deltaY) / gridRowHeight

      layoutItem.x = newX
      layoutItem.y = newY
      layouts[item] = layoutItem
    }
  }
  batch(() => {
    if (builderDevice === 'mobile') {
      dispatch(setMobileLayout(layouts))
    } else {
      dispatch(setLayouts(layouts))
    }
    dispatch(updateHierarchy(updatedHierarchy))
  })
}

// SELECTORS ****************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************
//***************************************************************

export const getBuilderData = (state) => state.builder.builderData
export const getHasBuilderData = (state) => !!state.builder.builderData
export const getIsLoadingData = (state) => state.builder.loadingData
export const getUserData = (state) => state.builder.user
export const getWebsiteId = (state) => state.builder.user?.websiteId
export const getBlocks = (state) => state.builder.builderData.blocks
export const getHierarchy = (state) => {
  // if (getBuilderDevice(state) === 'mobile') {
  //   return getMobileHierarchy(state)
  // }
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
export const getDraggingBlock = (state) => state.builder.draggingBlock
export const getBlocksConfig = (state) => state.builder.builderData.blocksConfig
export const getBlockParentId = (id) => (state) => {
  return findBlockParentId(getStructure(state), id)
}
export const getBlockLayoutById = (blockId) => (state) =>
  getLayout(state)[blockId]

export const getGridRowHeight = (state) => state.builder.gridRowHeight
export const getLayout = (state) => {
  if (getBuilderDevice(state) === 'mobile') {
    return getMobileLayout(state)
  }
  return getDesktopLayout(state)
}
export const getLayoutsKeys = (state) => {
  if (getBuilderDevice(state) === 'mobile') {
    return Object.keys(getMobileLayout(state) || [])
  }
  return Object.keys(getDesktopLayout(state) || [])
}
const getMobileLayout = (state) => state.builder.builderData.mobileLayout
const getDesktopLayout = (state) => state.builder.builderData.layouts
export const getStructure = (state) => state.builder.builderData.structure
export const getHasMobileBeenEdited = (state) =>
  state.builder.builderData.hasMobileBeenEdited
export const getMobileEditedBlocks = (state) =>
  state.builder.builderData.mobileEditedBlocks || []
export const getSaveStatus = (state) => state.builder.saveStatus
export const getPublishStatus = (state) => state.builder.publishStatus
export const getAccountCreated = (state) => state.builder.accountCreated
export const getTempDBData = (state) => state.builder.tempDBData

export default builderSlice.reducer
