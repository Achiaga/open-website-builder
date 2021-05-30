import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import {
  getXOrderedBlocks,
  distanceOccurrences,
  getBlocksDistances,
} from './horizontal-helpers'
import {
  DragToBlock,
  RayToBlock,
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
  gridColumnWidth,
  blockPostRef: draggingBlock,
  builderRef,
}) => {
  if (!draggingBlock) return null
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)

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
    </Portal>
  )
}
