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
  return (
    draggingBlock.y + 2 >= staticBlock.y &&
    draggingBlock.y - 2 <= staticBlock.y + staticBlock.h
  )
}
function isAboveBottom(staticBlock, draggingBlock) {
  return (
    draggingBlock.y + draggingBlock.h >= staticBlock.y - 3 &&
    draggingBlock.y + draggingBlock.h <= staticBlock.y + staticBlock.h + 3
  )
}
function containsSmallerBlocks(staticBlock, draggingBlock) {
  return (
    draggingBlock.y <= staticBlock.y &&
    draggingBlock.y + draggingBlock.h >= staticBlock.y + staticBlock.h + 3
  )
}

function isBlockHorizontal(staticBlock, draggingBlock) {
  if (
    isBelowTop(staticBlock, draggingBlock) ||
    isAboveBottom(staticBlock, draggingBlock) ||
    containsSmallerBlocks(staticBlock, draggingBlock)
  ) {
    return true
  }
}

const AlignmentRay = ({ top, left, width, distance }) => {
  return (
    <Box
      zIndex="9999"
      bg="green.500"
      pos="absolute"
      top={`${top}px`}
      left={`${left}px`}
      width={`${width}px`}
      h="2px"
    >
      <Box d="flex" justifyContent="space-between" color="red">
        <Box as="span" lineHeight="0">
          X
        </Box>
        {distance ? <Box>{Math.round(distance)}</Box> : null}
        <Box as="span" lineHeight="0">
          X
        </Box>
      </Box>
    </Box>
  )
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

function isCenterAlign(origin, dest, dragBlock) {
  return (
    origin.y + origin.h / 2 === dest.y + dest.h / 2 &&
    origin.y + origin.h / 2 === dragBlock.y + dragBlock.h / 2
  )
}

function round(val) {
  return Math.round(val)
}

function isTopAlign(origin, dest, dragBlock) {
  console.log(origin.y, dest.y, dragBlock.y)
  return (
    round(origin.y) === round(dest.y) && round(origin.y) === round(dragBlock.y)
  )
}
function isBottomsAlign(origin, dest, dragBlock) {
  return (
    round(origin.y + origin.h) === round(dest.y + dest.h) &&
    round(origin.y + origin.h) === round(dragBlock.y + dragBlock.h)
  )
}
function isTopAlignWithBottoms(origin, dest) {
  return origin.y === Math.round(dest.y + dest.h)
}
function isBottomsAlignWithTop(origin, dest) {
  return Math.round(origin.y + origin.h) === dest.y
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

const Rays = ({ alignment, dest, origin, width, showCenter = true }) => {
  return (
    <>
      {showCenter && (
        <AlignmentRay
          top={origin.y + origin.h / 2}
          left={origin.x + origin.w}
          width={width}
          distance={Math.round(width)}
        />
      )}
      {alignment.center && (
        <AlignmentRay
          top={origin.y + origin.h / 2}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
        />
      )}
      {alignment.top && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
        />
      )}
      {alignment.bottom && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
        />
      )}
      {alignment.bottomTop && (
        <AlignmentRay
          top={origin.y}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
        />
      )}
      {alignment.topBottom && (
        <AlignmentRay
          top={origin.y + origin.h}
          left={origin.x}
          width={dest.x + dest.w - origin.x}
        />
      )}
    </>
  )
}
const RayToBlock = ({ origin, index, dragBlock, blocks }) => {
  const dest = blocks[index + 1]
  const width = dest.x - origin.x - origin.w

  const alignment = getAlignment(origin, dest, dragBlock)
  return (
    <Rays
      alignment={alignment}
      origin={origin}
      dest={dest}
      key={dest.i}
      width={width}
    />
  )
}
const DragToBlock = ({ origin, blocks }) => {
  const copyBlocks = blocks.filter((block) => block.i !== origin.i)
  return copyBlocks.map((dest) => {
    const alignment = getAlignment(origin, dest, origin)
    const width = dest.x - origin.x - origin.w
    return (
      <Rays
        alignment={alignment}
        origin={origin}
        dest={dest}
        key={dest.i}
        width={width}
        showCenter={false}
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
    distances.push(Math.abs(nextBlock.x - (actualBlock.x + actualBlock.w)))
  }
  return distances
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
  console.log({ layouts, xOrderedBlocks })
  const distances = getSameDistance(xOrderedBlocks)

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
            distance={distances[index]}
            dragBlock={draggingBlock}
            key={index}
          />
        )
      })}

      <DragToBlock origin={draggingBlock} blocks={xOrderedBlocks} />
    </Portal>
  )
}
