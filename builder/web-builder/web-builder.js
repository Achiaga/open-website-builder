import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, forwardRef } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { v4 as uuid } from 'uuid'

import { getParentBlock, highlightFutureParentBlock } from './helpers'
import { GRID_COLUMNS } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getGridRowHeight,
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  getLayoutsKeys,
  getHierarchy,
  getBlockLayoutById,
  handleDragStop,
  handleResizeStop,
  handleDrag,
  getNewBlockType,
  getBlockData,
  getSelectedBlockId,
  getLayout,
  getIsMobileBuilder,
} from '../../features/builderSlice'
import { BuilderBlock, ResizingCounter } from '../blocks'
import { RayTracing } from './Ray-Tracing'
import ResizeWrapper from './resizable-wrapper'

const blocksZIndex = {
  inception: 0,
  image: 1,
  form: 2,
  button: 3,
  text: 4,
}

function getZIndexValue(blockType, isSelected) {
  if (isSelected && blockType === 'text') return '4'
  return blocksZIndex[blockType]?.toString() ?? '2'
}

const blockSizes = {
  form: { w: 60, h: 10 },
  image: { w: 20, h: 20 },
  button: { w: 20, h: 10 },
  text: { w: 15, h: 8 },
  section: { w: 20, h: 20 },
}

function getDroppedBlockDim(blockType) {
  return blockSizes[blockType] || { w: 10, h: 10 }
}

