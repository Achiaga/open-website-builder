import React, { useCallback, useEffect, useRef, useState } from 'react'
import RGL, { WidthProvider } from '../../components/react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'

import {
  saveOnLocal,
  getParentBlock,
  highlightFutureParentBlock,
} from './helpers'
import { GRID_COLUMNS } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  setResizingBlockId,
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  getBuilderDevice,
  getLayout,
  setSaveStatus,
  getHierarchy,
  setDraggingBlock,
  getDraggingBlock,
  updateLayoutChange,
  getBlockLayoutById,
  handleDragStop,
  handleResizeStop,
  handleDrag,
} from '../../features/builderSlice'
import { BuilderBlock } from '../blocks'

const DraggableItem = ({ blockId }) => {
  const dispatch = useDispatch()
  const gridRowHeight = useSelector(getGridRowHeight)
  const { x, y, w, h } = useSelector(getBlockLayoutById(blockId))
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
  const width = gridColumnWidth * w
  const height = gridRowHeight * h
  const xPos = x * gridColumnWidth
  const yPos = y * gridRowHeight
  console.log(blockId)
  function onDragStop(_, blockPos) {
    dispatch(handleDragStop(blockPos, blockId))
  }
  function onResizeStop(_, __, ___, delta) {
    dispatch(handleResizeStop(delta, blockId))
  }
  function onDrag(_, blockPos) {
    dispatch(handleDrag(blockPos, blockId, gridColumnWidth, gridRowHeight))
  }
  return (
    <Draggable
      key={blockId}
      position={{ x: xPos, y: yPos }}
      onStop={onDragStop}
      onDrag={onDrag}
      handle=".test"
    >
      <Resizable
        defaultSize={{ width, height }}
        key={blockId}
        style={{ position: 'absolute' }}
        onResizeStop={onResizeStop}
      >
        <Box w={'100%'} h={'100%'} pos="absolute" className="test">
          <BuilderBlock blockId={blockId} />
        </Box>
      </Resizable>
    </Draggable>
  )
}
const MemoDrag = React.memo(DraggableItem)

const GridLayoutWrapper = ({ children }) => {
  const dispatch = useDispatch()
  return (
    <Box
      w="100%"
      height="100%"
      flexDir="row"
      onClick={() => dispatch(setBlockEditable(null))}
      id="main-builder"
      pos="relative"
      className="droppable-element"
    >
      {children}
    </Box>
  )
}
GridLayoutWrapper.propTypes = {
  children: PropTypes.any,
}

const blocksZIndex = {
  inception: 0,
  image: 1,
  text: 2,
}

const WebBuilder = () => {
  const dispatch = useDispatch()
  const builderData = useSelector(getBuilderData)
  const { blocks } = builderData

  const layouts = useSelector(getLayout)
  const hierarchy = useSelector(getHierarchy)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const builderDevice = useSelector(getBuilderDevice)
  const lastHoveredEl = useRef()

  useEffect(() => {
    saveOnLocal(builderData)
    dispatch(setSaveStatus('null'))
  }, [blocks, layouts, hierarchy])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function onDrop(newLayout, droppedBlockLayout) {
    dispatch(addNewBlock(newLayout, droppedBlockLayout))
    removeHighlightedElem()
  }

  function handleWindowResize() {
    dispatch(setGridRowHeight(window?.innerWidth / GRID_COLUMNS))
  }

  function removeHighlightedElem() {
    if (lastHoveredEl.current?.style) {
      lastHoveredEl.current.style.backgroundColor = null
    }
  }

  function handleLayoutChange(newLayout, __, newItem) {
    dispatch(updateLayoutChange(newLayout, newItem))
    removeHighlightedElem()
  }

  function handleDragStop(newLayout, __, newItem) {
    handleLayoutChange(newLayout, __, newItem)
    setTimeout(() => dispatch(setDraggingBlock(null)), 0)
  }

  // function handleDrag(layout, _, newItem) {
  //   !draggingBlock && dispatch(setDraggingBlock(newItem.i))
  //   const newParent = getParentBlock(layout, newItem, hierarchy)
  //   highlightFutureParentBlock(newParent?.i, lastHoveredEl)
  // }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }

  const isMobile = builderDevice === 'mobile'

  return (
    <GridLayoutWrapper
      style={{
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <LayoutsRender layouts={Object.keys(layouts)} />
    </GridLayoutWrapper>
  )
}

const LayoutsRender = ({ layouts }) => {
  return layouts.map((i) => {
    return <MemoDrag key={i} blockId={i} />
  })
}

WebBuilder.propTypes = {
  userBlocksData: PropTypes.any,
  newBlockType: PropTypes.any,
  setIsSaved: PropTypes.any,
  setNewDropBlockType: PropTypes.any,
}

export default WebBuilder
