import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import CenterAligmentRay from './center-aligment-ray'
import LeftRay from './left-ray'

function isBlockOnRow(staticBlockY, draggingBlock, staticBlockHeight) {
  return (
    staticBlockY <= draggingBlock.y &&
    staticBlockY + staticBlockHeight >= draggingBlock.y
  )
}
function isBlockOnRight(staticBlockX, draggingBlock) {
  return staticBlockX <= draggingBlock.x
}
function getGridPos({ x, w, h, y }, gridColumnWidth, gridRowHeight) {
  const sbX = x * gridColumnWidth
  const sbY = y * gridRowHeight
  const sbW = w * gridColumnWidth
  const sbH = h * gridRowHeight
  return { sbX, sbY, sbW, sbH }
}

function hasNoHorizontalBlocks(closest) {
  return closest.diff === Infinity
}

function getSidesBorderPos(draggingBlock) {
  const isBlockOnRight = draggingBlock.x > window.innerWidth / 2
  const diff = isBlockOnRight
    ? window.innerWidth - Math.round(draggingBlock.x)
    : Math.round(draggingBlock.x)
  return { x: 0, diff: diff, right: isBlockOnRight }
}

function isBlockOnCenterY(sbY, sbH, dgB) {
  const draggingBlockHalf = dgB.y + dgB.h / 2
  const staticBlockHalf = sbY + sbH / 2
  return (
    draggingBlockHalf - 1 < staticBlockHalf &&
    draggingBlockHalf + 1 > staticBlockHalf
  )
}
function isBlockOnCenterX(sbX, sbW, dgB) {
  const draggingBlockHalf = dgB.x + dgB.w / 2
  const staticBlockHalf = sbX + sbW / 2
  return (
    draggingBlockHalf - 1 < staticBlockHalf &&
    draggingBlockHalf + 1 > staticBlockHalf
  )
}

function getIsDraggingBlockRight(dgB, sbX, sbW) {
  return dgB.x > sbX + sbW
}
function getIsDraggingBlockPartyallyInsideStatic(dgB, sbX, sbW) {
  return dgB.x + dgB.w > sbX && dgB.x < sbX && dgB.x + dgB.w < sbX + sbW
}

function getDiff(
  isDraggingBlockRight,
  partiallyInisdeStatic,
  isDraggingBlockInside,
  dgB,
  sbX,
  sbW
) {
  const diffLeft = isDraggingBlockInside
    ? Math.round(dgB.x - sbX)
    : Math.round(dgB.x + dgB.w - sbX)

  const diffRight = Math.round(dgB.x - (sbX + sbW))
  if (partiallyInisdeStatic) return Math.abs(dgB.x + dgB.w - (sbX + sbW))
  if (isDraggingBlockRight) return Math.abs(diffRight)
  return Math.abs(diffLeft)
}

function getBlockDistantToNextBlock(dgB, sbX, sbW) {
  const isDraggingBlockInside = dgB.x >= sbX && dgB.x <= sbX + sbW
  const isDraggingBlockRight = getIsDraggingBlockRight(dgB, sbX, sbW)
  const partiallyInisdeStatic = getIsDraggingBlockPartyallyInsideStatic(
    dgB,
    sbX,
    sbW
  )
  const diff = getDiff(
    isDraggingBlockRight,
    partiallyInisdeStatic,
    isDraggingBlockInside,
    dgB,
    sbX,
    sbW
  )
  return diff
}

function isInsideX(draggingBlockPos, staticBlockPos) {
  const { sbX } = staticBlockPos
  return (
    draggingBlockPos.x <= sbX && draggingBlockPos.x + draggingBlockPos.w >= sbX
  )
}
function isInsideY(draggingBlockPos, staticBlockPos) {
  const { sbY } = staticBlockPos
  return (
    draggingBlockPos.y <= sbY && draggingBlockPos.y + draggingBlockPos.h >= sbY
  )
}

function getIsStaticBlockInside(draggingBlockPos, staticBlockPos) {
  return (
    isInsideX(draggingBlockPos, staticBlockPos) &&
    isInsideY(draggingBlockPos, staticBlockPos)
  )
}

function getClosestElement(
  layout,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight
) {
  const copyLayout = { ...layout }
  delete copyLayout[draggingBlock.i]
  let closest = {
    x: 0,
    diff: Infinity,
    middleX: false,
    middleY: false,
    middle: false,
  }

  for (let block in copyLayout) {
    const { i } = layout[block]
    const staticBlockPos = getGridPos(
      layout[block],
      gridColumnWidth,
      gridRowHeight
    )
    const { sbX, sbY, sbW, sbH } = staticBlockPos
    const isBlockCenterX = isBlockOnCenterX(sbX, sbW, draggingBlock)
    const isBlockCenterY = isBlockOnCenterY(sbY, sbH, draggingBlock)
    const isStaticBlockInside = getIsStaticBlockInside(
      draggingBlock,
      staticBlockPos
    )

    if ((isBlockCenterX || isBlockCenterY) && !isStaticBlockInside) {
      return {
        middle: true,
        middleX: isBlockCenterX,
        middleY: isBlockCenterY,
        x: sbX,
        w: sbW,
        h: sbH,
        y: sbY,
      }
    }

    if (isBlockOnRow(sbY, draggingBlock, sbH) && !isStaticBlockInside) {
      const diff = getBlockDistantToNextBlock(draggingBlock, sbX, sbW)
      if (closest.diff > diff) {
        closest = {
          ...closest,
          x: sbX,
          diff: diff,
          i,
          right: !isBlockOnRight(sbX, draggingBlock),
        }
      }
    }
  }

  if (hasNoHorizontalBlocks(closest)) return getSidesBorderPos(draggingBlock)

  return closest
}

export const RayTracing = ({
  width,
  gridColumnWidth,
  blockPostRef2,
  blockId,
  isDragging,
}) => {
  if (!isDragging) return null
  const draggingBlockPos = blockPostRef2 || {}
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)
  const windowWidth = window.innerWidth
  const leftDis = Math.round(draggingBlockPos?.x + width / 2)
  const item = {
    i: blockId,
    x: draggingBlockPos.x,
    y: draggingBlockPos.y,
    w: draggingBlockPos.w,
    h: draggingBlockPos.h,
  }
  const closestItem = getClosestElement(
    layouts,
    item,
    gridColumnWidth,
    gridRowHeight
  )
  const isMidScreen =
    leftDis - 1 <= windowWidth / 2 && leftDis + 1 >= windowWidth / 2
  return (
    <>
      {closestItem.middle && (
        <CenterAligmentRay
          draggingBlockPos={draggingBlockPos}
          closestItem={closestItem}
        />
      )}
      {isMidScreen && (
        <Portal id="main-builder">
          <Box
            pos="absolute"
            left="50%"
            transform="translate(-50%,0)"
            top="0"
            zIndex="9999"
            bg="green.500"
            width="1px"
            h="100%"
          />
        </Portal>
      )}
      <LeftRay closestItem={closestItem} draggingBlockPos={draggingBlockPos} />
    </>
  )
}