const DraggableItem = ({
  blockId,
  handleHiglightSection,
  removeHighlightedElem,
  gridColumnWidth,
  builderRef,
}) => {
  const [resizeValues, setResizeValues] = useState(null)
  const dispatch = useDispatch()
  const gridRowHeight = useSelector(getGridRowHeight)
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
    setResizeValues(null)
  }
  function handleResize(_, __, elRef) {
    const { width, height } = elRef.getBoundingClientRect()
    setResizeValues({ width: Math.round(width), height: Math.round(height) })
  }

  function onDrag(_, blockPos) {
    setBlockPostRef({
      x: blockPos.x,
      y: blockPos.y,
      w: w * gridColumnWidth,
      h: h * gridRowHeight,
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
    if (blockId.includes('inception')) {
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

  const el = document.getElementById(blockId)
  if (el?.offsetParent) {
    el.offsetParent.offsetParent.style.zIndex = getZIndexValue(
      blockType,
      isSelected
    )
  }

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
        handle=".draggHandle"
        bounds={{
          left: 0,
          top: 0,
          right: right - width,
        }}
      >
        <Box pos="absolute" zIndex={zIndexValue}>
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
              width={width}
              gridColumnWidth={gridColumnWidth}
              blockPostRef={blockPostRef}
              builderRef={builderRef}
            />

            <MemoBlockItem
              blockId={blockId}
              isDragging={isDragging}
              zIndexValue={zIndexValue}
            />
            <ResizingCounter {...resizeValues} pos={{ x: xPos, y: yPos }} />
          </ResizeWrapper>
        </Box>
      </Draggable>
    </>
  )
}

const BlockItem = ({ blockId, isDragging, zIndexValue }) => {
  return (
    <Box w={'100%'} h={'100%'} pos="absolute" zIndex={zIndexValue}>
      <BuilderBlock blockId={blockId} isDragging={isDragging} />
    </Box>
  )
}
const MemoBlockItem = React.memo(BlockItem)
const MemoDrag = React.memo(DraggableItem)

function getFontSize(isMobile) {
  if (isMobile) return 10
  return 13
}

const GridLayoutWrapper = forwardRef(
  ({ children, higlightOnDrop, handleDropNewItem }, ref) => {
    const isMobile = useSelector(getIsMobileBuilder)
    const fontSize = getFontSize(isMobile)
    const dispatch = useDispatch()
    return (
      <Box
        ref={ref}
        minHeight="100vh"
        w="100%"
        height="100%"
        flexDir="row"
        onClick={() => dispatch(setBlockEditable(null))}
        id="main-builder"
        overflow="hidden"
        pos="relative"
        className="droppable-element"
        onDragOver={higlightOnDrop}
        bg="gray.50"
        onDrop={(e) => {
          const origin = e.dataTransfer.getData('text/plain')
          e.preventDefault()
          if (origin === 'safe') {
            handleDropNewItem(e)
          }
        }}
        fontSize={fontSize}
        zIndex="1"
      >
        {children}
      </Box>
    )
  }
)
GridLayoutWrapper.propTypes = {
  children: PropTypes.any,
}

export const MobileWindowWidth = 370

const WebBuilder = () => {
  const dispatch = useDispatch()

  const newBlockType = useSelector(getNewBlockType)
  const layoutsKeys = useSelector(getLayoutsKeys)
  const layouts = useSelector(getLayout)
  const hierarchy = useSelector(getHierarchy)
  const lastHoveredEl = useRef()
  const gridRowHeight = useSelector(getGridRowHeight)
  const isMobile = useSelector(getIsMobileBuilder)
  const windowWidth = isMobile ? MobileWindowWidth : window?.innerWidth
  const columns = isMobile ? GRID_COLUMNS / 2 : GRID_COLUMNS
  const gridColumnWidth = windowWidth / columns

  const builderRef = useRef()

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    handleWindowResize()
  }, [windowWidth])

  function handleWindowResize() {
    dispatch(setGridRowHeight(windowWidth / columns))
  }

  const removeHighlightedElem = useCallback(() => {
    if (lastHoveredEl.current?.style) {
      lastHoveredEl.current.style.backgroundColor = null
    }
  }, [])

  const handleHiglightSection = (newItem) => {
    const newParent = getParentBlock(layouts, newItem, hierarchy)
    highlightFutureParentBlock(newParent?.i, lastHoveredEl)
  }

  const handleHiglightSectionMiddleWare = (newItem) => {
    handleHiglightSection(newItem)
  }

  const higlightOnDrop = useCallback((ev) => {
    ev.preventDefault()
    const { pageX, pageY } = ev
    const x = pageX / gridColumnWidth
    const y = pageY / gridRowHeight
    const dim = getDroppedBlockDim(newBlockType)
    const newLayout = {
      x,
      y,
      w: dim.w,
      h: dim.h,
      i: `${newBlockType}-${uuid()}`,
    }
    handleHiglightSection(newLayout)
  }, [])

  const handleDropNewItem = useCallback((ev) => {
    ev.preventDefault()
    const { pageX, pageY } = ev
    const x = pageX / gridColumnWidth
    const y = pageY / gridRowHeight
    const dim = getDroppedBlockDim(newBlockType)
    const newDroppedBlock = {
      x,
      y,
      w: dim.w,
      h: dim.h,
      i: `${newBlockType}-${uuid()}`,
    }
    dispatch(addNewBlock(newDroppedBlock))
    removeHighlightedElem()
  })

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }
  return (
    <GridLayoutWrapper
      ref={builderRef}
      higlightOnDrop={higlightOnDrop}
      handleDropNewItem={handleDropNewItem}
    >
      <MemoizeLayoutsRender
        layouts={layoutsKeys}
        handleHiglightSection={handleHiglightSectionMiddleWare}
        removeHighlightedElem={removeHighlightedElem}
        gridRowHeight={gridRowHeight}
        gridColumnWidth={gridColumnWidth}
        builderRef={builderRef}
      />
    </GridLayoutWrapper>
  )
}

const LayoutsRender = ({
  layouts,
  handleHiglightSection,
  removeHighlightedElem,
  gridRowHeight,
  gridColumnWidth,
  builderRef,
}) => {
  return layouts.map((i) => {
    return (
      <MemoDrag
        key={i + gridRowHeight}
        blockId={i}
        handleHiglightSection={handleHiglightSection}
        removeHighlightedElem={removeHighlightedElem}
        gridColumnWidth={gridColumnWidth}
        builderRef={builderRef}
      />
    )
  })
}
const MemoizeLayoutsRender = React.memo(LayoutsRender)

WebBuilder.propTypes = {
  userBlocksData: PropTypes.any,
  newBlockType: PropTypes.any,
  setIsSaved: PropTypes.any,
  setNewDropBlockType: PropTypes.any,
}

export default WebBuilder
