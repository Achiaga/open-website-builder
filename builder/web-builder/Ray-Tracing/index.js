import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'

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

function hasNoLeftBlocks(closest) {
  return closest.diff === Infinity
}

function getLeftBorderPos(draggingBlock) {
  return { x: 0, diff: Math.round(draggingBlock.x) }
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

    if (isBlockOnRow(sbY, dgB, sbH) && isBlockOnRight(sbX, dgB)) {
      const diff = getBlockDistantToNextBlock(dgB, sbX, sbW)

      if (diff < closest.diff) {
        closest = { ...closest, x: sbX, diff: diff, i }
      }
    }
  }

  if (hasNoLeftBlocks(closest)) return getLeftBorderPos(dgB)

  return closest
}

function getHorizontalLineDim(draggingBlockPos, closestItem) {
  if (draggingBlockPos.x < closestItem.x + closestItem.w)
    return {
      width: closestItem.w,
      left: closestItem.x,
      inside: true,
    }
  return {
    width:
      draggingBlockPos.x +
      draggingBlockPos.w / 2 -
      (closestItem.x + closestItem.w / 2),
    left: closestItem.x + closestItem.w / 2,
  }
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
  if (closestItem.middle) {
    const hrLineDim = getHorizontalLineDim(draggingBlockPos, closestItem)
    console.log(hrLineDim)
    return (
      <Portal id="main-builder">
        {closestItem.middleX && (
          <Box
            pos="absolute"
            left={`${closestItem.w / 2 + closestItem.x}px`}
            top={`${closestItem.y}px`}
            zIndex="2"
            bg="green.500"
            width="1px"
            h={`${closestItem.h}px`}
          />
        )}
        {closestItem.middleY && (
          <Box
            pos="absolute"
            left={`${hrLineDim.left}px`}
            top={`${closestItem.y + closestItem.h / 2}px`}
            zIndex="2"
            bg="green.500"
            width={`${hrLineDim.width}px`}
            h="1px"
            d="flex"
            justifyContent="space-between"
            fontSize="xs"
          >
            <Box
              textAlign="flex-start"
              lineHeight="0"
              color="red.400"
              ml="-3px"
            >
              x
            </Box>
            {!hrLineDim.inside && (
              <Box textAlign="center" fontSize="xs">
                {Math.round(width)}
              </Box>
            )}
            <Box textAlign="flex-end" lineHeight="0" color="red.400" mr="-3px">
              x
            </Box>
          </Box>
        )}
      </Portal>
    )
  }
  //Left Ray tracing
  return (
    <Box
      pos="absolute"
      left={`${-closestItem.diff}px`}
      zIndex="2"
      bg="green.500"
      width={`${closestItem.diff}px`}
      h="1px"
      flexDir="row"
      d="flex"
      justifyContent="space-between"
    >
      <Box
        textAlign="flex-start"
        lineHeight="0"
        fontSize="2xs"
        color="red.400"
        ml="-3px"
      >
        x
      </Box>
      <Box textAlign="center">{closestItem.diff}</Box>
      <Box
        textAlign="flex-end"
        lineHeight="0"
        fontSize="2xs"
        color="red.400"
        mr="-3px"
      >
        x
      </Box>
    </Box>
  )
  // Middle Screen line
  // if (leftDis - 20 <= windowWidth / 2 && leftDis + 20 >= windowWidth / 2) {
  //   return (
  //     <>
  //       <Box
  //         pos="absolute"
  //         left="50%"
  //         transform="translate(-50%,0)"
  //         top="0"
  //         zIndex="9999"
  //         bg="green.500"
  //         width="1px"
  //         h="100%"
  //       />
  //       <Box
  //         pos="absolute"
  //         left={blockPosRef.x}
  //         top={blockPosRef.y}
  //         zIndex="9999"
  //         bg="green.500"
  //         width={`${diff}px`}
  //         h="1px"
  //       />
  //     </>
  //   )
  // }
}
