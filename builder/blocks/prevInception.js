import { Box } from '@chakra-ui/layout'
import { useContext } from 'react'
import { GRID_COLUMNS } from '../web-builder/constants'

import { GeneratePreviewBlock } from '../web-preview/helpers'

import { BlocksContext } from '../web-preview/preview'

export const PrevInception = ({ parentHeight, blockId }) => {
  const { builder, rowHeight } = useContext(BlocksContext)
  return (
    <Box
      d="grid"
      gridTemplateColumns={`repeat(${GRID_COLUMNS}, 1fr)`}
      gridTemplateRows={`repeat( auto-fill,  ${rowHeight}px )`}
      height={parentHeight * rowHeight}
    >
      {builder.structure[blockId]?.map((structItem) => {
        return <GeneratePreviewBlock key={structItem} structItem={structItem} />
      })}
    </Box>
  )
}
