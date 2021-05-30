import { Portal } from '@chakra-ui/portal'
import { useSelector } from 'react-redux'
import { getGridRowHeight, getLayout } from '../../../features/builderSlice'
import {
  getXOrderedBlocks,
  distanceOccurrences,
  getBlocksDistances,
} from './horizontal-helpers'
import { DragToBlock, RayToBlock } from './rays'

export const RayTracing = ({
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
  const distances = distanceOccurrences(getBlocksDistances(xOrderedBlocks))

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
