import localforage from 'localforage'
import { findAllChildren } from '../../features/builderSlice'

import { blocksProperties } from './default-data'
// Block Factory *********************************

function getBlockPropertiesKey(blockType, blockSubType) {
  if (blockSubType) return `${blockType}-${blockSubType}`
  return blockType
}

export function addBlock(newId, blockType, blockSubType) {
  return {
    type: blockType,
    subType: blockSubType,
    data: {
      ...blocksProperties[getBlockPropertiesKey(blockType, blockSubType)],
    },
  }
}

// Block Edition *********************************

export const findBlockParentId = (structure, blockId) => {
  for (const id in structure) {
    if (blockId === id) return { parentId: blockId || id }
    if (structure[id].find((childBlockId) => childBlockId === blockId)) {
      return id
    }
  }
}

function removeAllBlockChildren(
  oldLayout,
  oldBlocks,
  oldHierarchy,
  oldEditedBlocks,
  blocksToRemove
) {
  const blocks = { ...oldBlocks }
  let layouts = { ...oldLayout }
  const hierarchy = { ...oldHierarchy }

  let mobileEditedBlocks = [...(oldEditedBlocks || [])]
  for (const blockId of blocksToRemove) {
    delete blocks[blockId]
    delete hierarchy[blockId]
    delete layouts[blockId]
    mobileEditedBlocks = mobileEditedBlocks.filter((item) => item !== blockId)
  }
  return { layouts, blocks, hierarchy, mobileEditedBlocks }
}

export function removeBlockFromState(
  blockId,
  oldLayout,
  oldBlocks,
  oldHierarchy,
  mobileEditedBlocks
) {
  const children = findAllChildren(oldHierarchy, blockId) || []
  const blocksToRemove = [...children, blockId]
  const blocks = { ...oldBlocks }
  let layouts = { ...oldLayout }
  let editedBlocks = [...(mobileEditedBlocks || [])]
  return removeAllBlockChildren(
    layouts,
    blocks,
    oldHierarchy,
    editedBlocks,
    blocksToRemove
  )
}

function parseLayoutToArr(layout) {
  return Object.values(layout).map((item) => ({
    x: item.x,
    y: item.y,
    i: item.i,
    w: item.w,
    h: item.h,
  }))
}

export function saveOnLocal(userBlocksData) {
  if (!Object.keys(userBlocksData).length) return
  const dataToSave = {
    ...userBlocksData,
    layouts: parseLayoutToArr(userBlocksData.layouts),
    mobileLayout: parseLayoutToArr(userBlocksData.mobileLayout),
  }
  localforage.setItem('userData', dataToSave)
}
export function removeLocalData() {
  return localforage.removeItem('userData')
}

export function normalizeLayout(userBlocksData) {
  if (!userBlocksData) return []
  return Object.values(userBlocksData).map((block) => {
    return block.layout
  })
}
export function normalizeBlockStructure(userBlocksData) {
  if (!userBlocksData) return {}
  return Object.entries(userBlocksData).reduce((acc, [blockId, value]) => {
    return {
      ...acc,
      [blockId]: value.block,
    }
  }, {})
}

function containsInX(parent, child) {
  return child.x >= parent.x - 2 && child.x <= parent.x + parent.w - 2
}
function containsInY(parent, child) {
  return child.y >= parent.y - 2 && child.y <= parent.y + parent.h - 2
}

function isNewItemInsideInception(parent, child) {
  if (parent.i === child.i) return false
  if (containsInX(parent, child) && containsInY(parent, child)) return true
  return false
}

function findItemParent(item, parents) {
  return parents.filter((parentCandidate) =>
    isNewItemInsideInception(parentCandidate, item)
  )
}

export function isBlockInHierarchy(hierarchy, itemId) {
  return Object.keys(hierarchy).reduce((acc, parentId) => {
    const isParentsChild = hierarchy[parentId].find((child) => child === itemId)
    if (isParentsChild) return parentId
    return acc
  }, null)
}

