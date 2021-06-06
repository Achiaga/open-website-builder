import { distanceOccurrences } from '../helpers'
import { VerticalCenterAlignment, VerticalSidesAlignment } from '../rays'

import {
  getVerticalBlocksDistances,
  getYOrderedBlocks,
} from './vertical-helpers'

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

export default VerticalRayTracing
