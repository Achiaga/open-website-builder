import { getGridPos } from '../helpers'

function isBelowTop(staticBlock, draggingBlock) {
  return Math.abs(draggingBlock.y - staticBlock.y) < 10
}
function isAboveBottom(staticBlock, draggingBlock) {
  return (
    Math.abs(
      draggingBlock.y + draggingBlock.h - (staticBlock.y + staticBlock.h)
    ) < 10
  )
}

function isBlockHorizontal(staticBlock, draggingBlock) {
  if (
    isBelowTop(staticBlock, draggingBlock) ||
    isAboveBottom(staticBlock, draggingBlock)
  ) {
    return true
  }
  return false
}

function getHorizontalElement(
  layout,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight
) {
  const copyLayout = { ...layout }
  delete copyLayout[draggingBlock.i]

  const horizontalBlocks = []
  for (const block in copyLayout) {
    const staticBlockPos = getGridPos(
      layout[block],
      gridColumnWidth,
      gridRowHeight
    )
    const isHoz = isBlockHorizontal(staticBlockPos, draggingBlock)
    if (isHoz) horizontalBlocks.push(staticBlockPos)
  }
  return horizontalBlocks
}

function isCenterAlign(origin, dest) {
  const originCenter = origin.y + origin.h / 2
  const destCenter = dest.y + dest.h / 2
  return originCenter - destCenter
}

function isTopAlign(origin, dest) {
  return origin.y - dest.y
}
function isBottomsAlign(origin, dest) {
  return origin.y + origin.h - (dest.y + dest.h)
}
function isTopAlignWithBottoms(origin, dest) {
  return origin.y - (dest.y + dest.h)
}
function isBottomsAlignWithTop(origin, dest) {
  return origin.y + origin.h - dest.y
}

export function getIsAlign(diff) {
  return Math.abs(diff) < 0.5
}

export function getAlignment(origin, dest, dragBlock) {
  const center = isCenterAlign(origin, dest, dragBlock)
  const top = isTopAlign(origin, dest, dragBlock)
  const bottom = isBottomsAlign(origin, dest, dragBlock)
  const bottomTop = isTopAlignWithBottoms(origin, dest)
  const topBottom = isBottomsAlignWithTop(origin, dest)
  return {
    center,
    top,
    bottom,
    bottomTop,
    topBottom,
  }
}

function orderBlocksLeftToRight(blockList) {
  return blockList.sort((a, b) => a.x - b.x)
}

export function getBlocksDistances(orderedBlocks) {
  let distances = []
  for (let i = 0; i < orderedBlocks.length; i++) {
    const nextBlock = orderedBlocks[i + 1]
    if (!nextBlock) break
    const actualBlock = orderedBlocks[i]
    const distance = Math.abs(nextBlock.x - (actualBlock.x + actualBlock.w))
    distances.push(Math.round(distance))
  }
  return distances
}

export function getXOrderedBlocks(
  layouts,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight
) {
  const horizontalBlocks = getHorizontalElement(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )
  const blockList = [...horizontalBlocks, draggingBlock]
  const xOrderedBlocks = orderBlocksLeftToRight(blockList)
  return xOrderedBlocks
}
