import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'

function getGridPos({ x, w, h, y, i }, gridColumnWidth, gridRowHeight) {
  const sx = x * gridColumnWidth
  const sy = y * gridRowHeight
  const sw = w * gridColumnWidth
  const sh = h * gridRowHeight
  return { x: sx, y: sy, w: sw, h: sh, i }
}

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
    isBelowTop(staticBlock, draggingBlock) &&
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

function getIsAlign(diff) {
  return Math.abs(diff) < 0.5
}

function getAlignment(origin, dest, dragBlock) {
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

const HorizontalRays = ({ alignment, dest, origin, isEquidistant }) => {
  return (
    <>
      {getIsAlign(alignment.center) && (
        <AlignmentRay
          top={origin.y + origin.h / 2}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.top) && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.bottom) && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.bottomTop) && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
      {getIsAlign(alignment.topBottom) && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
          isEquidistant={isEquidistant}
        />
      )}
    </>
  )
}
const AlignmentRay = ({
  top,
  left,
  width,
  distance,
  widthX,
  isEquidistant,
}) => {
  return (
    <Box
      zIndex="9999"
      bg={isEquidistant ? 'green.500' : 'blue.500'}
      pos="absolute"
      top={`${top}px`}
      left={`${left}px`}
      width={`${width}px`}
      h={isEquidistant ? '2px' : '1px'}
    >
      <Box
        d="flex"
        width="100%"
        color={isEquidistant ? 'green.500' : 'red'}
        pos="relative"
      >
        {widthX && distance > 0 ? (
          <Box
            as="span"
            lineHeight="0"
            letterSpacing="0"
            pos="absolute"
            left={isEquidistant ? '-5px' : '-2px'}
            fontSize={isEquidistant ? 'sm' : '2xs'}
          >
            X
          </Box>
        ) : null}
        {distance > 0 ? (
          <Box
            pos="absolute"
            left="50%"
            transform="translateX(-50%)"
            color="gray.500"
          >
            {Math.round(distance)}
          </Box>
        ) : null}
        {widthX && distance > 0 ? (
          <Box
            as="span"
            lineHeight="0"
            letterSpacing="0"
            pos="absolute"
            right={isEquidistant ? '-5px' : '-2px'}
            fontSize={isEquidistant ? 'sm' : '2xs'}
          >
            X
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

const DragToBlock = ({ dragBlock, blocks }) => {
  const copyBlocks = blocks.filter((block) => block.i !== dragBlock.i)
  return copyBlocks.map((block, index) => {
    const [dest, origin] = [block, dragBlock].sort((a, b) => b.x - a.x)
    const alignment = getAlignment(origin, dest, origin)
    return (
      <HorizontalRays
        alignment={alignment}
        origin={origin}
        dest={dest}
        key={index}
        showCenter={false}
        isEquidistant
      />
    )
  })
}

function orderBlocksLeftToRight(blockList) {
  return blockList.sort((a, b) => a.x - b.x)
}

function getSameDistance(orderedBlocks) {
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

function distanceOccurrences(distances) {
  var occurrences = {}

  for (var i = 0; i < distances.length; i++) {
    var num = distances[i]
    occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1
  }
  return occurrences
}

function getXOrderedBlocks(
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

const RayToBlock = ({ origin, index, distances, blocks }) => {
  const dest = blocks[index + 1]
  const distance = Math.round(dest.x - origin.x - origin.w)
  const isEquidistant = distances[distance] > 1
  return (
    <AlignmentRay
      top={origin.y + origin.h / 2}
      left={origin.x + origin.w}
      width={distance}
      distance={distance}
      isEquidistant={isEquidistant}
      widthX
    />
  )
}

export const TestRayTracing = ({
  gridColumnWidth,
  blockPostRef: draggingBlock,
  builderRef,
}) => {
  if (!draggingBlock) return null
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)

  const xOrderedBlocks = getXOrderedBlocks(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )
  const distances = distanceOccurrences(getSameDistance(xOrderedBlocks))

  return (
    <Portal id="main-builder" containerRef={builderRef}>
      {xOrderedBlocks.map((block, index) => {
        const isLastBlock = index >= xOrderedBlocks.length - 1
        if (isLastBlock) return null
        return (
          <RayToBlock
            origin={block}
            index={index}
            blocks={xOrderedBlocks}
            distances={distances}
            key={index}
          />
        )
      })}
      <DragToBlock dragBlock={draggingBlock} blocks={xOrderedBlocks} />
    </Portal>
  )
}
