import { getBlocksDistances, getXOrderedBlocks } from './horizontal-helpers'
import { HorizontalCenterAlignment, HorizontalSidesAlignment } from '../rays'
import { distanceOccurrences } from '../helpers'
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

export default HorizontalRayTracing
