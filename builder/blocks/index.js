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

const ResizingCounter = ({ blockId }) => {
  const resizingBlock = useSelector(getResizingBlock)
  const isResizing = resizingBlock?.i === blockId
  if (!isResizing) return null
  return (
    <Box pos="absolute" right="0" bottom="25px" bg="white" zIndex="99999">
      <Box as="span">w: {resizingBlock?.w}</Box>
      <Box as="span"> h: {resizingBlock?.h}</Box>
    </Box>
  )
}
ResizingCounter.propTypes = {
  blockId: PropTypes.string,
}

export function BuilderBlock({ blockId }) {
  const dispatch = useDispatch()
  const { type, data } = useSelector(getBlockData(blockId))
  const GenericBlock = blocks[type]
  const selectedBlockId = useSelector(getSelectedBlockId)

  const isEditable = selectedBlockId === blockId

  return (
    <Box
      width="100%"
      h="100%"
      id={blockId}
      onClick={(e) => {
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
      <ResizingCounter blockId={blockId} />
      <GenericBlock parentBlockId={blockId} {...data} />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.string,
}
