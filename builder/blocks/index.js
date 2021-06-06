import { Box, Portal } from '@chakra-ui/react'
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
  getGroupSelectedBlocksIds,
  getIsGroupSelectable,
  getIsMobileBuilder,
  getSelectedBlockId,
  setBlockEditable,
} from '../../features/builderSlice'
import { GenericContactForm, PrevContactForm } from './form'
import { ButtonGeneric, PreviewButton } from './button'
import { useState } from 'react'

const blocksType = {
  image: Image,
  text: GenericText,
  inception: BlockInception,
  form: GenericContactForm,
  button: ButtonGeneric,
}
export const previewBlocks = {
  image: Image,
  text: PrevText,
  inception: PrevInception,
  form: PrevContactForm,
  button: PreviewButton,
}

export const ResizingCounter = ({ blockPos }) => {
  if (!blockPos?.isDragging) return null
  let widthSizeBox = 110
  if (blockPos.w < 100) widthSizeBox = 90
  return (
    <Portal id="main-builder">
      <Box
        pos="absolute"
        left={blockPos.x + blockPos.w - widthSizeBox}
        top={blockPos.y + blockPos.h + 15}
        paddingY="3px"
        paddingX="7px"
        bg="white"
        zIndex="99999"
        color="primary.500"
        borderRadius="5px"
        boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
        fontWeight="600"
      >
        <Box as="span">w: {Math.round(blockPos.w)}</Box>
        <Box as="span"> h: {Math.round(blockPos.h)}</Box>
      </Box>
    </Portal>
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
      className="dragHandle"
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

function getBorderColor(isEditable, isOver, isGrouped) {
  if (isEditable || isOver || isGrouped) return 'primary.600'
  return 'transparent'
}

export function BuilderBlock({ blockId, isDragging }) {
  const dispatch = useDispatch()

  const blocks = useSelector(getBlocks)
  const { type, data, subType } = blocks[blockId] || {}
  const selectedBlockId = useSelector(getSelectedBlockId)
  const isMobileBuilder = useSelector(getIsMobileBuilder)
  const isGroupSelectable = useSelector(getIsGroupSelectable)
  const groupedBlocksIds = useSelector(getGroupSelectedBlocksIds)
  const [isOver, setIsOver] = useState(false)

  if (!type) return null

  const GenericBlock = blocksType[type]
  const isEditable = selectedBlockId === blockId

  const isText = type === 'text' || type === 'button'

  const hasDragHandle = isEditable && isText && !isMobileBuilder

  return (
    <Box
      w="100%"
      h="100%"
      id={blockId}
      onClick={(e) => {
        e.stopPropagation()
        if (isEditable || isDragging) {
          return null
        }
        dispatch(setBlockEditable(blockId))
      }}
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      className={`selectable-block ${
        !hasDragHandle && !isGroupSelectable && 'dragHandle'
      }`}
      _hover={!isEditable && hoverEffect[type]}
      position="relative"
      _before={{
        border: '2px solid',
        borderColor: getBorderColor(
          isEditable,
          isOver,
          groupedBlocksIds?.includes(blockId)
        ),
        content: "''",
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: isText ? 0 : 1,
        transition: 'border-color .3s',
      }}
    >
      {hasDragHandle && <DragHandle />}
      {isEditable && !isMobileBuilder && type !== 'text' && !isDragging && (
        <>
          <BlockModifiers data={data} blockKey={blockId} blockType={type} />
        </>
      )}

      <GenericBlock parentBlockId={blockId} {...data} subType={subType} />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.string,
}