function getAllInceptions(newLayout) {
  return Object.values(newLayout).filter(({ i }) => i?.includes('inception'))
}

function getIsGammaInception(hierarchy, parentId, parents) {
  const parentsIds = parents.map((parent) => parent.i)
  const childsId = hierarchy?.[parentId]
  const inceptionChilds = childsId?.filter((childId) =>
    parentsIds.includes(childId)
  )
  const isGammaInception = !inceptionChilds || inceptionChilds?.length < 1
  return isGammaInception
}

function getClosetParent(parents, hierarchy) {
  if (parents.length < 2) return parents[0]
  for (let parent of parents) {
    const isGammaInception = getIsGammaInception(hierarchy, parent.i, parents)
    if (isGammaInception) {
      return parent
    }
  }
  return parents[0]
}

export function removeChildFromOldParent(hierarchy, oldParentId, itemId) {
  if (oldParentId === itemId) return hierarchy
  let updatedHierarchy = { ...(hierarchy || {}) }
  updatedHierarchy[oldParentId] = updatedHierarchy[oldParentId].filter(
    (child) => child !== itemId
  )

  return updatedHierarchy
}
function addChildToNewParent(hierarchy, newParentId, newItemId) {
  let updatedHierarchy = { ...(hierarchy || {}) }
  updatedHierarchy[newParentId] = [
    ...(updatedHierarchy[newParentId] || []),
    newItemId,
  ]
  return updatedHierarchy
}

function shouldRemoveChildFromOldParent(oldParentId, newParent) {
  return (
    (oldParentId && newParent?.i !== oldParentId) ||
    (oldParentId && !newParent?.i)
  )
}

function shouldAddChildToNewParent(
  newParent,
  oldParentId,
  newItemId,
  hierarchy
) {
  return (
    !!newParent &&
    newParent?.i !== oldParentId &&
    !breaksSpaceTime(hierarchy, newItemId, newParent.i)
  )
}

export function getParentBlock(newLayout, newItem, hierarchy) {
  const allInceptions = getAllInceptions(newLayout)
  const blockParentCandidates = findItemParent(newItem, allInceptions)
  const newParent = getClosetParent(blockParentCandidates, hierarchy)
  return newParent
}

// this function protects us from infinity loops that break space & time
// this functions checks if the item you are going to add to the new parent already has
// the parent inside their children
// If this happens it will create an infinite loop of who owns who
function breaksSpaceTime(hierarchy, newItemId, newParentId) {
  const newItemChildrens = hierarchy?.[newItemId] || []
  return newItemChildrens.includes(newParentId)
}

export function getUpdatedHierarchy(newLayout, newItem, hierarchy) {
  let updatedHierarchy = { ...(hierarchy || {}) }
  const newParent = getParentBlock(newLayout, newItem, hierarchy)
  const oldParentId = isBlockInHierarchy(updatedHierarchy, newItem?.i)
  if (shouldRemoveChildFromOldParent(oldParentId, newParent)) {
    updatedHierarchy = removeChildFromOldParent(
      updatedHierarchy,
      oldParentId,
      newItem.i
    )
  }
  if (shouldAddChildToNewParent(newParent, oldParentId, newItem.i, hierarchy)) {
    updatedHierarchy = addChildToNewParent(
      updatedHierarchy,
      newParent.i,
      newItem.i
    )
  }
  return updatedHierarchy
}

export function highlightFutureParentBlock(newParentId, lastHoveredEl) {
  if (lastHoveredEl.current) {
    lastHoveredEl.current.style.backgroundColor = null
  }
  if (newParentId) {
    const elem = document.getElementById(newParentId)?.children?.[0]
    if (elem?.style) {
      elem.style.backgroundColor = '#27b36647'
      lastHoveredEl.current = elem
    }
  }
}

export function cleanLayouts(layouts) {
  return Object.values(layouts).reduce((acc, layoutItem) => {
    if (!layoutItem.i) return acc
    return {
      ...acc,
      [layoutItem.i]: layoutItem,
    }
  }, {})
}
