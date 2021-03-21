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
