import { useContext } from 'react'

import { previewBlocks } from '../blocks'
import { BlocksContext } from './preview'
import { GRID_COLUMNS } from '../web-builder/constants'
import { RedirectWrapper } from '../blocks/text'

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
  const { data, type, subType } = blocks[layoutItem.i] || {}
  const { w, h, x, y, i } = layoutItem || {}
  if (!type || !previewBlocks[type]) return null
  const GenericBlock = previewBlocks[type]
  const zIndex = getBlockZIndex(type)
  const redirectUrl = data.redirect
  return (
    <>
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `calc( ${x} *  ( 100% / ${desktop ? GRID_COLUMNS : 100}) )`,
          width: `calc( ${w} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
          top: `calc( ${y}  * ( 100vw  / ${desktop ? GRID_COLUMNS : 100}) )`,
          height: `calc( ${h} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
          // border: data?.border,
          boxShadow: data?.boxShadow,
          borderRadius: data?.borderRadius,
          zIndex: zIndex,
        }}
      >
        <GenericBlock
          {...data}
          subType={subType}
          parentHeight={h}
          isPreview
          blockId={layoutItem.i}
        />
      </div>
      {redirectUrl && type === 'inception' && (
        <button
          style={{
            position: 'absolute',
            left: `calc( ${x} *  ( 100% / ${desktop ? GRID_COLUMNS : 100}) )`,
            width: `calc( ${w} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
            top: `calc( ${y}  * ( 100vw  / ${desktop ? GRID_COLUMNS : 100}) )`,
            height: `calc( ${h} * ( 100vw / ${desktop ? GRID_COLUMNS : 100}) )`,
            cursor: 'pointer',
            overflow: 'hidden',
            zIndex: 10,
            borderRadius: data.borderRadius,
          }}
        >
          <RedirectWrapper redirectUrl={redirectUrl} />
        </button>
      )}
    </>
  )
}
