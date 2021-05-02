import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
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
import { toNumber } from 'lodash'

const blocksZIndex = {
  inception: 0,
  image: 1,
  text: 2,
}

function getZIndexValue(blockType, isSelected) {
  if (isSelected && blockType === 'text') return '4'
  return blocksZIndex[blockType]?.toString() ?? '2'
}

const DraggableItem = ({
  blockId,
  handleHiglightSection,
  removeHighlightedElem,
  gridColumnWidth,
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
  const xPos = x * gridColumnWidth
  const yPos = y * gridRowHeight
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
      ...blockPos,
      w: w * gridColumnWidth,
      h: h * gridRowHeight,
      blockId,
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
  const right = isMobile ? 719 : window.innerWidth
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
          bottom: '100% ',
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
          >
            <RayTracing
              width={width}
              gridColumnWidth={gridColumnWidth}
              blockPostRef2={blockPostRef}
              blockId={blockId}
              isDragging={isDragging}
            />

            <MemoBlockItem
              blockId={blockId}
              isDragging={isDragging}
              zIndexValue={zIndexValue}
            />
            <ResizingCounter {...resizeValues} />
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
  if (isMobile) return 9
  return 13
}

const GridLayoutWrapper = ({ children, higlightOnDrop, handleDropNewItem }) => {
  const isMobile = useSelector(getIsMobileBuilder)
  const fontSize = getFontSize(isMobile)
  const dispatch = useDispatch()
  return (
    <Box
      minHeight="100vh"
      w="100%"
      height="100%"
      flexDir="row"
      onClick={() => dispatch(setBlockEditable(null))}
      id="main-builder"
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
GridLayoutWrapper.propTypes = {
  children: PropTypes.any,
}

const WebBuilder = () => {
  const dispatch = useDispatch()

  const newBlockType = useSelector(getNewBlockType)
  const layoutsKeys = useSelector(getLayoutsKeys)
  const layouts = useSelector(getLayout)
  const hierarchy = useSelector(getHierarchy)
  const lastHoveredEl = useRef()
  const gridRowHeight = useSelector(getGridRowHeight)
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS

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
  }, [window?.innerWidth])

  function handleWindowResize() {
    dispatch(setGridRowHeight(window?.innerWidth / GRID_COLUMNS))
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
    const newLayout = {
      x,
      y,
      w: 10,
      h: 10,
      i: `${newBlockType}-${uuid()}`,
    }
    handleHiglightSection(newLayout)
  }, [])

  const handleDropNewItem = useCallback((ev) => {
    ev.preventDefault()
    const { pageX, pageY } = ev
    const x = pageX / gridColumnWidth
    const y = pageY / gridRowHeight
    const newDroppedBlock = {
      x,
      y,
      w: 10,
      h: 10,
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
      higlightOnDrop={higlightOnDrop}
      handleDropNewItem={handleDropNewItem}
    >
      <MemoizeLayoutsRender
        layouts={layoutsKeys}
        handleHiglightSection={handleHiglightSectionMiddleWare}
        removeHighlightedElem={removeHighlightedElem}
        gridRowHeight={gridRowHeight}
        gridColumnWidth={gridColumnWidth}
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
}) => {
  return layouts.map((i) => {
    return (
      <MemoDrag
        key={i + gridRowHeight}
        blockId={i}
        handleHiglightSection={handleHiglightSection}
        removeHighlightedElem={removeHighlightedElem}
        gridColumnWidth={gridColumnWidth}
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
