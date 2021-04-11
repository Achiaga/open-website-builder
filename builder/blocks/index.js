import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import { BsArrowsMove } from 'react-icons/bs'
import GenericText, { PrevText } from './text'
import BlockInception from './inception'
import { PrevInception } from './prevInception'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBlocks,
  getIsMobileBuilder,
  getResizingBlock,
  getSelectedBlockId,
  setBlockEditable,
} from '../../features/builderSlice'
import { useState } from 'react'

const blocksType = {
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

const DragHandle = () => {
  return (
    <Box
      rounded="5px"
      boxShadow="rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;"
      className="draggHandle"
      pos="absolute"
      paddingY="2px"
      paddingX="2px"
      cursor="move"
      left="-30px"
      bg="white"
    >
      <BsArrowsMove size="20px" />
    </Box>
  )
}

export function BuilderBlock({ blockId }) {
  const [isOver, setIsOver] = useState(false)
  const dispatch = useDispatch()
  const blocks = useSelector(getBlocks)
  const { type, data } = blocks[blockId]
  const GenericBlock = blocksType[type]
  const selectedBlockId = useSelector(getSelectedBlockId)
  const isMobileBuilder = useSelector(getIsMobileBuilder)

  const isEditable = selectedBlockId === blockId

  const dragHandle = isEditable && type === 'text' && !isMobileBuilder

  return (
    <Box
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      w="100%"
      h="100%"
      id={blockId}
      onClick={(e) => {
        e.stopPropagation()
        if (isEditable) return null
        dispatch(setBlockEditable(blockId))
      }}
      outline="2px solid"
      outlineColor={isEditable || isOver ? 'primary.500' : 'transparent'}
      transition="outline-color .3s"
      className={!dragHandle && 'draggHandle'}
    >
      {isEditable && !isMobileBuilder && (
        <>
          <BlockModifiers data={data} blockKey={blockId} blockType={type} />
        </>
      )}
      {dragHandle && <DragHandle />}
      <ResizingCounter blockId={blockId} />
      <GenericBlock parentBlockId={blockId} {...data} />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.string,
}
