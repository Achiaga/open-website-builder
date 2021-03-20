import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import List from './list'
import GenericText from './text'
import BlockInception from './inception'
import { PrevInception } from './prevInception'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBlockData,
  getSelectedBlockId,
  setBlockEditable,
} from '../../features/builderSlice'

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

export function BuilderBlock({ blockId, reRender }) {
  const dispatch = useDispatch()

  const { type, data } = useSelector(getBlockData(blockId))
  const selectedBlockId = useSelector(getSelectedBlockId)

  const GenericBlock = blocks[type]

  const isEditable = selectedBlockId === blockId

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
      outlineColor={isEditable ? 'blue' : 'transparent'}
    >
      {isEditable && (
        <BlockModifiers data={data} blockKey={blockId} blockType={type} />
      )}
      <GenericBlock
        extraProps={{
          reRender,
          blockId,
        }}
        data={data}
        {...data}
      />
    </Box>
  )
}
BuilderBlock.propTypes = {
  blockId: PropTypes.bool,
  reRender: PropTypes.any,
}
