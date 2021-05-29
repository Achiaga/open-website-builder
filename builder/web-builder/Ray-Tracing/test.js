import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'

function getGridPos2({ x, w, h, y }, gridColumnWidth, gridRowHeight) {
  const sx = x * gridColumnWidth
  const sy = y * gridRowHeight
  const sw = w * gridColumnWidth
  const sh = h * gridRowHeight
  return { x: sx, y: sy, w: sw, h: sh }
}

function isBelowTop(staticBlock, draggingBlock) {
  return (
    staticBlock.y <= draggingBlock.y + 2 &&
    staticBlock.y + staticBlock.h >= draggingBlock.y - 2
  )
}
function isAboveBottom(staticBlock, draggingBlock) {
  return (
    draggingBlock.y + draggingBlock.h >= staticBlock.y &&
    draggingBlock.y + draggingBlock.h <= staticBlock.y + staticBlock.h
  )
}

function isBlockHorizontal(staticBlock, draggingBlock) {
  if (
    isBelowTop(staticBlock, draggingBlock) ||
    isAboveBottom(staticBlock, draggingBlock)
  ) {
    return true
  }
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
    const staticBlockPos = getGridPos2(
      layout[block],
      gridColumnWidth,
      gridRowHeight
    )
    const isHoz = isBlockHorizontal(staticBlockPos, draggingBlock)
    if (isHoz) horizontalBlocks.push(staticBlockPos)
  }

  return horizontalBlocks
}

const RayToBlock = ({ origin, dest, distance }) => {
  const leftDist = origin.x + origin.w
  const width = dest.x - origin.x - origin.w
  return (
    <Box
      zIndex="9999"
      bg="green.500"
      pos="absolute"
      top={`${origin.y + origin.h / 2}px`}
      left={`${leftDist}px`}
      width={`${width}px`}
      h="2px"
    >
      <Box d="flex" justifyContent="space-between" color="red">
        <Box as="span" lineHeight="0">
          X
        </Box>
        <Box>{Math.round(distance)}</Box>
        <Box as="span" lineHeight="0">
          X
        </Box>
      </Box>
    </Box>
  )
}

function orderBlocksLeftToRight(blockList) {
  return blockList.sort((a, b) => a.x - b.x)
}

function getSameDistance(orderedBlocks) {
  let distances = []
  for (let i = 0; i < orderedBlocks.length; i++) {
    const actualBlock = orderedBlocks[i]
    const nextBlock = orderedBlocks[i + 1]
    if (!nextBlock) break
    const distance = Math.abs(nextBlock.x - (actualBlock.x + actualBlock.w))
    distances.push(distance)
  }
  return distances
}

export const TestRayTracing = ({
  gridColumnWidth,
  blockPostRef,
  blockId,
  builderRef,
}) => {
  const draggingBlockPos = blockPostRef || {}
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)

  const draggingBlock = {
    i: blockId,
    x: draggingBlockPos.x,
    y: draggingBlockPos.y,
    w: draggingBlockPos.w,
    h: draggingBlockPos.h,
  }
  const horizontalBlocks = getHorizontalElement(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )
  const blockList = [...horizontalBlocks, draggingBlock]
  const orderedBlocks = orderBlocksLeftToRight(blockList)
  const distances = getSameDistance(orderedBlocks)

  return (
    <Portal id="main-builder" containerRef={builderRef}>
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
      {orderedBlocks.map((block, index) => {
        const isLastBlock = index >= orderedBlocks.length - 1
        if (isLastBlock) return null
        return (
          <RayToBlock
            origin={block}
            dest={orderedBlocks[index + 1]}
            distance={distances[index]}
            key={index}
          />
        )
      })}
    </Portal>
  )
}
