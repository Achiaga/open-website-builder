import { Box } from '@chakra-ui/react'
import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'

export const generatePageCode = (childStructure) => {
  return childStructure?.map((structItem) => {
    return <GeneratePreviewBlock key={structItem} structItem={structItem} />
  })
}

export function GeneratePreviewBlock({ structItem }) {
  const {
    builder: { blocks, layouts },
  } = useContext(BlocksContext)

  const { data, type } = blocks[structItem]
  const { w, h, x, y, i } = layouts[structItem] || {}

  const GenericBlock = previewBlocks[type]
  return (
    <Box
      key={i}
      gridColumn={`${x + 1} /  span ${w}`}
      gridRow={`${y + 1} / span ${h}`}
      overflow="hidden"
      boxShadow={data.boxShadow}
      borderRadius={data.borderRadius}
      backgroundColor={data.backgroundColor}
    >
      <GenericBlock {...data} parentHeight={h} isPreview blockId={structItem} />
    </Box>
  )
}
