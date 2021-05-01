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
  getDraggingBlock,
  getIsMobileBuilder,
  getSelectedBlockId,
  setBlockEditable,
} from '../../features/builderSlice'

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

export const ResizingCounter = ({ width, height }) => {
  if (!width || !height) return null
  return (
    <Box
      pos="absolute"
      right="0"
      bottom="-40px"
      paddingY="3px"
      paddingX="7px"
      bg="white"
      zIndex="99999"
      color="primary.500"
      borderRadius="5px"
      boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
      fontWeight="600"
    >
      <Box as="span">w: {width}</Box>
      <Box as="span"> h: {height}</Box>
    </Box>
  )
}
ResizingCounter.propTypes = {
  blockId: PropTypes.string,
}

const hoverEffect = {
  image: {
    filter: 'brightness(1.1)',
  },
  text: {
    bg: '#b6b6b72e',
  },
}
const DragHandle = () => {
  return (
    <Box
      rounded="5px"
      boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
      className="draggHandle"
      pos="absolute"
      paddingY="2px"
      paddingX="2px"
      cursor="move"
      left="-30px"
      bg="white"
      zIndex="9999"
    >
      <BsArrowsMove size="20px" />
    </Box>
  )
}

export function BuilderBlock({ blockId }) {
  const dispatch = useDispatch()
  const blocks = useSelector(getBlocks)
  const { type, data } = blocks[blockId] || {}
  const selectedBlockId = useSelector(getSelectedBlockId)
  const isMobileBuilder = useSelector(getIsMobileBuilder)
  const draggingBlock = useSelector(getDraggingBlock)

  if (!type) return null

  const GenericBlock = blocksType[type]
  const isEditable = selectedBlockId === blockId
  const isDragging = draggingBlock === blockId

  const dragHandle = isEditable && type === 'text' && !isMobileBuilder
  return (
    <Box
      w="100%"
      h="100%"
      id={blockId}
      onClick={(e) => {
        e.stopPropagation()
        if (isEditable || isDragging) return null
        dispatch(setBlockEditable(blockId))
      }}
      outline="2px solid"
      outlineOffset="0px"
      outlineColor={isEditable ? '#43E28E' : 'transparent'}
      transition="outline-color .3s"
      className={!dragHandle && 'draggHandle'}
      _hover={!isEditable && hoverEffect[type]}
      position="relative"
    >
      {isEditable && !isMobileBuilder && type !== 'text' && (
        <>
          <BlockModifiers data={data} blockKey={blockId} blockType={type} />
        </>
      )}
      {dragHandle && <DragHandle />}
      <GenericBlock parentBlockId={blockId} {...data} />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.string,
}
