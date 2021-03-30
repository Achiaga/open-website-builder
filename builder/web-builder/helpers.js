import localforage from 'localforage'

import { blocksProperties } from './default-data'
import { findAllChildren } from '../../components/react-grid-layout/utils'
// Block Factory *********************************

export function addBlock(newId, blockType) {
  return {
    type: blockType,
    data: {
      ...blocksProperties[blockType],
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
  blockId,
  oldLayout,
  oldBlocks,
  oldHierarchy,
  children
) {
  const blocks = { ...oldBlocks }
  let layouts = [...oldLayout]
  const hierarchy = { ...oldHierarchy }
  const blocksToRemve = [...children, blockId]
  for (const blockId of blocksToRemve) {
    delete blocks[blockId]
    delete hierarchy[blockId]
  }
  layouts = layouts.filter((layout) => !blocksToRemve.includes(layout.i))
  return { layouts, blocks, hierarchy }
}

export function removeblockFromState(
  blockId,
  oldLayout,
  oldBlocks,
  oldHierarchy
) {
  const findAllChild = findAllChildren(oldHierarchy, blockId)
  const blocks = { ...oldBlocks }
  let layouts = [...oldLayout]
  if (!findAllChild?.length) {
    delete blocks[blockId]
    layouts = layouts.filter((layout) => layout.i !== blockId)
    return { layouts, blocks, hierarchy: oldHierarchy }
  }
  if (oldHierarchy[blockId]) {
    return removeAllBlockChildren(
      blockId,
      layouts,
      blocks,
      oldHierarchy,
      findAllChild
    )
  }
}

export function saveOnLocal(userBlocksData) {
  if (!Object.keys(userBlocksData).length) return
  localforage.setItem('userData', userBlocksData)
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
  return child.x >= parent.x && child.x <= parent.x + parent.w
}
function containsInY(parent, child) {
  return child.y >= parent.y && child.y <= parent.y + parent.h
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

function isBlockInHierarchy(hierarchy, item) {
  return Object.keys(hierarchy).reduce((acc, parentId) => {
    const isParentsChild = hierarchy[parentId].find((child) => child === item.i)
    if (isParentsChild) return parentId
    return acc
  }, null)
}

function getAllInceptions(newLayout) {
  return newLayout.filter(({ i }) => i.includes('inception'))
}

function getIsGammaInception(hierarchy, parentId, parents) {
  const parentsIds = parents.map((parent) => parent.i)
  const childsId = hierarchy?.[parentId]
  const inceptionChilds = childsId?.filter((childId) =>
    parentsIds.includes(childId)
  )
  console.log('parentsIds', parentsIds)
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

function shoudlRemoveChildFromOldParent(oldParentId, newParent) {
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
// this functions checks if the item you are goint to add to the new parent already has
// the parent inside their childre
// If this happens it will create an infinite loop of who owns who
function breaksSpaceTime(hierarchy, newItemId, newParentId) {
  const newItemChildrens = hierarchy?.[newItemId] || []
  return newItemChildrens.includes(newParentId)
}

export function getUpdatedHierarchy(newLayout, newItem, hierarchy) {
  let updatedHierarchy = { ...(hierarchy || {}) }
  const newParent = getParentBlock(newLayout, newItem, hierarchy)
  const oldParentId = isBlockInHierarchy(updatedHierarchy, newItem)
  if (shoudlRemoveChildFromOldParent(oldParentId, newParent)) {
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
    lastHoveredEl.current.style.backgroundColor = 'transparent'
  }
  if (newParentId) {
    const elem = document.getElementById(newParentId)?.children?.[0]
    elem.style.backgroundColor = '#27b36647'
    lastHoveredEl.current = elem
  }
}
