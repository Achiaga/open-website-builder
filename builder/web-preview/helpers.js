import { Box } from '@chakra-ui/react'
import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'

export function GeneratePreviewBlock({ layoutItem }) {
  const {
    builder: { blocks },
  } = useContext(BlocksContext)
  const { data, type } = blocks[layoutItem.i]
  const { w, h, x, y, i } = layoutItem || {}

  const GenericBlock = previewBlocks[type]
  return (
    <Box
      key={i}
      gridColumn={`${x + 1} /  span ${w}`}
      gridRow={`${y + 1} / span ${h}`}
      overflow="hidden"
      border={data.border}
      {...(type !== 'image' && { backgroundImage: `url(${data?.imageUrl})` })}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      boxShadow={data.boxShadow}
      borderRadius={data.borderRadius}
      backgroundColor={data.backgroundColor}
    >
      <GenericBlock
        {...data}
        parentHeight={h}
        isPreview
        blockId={layoutItem.i}
      />
    </Box>
  )
}
