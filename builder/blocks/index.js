import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import GenericText, { PrevText } from './text'
import BlockInception from './inception'
import { PrevInception } from './prevInception'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBlockData,
  getResizingBlock,
  getSelectedBlockId,
  setBlockEditable,
} from '../../features/builderSlice'

const blocks = {
  image: Image,
  text: GenericText,
  inception: BlockInception,
}
export const previewBlocks = {
  image: Image,
  text: PrevText,
  inception: PrevInception,
}

export function BuilderBlock({ blockId }) {
  const dispatch = useDispatch()

  const { type, data } = useSelector(getBlockData(blockId))
  const selectedBlockId = useSelector(getSelectedBlockId)
  const resizingBlock = useSelector(getResizingBlock)

  const GenericBlock = blocks[type]

  const isEditable = selectedBlockId === blockId
  const isResizing = resizingBlock?.i === blockId

  return (
    <Box
      width="100%"
      h="100%"
      id={blockId}
      onDoubleClick={(e) => {
        e.stopPropagation()
        if (isEditable) return null
        dispatch(setBlockEditable(blockId))
      }}
      outline="2px solid"
      outlineColor={isEditable ? 'primary.500' : 'transparent'}
      transition="outline-color .3s"
    >
      {isEditable && (
        <BlockModifiers data={data} blockKey={blockId} blockType={type} />
      )}
      {isResizing && (
        <Box pos="absolute" right="0" bottom="25px" bg="white" zIndex="99999">
          <Box as="span">w: {resizingBlock?.w}</Box>
          <Box as="span"> h: {resizingBlock?.h}</Box>
        </Box>
      )}
      <GenericBlock parentBlockId={blockId} {...data} />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.string,
}
