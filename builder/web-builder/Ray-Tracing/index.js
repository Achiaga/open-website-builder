import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import CenterAligmentRay from './center-aligment-ray'
import LeftRay from './left-ray'

function isBlockOnRow(staticBlockY, draggingBlock, staticBlockHeight) {
  return (
    staticBlockY < draggingBlock.y &&
    staticBlockY + staticBlockHeight > draggingBlock.y
  )
}
function isBlockOnRight(staticBlockX, draggingBlock) {
  return staticBlockX < draggingBlock.x
}
function getGridPos({ x, w, h, y }, gridColumnWidth, gridRowHeight) {
  const sbX = x * gridColumnWidth
  const sbY = y * gridRowHeight
  const sbW = w * gridColumnWidth
  const sbH = h * gridRowHeight
  return { sbX, sbY, sbW, sbH }
}

function hasHorizontalBlocks(closest) {
  return closest.diff === Infinity
}

function getSidesBorderPos(draggingBlock) {
  const isBlockOnRight = draggingBlock.x > window.innerWidth / 2
  return { x: 0, diff: Math.round(draggingBlock.x), right: isBlockOnRight }
}

function isBlockOnCenterY(sbY, sbH, dgB) {
  const draggingBlockHalf = dgB.y + dgB.h / 2
  const staticBlockHalf = sbY + sbH / 2
  return (
    draggingBlockHalf - 5 < staticBlockHalf &&
    draggingBlockHalf + 5 > staticBlockHalf
  )
}
function isBlockOnCenterX(sbX, sbW, dgB) {
  const draggingBlockHalf = dgB.x + dgB.w / 2
  const staticBlockHalf = sbX + sbW / 2
  return (
    draggingBlockHalf - 5 < staticBlockHalf &&
    draggingBlockHalf + 5 > staticBlockHalf
  )
}

function getBlockDistantToNextBlock(dgB, sbX, sbW) {
  const diffLeft = Math.round(dgB.x - sbX)
  const diffRight = Math.round(dgB.x - (sbX + sbW))
  const isBlockRight = dgB.x > sbX + sbW
  const diff = Math.abs(isBlockRight ? diffRight : diffLeft)
  return diff
}

function getClosestElement(layout, dgB, gridColumnWidth, gridRowHeight) {
  const copyLayout = { ...layout }
  delete copyLayout[dgB.i]
  let closest = {
    x: 0,
    diff: Infinity,
    middleX: false,
    middleY: false,
    middle: false,
  }

  for (let block in copyLayout) {
    const { i } = layout[block]
    const { sbX, sbY, sbW, sbH } = getGridPos(
      layout[block],
      gridColumnWidth,
      gridRowHeight
    )
    const isBlockCenterX = isBlockOnCenterX(sbX, sbW, dgB)
    const isBlockCenterY = isBlockOnCenterY(sbY, sbH, dgB)
    if (isBlockCenterX || isBlockCenterY) {
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
    if (isBlockOnRow(sbY, dgB, sbH)) {
      const diff = getBlockDistantToNextBlock(dgB, sbX, sbW)
      closest = {
        ...closest,
        x: sbX,
        diff: diff,
        i,
        right: !isBlockOnRight(sbX, dgB),
      }
    }
  }

  if (hasHorizontalBlocks(closest)) return getSidesBorderPos(dgB)

  return closest
}

export const RayTracing = ({
  width,
  gridColumnWidth,
  blockPostRef2,
  blockId,
}) => {
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
    leftDis - 2 <= windowWidth / 2 && leftDis + 2 >= windowWidth / 2
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

// <Box
//   pos="absolute"
//   left={blockPosRef.x}
//   top={blockPosRef.y}
//   zIndex="9999"
//   bg="green.500"
//   width={`${diff}px`}
//   h="1px"
// />
