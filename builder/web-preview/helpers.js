import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'

const zIndexs = {
  inception: 0,
  image: 1,
  text: 2,
  button: 3,
  form: 4,
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
  if (!type || !previewBlocks[type]) return null
  const GenericBlock = previewBlocks[type]
  const zIndex = getBlockZIndex(type)
  return (
    <div
      key={i}
      style={{
        gridColumn: `${Math.round(x) + 1} /  span ${Math.round(w)}`,
        gridRow: `${Math.round(y) + 1} / span ${Math.round(h)}`,
        border: data?.border,
        boxShadow: data?.boxShadow,
        borderRadius: data?.borderRadius,
        zIndex: zIndex,
      }}
    >
      <GenericBlock
        {...data}
        parentHeight={h}
        isPreview
        blockId={layoutItem.i}
      />
    </div>
  )
}
