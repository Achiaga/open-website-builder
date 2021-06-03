import { Box } from '@chakra-ui/layout'
import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import {
  getXOrderedBlocks,
  distanceOccurrences,
  getBlocksDistances,
} from './horizontal-helpers'
import {
  HorizontalSidesAlignment,
  HorizontalCenterAlignment,
  VerticalCenterAlignment,
  VerticalSidesAlignment,
} from './rays'
import {
  getVerticalBlocksDistances,
  getYOrderedBlocks,
} from './vertical-helpers'

const HorizontalRayTracing = ({
  layouts,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight,
}) => {
  const xOrderedBlocks = getXOrderedBlocks(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )

  const distances = distanceOccurrences(getBlocksDistances(xOrderedBlocks))
  return (
    <>
      {xOrderedBlocks.map((block, index) => {
        const isLastBlock = index >= xOrderedBlocks.length - 1
        if (isLastBlock) return null
        return (
          <HorizontalCenterAlignment
            origin={block}
            index={index}
            blocks={xOrderedBlocks}
            distances={distances}
            key={index}
          />
        )
      })}
      <HorizontalSidesAlignment
        dragBlock={draggingBlock}
        blocks={xOrderedBlocks}
      />
    </>
  )
}
const VerticalRayTracing = ({
  layouts,
  draggingBlock,
  gridColumnWidth,
  gridRowHeight,
}) => {
  const yOrderedBlocks = getYOrderedBlocks(
    layouts,
    draggingBlock,
    gridColumnWidth,
    gridRowHeight
  )

  const distances = distanceOccurrences(
    getVerticalBlocksDistances(yOrderedBlocks)
  )
  return (
    <>
      {yOrderedBlocks.map((block, index) => {
        const isLastBlock = index >= yOrderedBlocks.length - 1
        if (isLastBlock) return null
        return (
          <VerticalCenterAlignment
            origin={block}
            index={index}
            blocks={yOrderedBlocks}
            distances={distances}
            key={index}
          />
        )
      })}
      <VerticalSidesAlignment
        dragBlock={draggingBlock}
        blocks={yOrderedBlocks}
      />
    </>
  )
}

export const RayTracing = ({
  width,
  gridColumnWidth,
  blockPostRef: draggingBlock,
  builderRef,
}) => {
  if (!draggingBlock) return null
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)
  const leftDis = Math.round(draggingBlock?.x + width / 2)
  const isMidScreen =
    leftDis - 1 <= window.innerWidth / 2 && leftDis + 1 >= window.innerWidth / 2
  return (
    <Portal id="main-builder" containerRef={builderRef}>
      <HorizontalRayTracing
        layouts={layouts}
        draggingBlock={draggingBlock}
        gridColumnWidth={gridColumnWidth}
        gridRowHeight={gridRowHeight}
      />
      <VerticalRayTracing
        layouts={layouts}
        draggingBlock={draggingBlock}
        gridColumnWidth={gridColumnWidth}
        gridRowHeight={gridRowHeight}
      />
      {isMidScreen && (
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
      )}
    </Portal>
  )
}
