import { Box } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import List from './list'
import GenericText from './text'
import BlockInception from './inception'
import { PrevInception } from './prevInception'

const blocks = {
  image: Image,
  list: List,
  text: GenericText,
  inception: BlockInception,
}
export const previewBlocks = {
  image: Image,
  list: List,
  text: GenericText,
  inception: PrevInception,
}

export function BuilderBlock({
  data,
  blockKey,
  isEditable,
  blockType,
  reRender,
  selectedItemId,
  newBlockType,
  layoutCallback,
  setSelectedItem,
  rowHeight,
}) {
  const GenericBlock = blocks[blockType]
  const { editBlock = () => {}, text: dataText, ...metaData } = data

  const [text] = useState(dataText)
  const titleRef = useRef(null)

  function handleKeyUp(e) {
    e.stopPropagation()
    const value = titleRef.current?.innerText
    const updatedBlock = { ...data, text: value }
    editBlock(updatedBlock, blockKey)
  }
  return (
    <Box width="100%" h="100%" id={blockKey}>
      {isEditable && (
        <BlockModifiers data={data} blockKey={blockKey} blockType={blockType} />
      )}
      <GenericBlock
        onKeyUp={handleKeyUp}
        contentEditable={isEditable}
        {...(blockType === 'text' ? { ref: titleRef } : {})}
        text={text}
        extraProps={{
          reRender,
          selectedItemId,
          newBlockType,
          layoutCallback,
          blockKey,
          setSelectedItem,
          rowHeight,
        }}
        {...metaData}
      />
    </Box>
  )
}
BuilderBlock.propTypes = {
  isPreview: PropTypes.bool,
  blockKey: PropTypes.string.isRequired,
  isEditable: PropTypes.bool,
  blockType: PropTypes.string.isRequired,
  data: PropTypes.any,
  reRender: PropTypes.any,
  selectedItemId: PropTypes.any,
  newBlockType: PropTypes.any,
  layoutCallback: PropTypes.any,
  setSelectedItem: PropTypes.any,
  rowHeight: PropTypes.any,
}
