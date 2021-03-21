import localforage from 'localforage'

import { blocksProperties } from './default-data'

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

export const findBlockParentId = (blocksConfig, blockId) => {
  for (const id in blocksConfig) {
    if (blockId === id) return { parentId: blockId || id }
    if (blocksConfig[id].find((childBlockId) => childBlockId === blockId)) {
      return id
    }
  }
}

export function removeblockFromState(
  blockId,
  oldLayout,
  oldBlocks,
  oldStructure
) {
  const parentId = findBlockParentId(oldStructure, blockId)
  const blocks = { ...oldBlocks }
  delete blocks[blockId]
  const layouts = { ...oldLayout }
  delete layouts[blockId]
  const structure = {
    ...oldStructure,
    [parentId]: oldStructure[parentId].filter((sI) => sI !== blockId),
  }
  return { layouts, blocks, structure }
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
