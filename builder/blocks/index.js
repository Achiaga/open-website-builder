import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import List from './list'
import GenericText from './text'
import BlockInception from './inception'
import { PrevInception } from './prevInception'
import { useSelector } from 'react-redux'
import { getSelectedBlockId } from '../../features/builderSlice'

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
  blockType,
  reRender,
  newBlockType,
  layoutCallback,
  rowHeight,
  setBlockEditable,
}) {
  const selectedBlockId = useSelector(getSelectedBlockId)
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
  useEffect(() => {
    titleRef?.current?.addEventListener('paste', function (e) {
      e.preventDefault()
      var text = e.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    })
  }, [titleRef])

  const isEditable = selectedBlockId === blockKey

  return (
    <Box
      width="100%"
      h="100%"
      id={blockKey}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (isEditable) return null
        setBlockEditable(blockKey)
      }}
      outline="2px solid"
      outlineColor={isEditable ? 'blue' : 'transparent'}
    >
      {isEditable && (
        <BlockModifiers data={data} blockKey={blockKey} blockType={blockType} />
      )}
      <GenericBlock
        onKeyUp={handleKeyUp}
        contentEditable={isEditable}
        {...(blockType === 'text' ? { ref: titleRef } : {})}
        text={text}
        setBlockEditable={setBlockEditable}
        extraProps={{
          reRender,
          newBlockType,
          layoutCallback,
          blockKey,
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
  newBlockType: PropTypes.any,
  layoutCallback: PropTypes.any,
  rowHeight: PropTypes.any,
}
