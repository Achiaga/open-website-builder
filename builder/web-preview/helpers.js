import { Box } from '@chakra-ui/react'
import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'

const zIndexs = {
  inception: 0,
  image: 1,
  text: 2,
}

function getBlockZIndex(blockType) {
  return zIndexs[blockType]
}

export function GeneratePreviewBlock({ layoutItem }) {
  const {
    builder: { blocks },
  } = useContext(BlocksContext)
  const { data, type } = blocks[layoutItem.i] || {}

  const { w, h, x, y, i } = layoutItem || {}

  const GenericBlock = previewBlocks[type]
  // const backgroundImamgeProps = {
  //   backgroundImage: `url(${data?.imageUrl})`,
  //   backgroundPosition: 'center',
  //   backgroundRepeat: 'no-repeat',
  // }
  console.log(w, h, x, y)
  const zIndex = getBlockZIndex(type)
  return (
    <Box
      key={i}
      gridColumn={`${Math.round(x) + 1} /  span ${Math.round(w)}`}
      gridRow={`${Math.round(y) + 1} / span ${Math.round(h)}`}
      overflow="hidden"
      border={data.border}
      boxShadow={data.boxShadow}
      borderRadius={data.borderRadius}
      backgroundColor={data.backgroundColor}
      zIndex={zIndex}
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
