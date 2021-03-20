import { Box } from '@chakra-ui/layout'
import { GRID_COLUMNS } from '../web-builder/constants'

import { generatePreviewBlock } from '../web-preview/helpers'

export const PrevInception = (props) => {
  const blocks = props.blocks
  return (
    <Box
      d="grid"
      gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
      gridTemplateRows={`repeat( auto-fill,  ${props.rowHeight}px )`}
      height={props.parentHeight * props.rowHeight}
    >
      {Object.keys(blocks).map((block) => {
        const blockData = blocks[block]
        return generatePreviewBlock(blockData.block, blockData.layout)
      })}
    </Box>
  )
}
