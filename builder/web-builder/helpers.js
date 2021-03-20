import { Box } from '@chakra-ui/react'
import localforage from 'localforage'

import { BuilderBlock } from '../blocks'
import { DELETE, EDIT } from '../blocks/constants'

import { blocksProperties } from './default-data'

export function reconstructBlocksConfig(
  blocksConfig,
  parentBlockKey,
  newBlocks
) {
  return {
    ...blocksConfig,
    [parentBlockKey]: {
      ...blocksConfig[parentBlockKey],
      data: {
        ...blocksConfig[parentBlockKey]?.data,
        ...newBlocks,
      },
    },
  }
}

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

export function deleteBlock(blocks, deletedBlockId) {
  const updatedBlocks = { ...blocks }
  delete updatedBlocks[deletedBlockId]
  return updatedBlocks
}

export function editBlock(blocks, id, newData, operationType = EDIT) {
  if (operationType === DELETE) return deleteBlock(blocks, id)
  return {
    ...blocks,
    [id]: {
      ...blocks[id],
      data: newData,
    },
  }
}

// Edit block layout properties *********************************

export const editItemDraggableProperty = (layout, editableBlockId) => {
  return [
    ...layout.map((layoutItem) => {
      const isSelectedItem = layoutItem.i === editableBlockId
      let isDraggable = isSelectedItem ? false : true
      return { ...layoutItem, isDraggable }
    }),
  ]
}

// Add editior function to inital blocks *********************************

export function addCallbackToBlock(blocksConfig, editBlockCallback) {
  if (!blocksConfig) return
  return Object.entries(blocksConfig)?.reduce((acc, [blockId, blockInfo]) => {
    return {
      ...acc,
      [blockId]: {
        ...blockInfo,
        data: {
          ...blockInfo.data,
          editBlock: editBlockCallback,
        },
      },
    }
  }, {})
}

// Block Builder

export const findBlock = (blocksConfig, blockId, parentId) => {
  let result
  for (const id in blocksConfig) {
    if (blockId === id) return { parentId, child: blocksConfig[id] }
    if (blocksConfig[id]?.data?.blocks) {
      result = findBlock(blocksConfig[id]?.data?.blocks, blockId, id)
      if (result) return result
    }
  }
  return result
}
export const getBlockById = (blocksConfig, blockId) => {
  let result
  for (const id in blocksConfig) {
    if (blockId === id) return blocksConfig[id]
    if (blocksConfig[id]?.data?.blocks) {
      result = getBlockById(blocksConfig[id]?.data?.blocks, blockId)
      if (result) return result
    }
  }
  return result
}

// export const generateBuilderBlocks = (blocksConfig, reRender) => {
//   if (!blocksConfig) return null

// }

// Builder
export function denormalizeBlockData(layout, blocksConfig) {
  return Object.entries(blocksConfig).reduce((acc, [blockKey, blockConfig]) => {
    return {
      ...acc,
      [blockKey]: {
        layout: {
          ...layout.find((layoutItem) => layoutItem.i === blockKey),
        },
        block: {
          ...removeEventListener(blockConfig),
        },
      },
    }
  }, {})
}

export function denormalizeInceptionBlock(layout, blockConfig) {
  const blocks = {
    ...denormalizeBlockData(layout, blockConfig),
  }
  return { blocks }
}

export function saveOnLocal(userBlocksData) {
  if (!Object.keys(userBlocksData).length) return
  localforage.setItem('userData', userBlocksData)
}

function removeEventListener(blockConfig) {
  // eslint-disable-next-line no-unused-vars
  const { editBlock, ...rest } = blockConfig.data
  return {
    ...blockConfig,
    data: {
      ...rest,
    },
  }
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
