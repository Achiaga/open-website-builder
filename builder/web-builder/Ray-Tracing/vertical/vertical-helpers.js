import { getGridPos } from '../helpers'

export function getVerticalBlocksDistances(orderedBlocks) {
  let distances = []
  for (let i = 0; i < orderedBlocks.length; i++) {
    const nextBlock = orderedBlocks[i + 1]
    if (!nextBlock) break
    const actualBlock = orderedBlocks[i]
    const distance = Math.abs(nextBlock.y - (actualBlock.y + actualBlock.h))
    distances.push(Math.round(distance))
  }
  return distances
}

function isBlockToRight(sB, dggB) {
  return Math.abs(dggB.x - sB.x) < 10
}
function isBlockToLeft(sb, dggB) {
  return Math.abs(dggB.x + dggB.w - (sb.x + sb.w)) < 10
}

function isBlockVertical(staticBlock, draggingBlock) {
  if (
    isBlockToRight(staticBlock, draggingBlock) ||
    isBlockToLeft(staticBlock, draggingBlock)
  ) {
    return true
  }
  return false
}

function orderBlocksTopToBottom(blockList) {
  return blockList.sort((a, b) => a.y - b.y)
}

function getVerticalElements(
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
    const isHoz = isBlockVertical(staticBlockPos, draggingBlock)
    if (isHoz) horizontalBlocks.push(staticBlockPos)
  }
  return horizontalBlocks
}

export function getYOrderedBlocks(
  layouts,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight
) {
  const horizontalBlocks = getVerticalElements(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )
  return orderBlocksTopToBottom([...horizontalBlocks, draggingBlock])
}

function isCenterAlign(origin, dest) {
  const originCenter = origin.x + origin.w / 2
  const destCenter = dest.x + dest.w / 2
  return originCenter - destCenter
}

function isLeftAlign(origin, dest) {
  return origin.x - dest.x
}
function isRightAlign(origin, dest) {
  return origin.x + origin.w - (dest.x + dest.w)
}
function isLeftAlignWithBottoms(origin, dest) {
  return origin.x - (dest.x + dest.w)
}
function isRightAlignWithTop(origin, dest) {
  return origin.x + origin.w - dest.x
}

export function getVerticalAlignment(origin, dest, dragBlock) {
  const center = isCenterAlign(origin, dest, dragBlock)
  const left = isLeftAlign(origin, dest, dragBlock)
  const right = isRightAlign(origin, dest, dragBlock)
  const leftRight = isLeftAlignWithBottoms(origin, dest)
  const rightLeft = isRightAlignWithTop(origin, dest)
  return {
    center,
    left,
    right,
    leftRight,
    rightLeft,
  }
}
