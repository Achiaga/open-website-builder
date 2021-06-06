import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'

import {
  getGridRowHeight,
  getBlockLayoutById,
  handleDragStop,
  handleResizeStop,
  handleDrag,
  getBlockData,
  getSelectedBlockId,
  getIsMobileBuilder,
  getGroupSelectedBlocksIds,
} from '../../../features/builderSlice'
import { BuilderBlock, ResizingCounter } from '../../blocks'
import { RayTracing } from '../Ray-Tracing'
import ResizeWrapper from '../resizable-wrapper'
import { MobileWindowWidth } from '../web-builder'

const blocksZIndex = {
  inception: 0,
  image: 1,
  form: 2,
  button: 3,
  text: 4,
}

function getZIndexValue(blockType, isSelected) {
  if (isSelected && blockType === 'text') return '5'
  return blocksZIndex[blockType]?.toString() ?? '2'
}

const DraggableItem = ({
  blockId,
  handleHiglightSection,
  removeHighlightedElem,
  gridColumnWidth,
  builderRef,
}) => {
  const dispatch = useDispatch()
  const gridRowHeight = useSelector(getGridRowHeight)
  const groupedBlocksIds = useSelector(getGroupSelectedBlocksIds)
  const blockLayout = useSelector(getBlockLayoutById(blockId))
  const selectedBlock = useSelector(getSelectedBlockId)

  if (!blockLayout) return null

  const blockData = useSelector(getBlockData(blockId))
  const isMobile = useSelector(getIsMobileBuilder)

  const { x, y, w, h } = blockLayout
  const width = gridColumnWidth * w
  const height = gridRowHeight * h
  const xPos = gridColumnWidth * x
  const yPos = gridRowHeight * y

  const blockType = blockData?.type
  const isTextBlock = blockType === 'text'
  const isSelected = selectedBlock === blockId

  const [blockPostRef, setBlockPostRef] = useState(null)

  function onDragStop(_, blockPos) {
    setBlockPostRef(null)
    dispatch(handleDragStop(blockPos, blockId))
    removeHighlightedElem()
  }

  function onResizeStop(_, __, ___, delta) {
    dispatch(handleResizeStop(delta, blockId, blockType))
    setBlockPostRef(null)
  }

  function handleResize(_, __, elRef) {
    const { width, height } = elRef.getBoundingClientRect()
    setBlockPostRef({
      x: xPos,
      y: yPos,
      i: blockId,
      isDragging: true,
      w: Math.round(width),
      h: Math.round(height),
    })
  }

  function onDrag(_, blockPos) {
    setBlockPostRef({
      ...blockPos,
      w: w * gridColumnWidth,
      h: h * gridRowHeight,
      blockId,
      i: blockId,
      isDragging: true,
    })
    const newBlockLayout = {
      x: blockPos.x / gridColumnWidth,
      y: blockPos.y / gridRowHeight,
      w: w,
      h: h,
      i: blockId,
    }
    handleHiglightSection(newBlockLayout)

    if (blockId.includes('inception') || groupedBlocksIds?.includes(blockId)) {
      dispatch(
        handleDrag(
          blockPos,
          newBlockLayout,
          blockId,
          gridColumnWidth,
          gridRowHeight
        )
      )
    }
  }
  // TODO: Gonzalo Not sure what this does???
  // const el = document.getElementById(blockId)
  // if (el?.offsetParent) {
  //   el.offsetParent.offsetParent.style.zIndex = getZIndexValue(
  //     blockType,
  //     isSelected
  //   )
  // }

  const zIndexValue = getZIndexValue(blockType, isSelected)
  const isDragging = blockPostRef?.isDragging
  const right = isMobile ? MobileWindowWidth : window.innerWidth
  return (
    <>
      <Draggable
        key={blockId}
        position={{ x: xPos, y: yPos }}
        onStop={onDragStop}
        onDrag={onDrag}
        handle=".dragHandle"
        bounds={{
          left: 0,
          top: 0,
          right: right - width,
        }}
      >
        <Box pos="absolute" zIndex={zIndexValue} className="cube">
          <ResizeWrapper
            width={width}
            height={height}
            blockId={blockId}
            onResizeStop={onResizeStop}
            isTextBlock={isTextBlock}
            handleResize={handleResize}
            isSelected={isSelected}
          >
            <RayTracing
              gridColumnWidth={gridColumnWidth}
              blockPostRef={blockPostRef}
              builderRef={builderRef}
            />

            <MemoBlockItem blockId={blockId} isDragging={isDragging} />
            <ResizingCounter blockPos={blockPostRef} />
          </ResizeWrapper>
        </Box>
      </Draggable>
    </>
  )
}

const BlockItem = ({ blockId, isDragging }) => {
  return (
    <Box w={'100%'} h={'100%'} pos="absolute">
      <BuilderBlock blockId={blockId} isDragging={isDragging} />
    </Box>
  )
}

const MemoBlockItem = React.memo(BlockItem)
const MemoDrag = React.memo(DraggableItem)

export default MemoDrag
