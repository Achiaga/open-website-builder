import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'
import { GRID_COLUMNS } from '../web-builder/constants'

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

export function GeneratePreviewBlock({ layoutItem, desktop }) {
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
        position: 'absolute',
        left: `calc( ${Math.round(x)} *  ( 100% / ${
          desktop ? GRID_COLUMNS : 100
        }) )`,
        width: `calc( ${Math.round(w)} * ( 100vw / ${
          desktop ? GRID_COLUMNS : 100
        }) )`,
        top: `calc( ${Math.round(y)}  * ( 100vw  / ${
          desktop ? GRID_COLUMNS : 100
        }) )`,
        height: `calc( ${Math.round(h)} * ( 100vw / ${
          desktop ? GRID_COLUMNS : 100
        }) )`,
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
