import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { v4 as uuid } from 'uuid'

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
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  getLayout,
  setSaveStatus,
  getHierarchy,
  getBlockLayoutById,
  handleDragStop,
  handleResizeStop,
  handleDrag,
  getNewBlockType,
  getBlockData,
  getSelectedBlockId,
} from '../../features/builderSlice'
import { BuilderBlock } from '../blocks'

const blocksZIndex = {
  inception: 0,
  image: 1,
  text: 2,
}

const DraggableItem = ({
  blockId,
  handleHiglightSection,
  removeHighlightedElem,
}) => {
  const [isOver, setIsOver] = useState(false)
  const dispatch = useDispatch()
  const gridRowHeight = useSelector(getGridRowHeight)
  const blockLayout = useSelector(getBlockLayoutById(blockId))
  const selectedBlock = useSelector(getSelectedBlockId)
  if (!blockLayout) return null
  const blockData = useSelector(getBlockData(blockId))
  const { x, y, w, h } = blockLayout
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
  const width = gridColumnWidth * w
  const height = gridRowHeight * h
  const xPos = x * gridColumnWidth
  const yPos = y * gridRowHeight

  function onDragStop(_, blockPos) {
    dispatch(handleDragStop(blockPos, blockId))
    removeHighlightedElem()
  }

  function onResizeStop(_, __, ___, delta) {
    dispatch(handleResizeStop(delta, blockId))
  }

  function onDrag(_, blockPos) {
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
  const blockType = blockData?.type
  const isTextBlock = blockType === 'text'
  const isSelected = selectedBlock === blockId

  if (isTextBlock) {
    const el = document.getElementById(blockId)
    el.offsetParent.offsetParent.style.zIndex = isSelected ? '3' : '2'
  }

  return (
    <Draggable
      key={blockId}
      position={{ x: xPos, y: yPos }}
      onStop={onDragStop}
      onDrag={onDrag}
      handle=".draggHandle"
      bounds="parent"
    >
      <Resizable
        size={{ width, height }}
        defaultSize={{ width, height }}
        key={blockId}
        style={{ position: 'absolute' }}
        onResizeStop={onResizeStop}
        enable={{
          top: false,
          right: isTextBlock ? true : false,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: isTextBlock ? false : true,
          bottomLeft: false,
          topLeft: false,
        }}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
        handleStyles={
          isOver && {
            bottomRight: {
              border: '1px solid blue',
              background: 'white',
              borderRadius: '2px',
              zIndex: 1,
            },
            right: {
              border: '1px solid blue',
              background: 'white',
              borderRadius: '2px',
              zIndex: 2,
            },
          }
        }
      >
        <Box
          w={'100%'}
          h={'100%'}
          pos="absolute"
          style={{ zIndex: blocksZIndex[blockType] }}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
        >
          <BuilderBlock blockId={blockId} isOver={isOver} />
        </Box>
      </Resizable>
    </Draggable>
  )
}
const MemoDrag = React.memo(DraggableItem)

const GridLayoutWrapper = ({ children, higlightOnDrop, handleDropNewItem }) => {
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
        e.preventDefault()
        handleDropNewItem(e)
      }}
      fontSize="13px"
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
  const builderData = useSelector(getBuilderData)
  const { blocks } = builderData
  const newBlockType = useSelector(getNewBlockType)
  const layouts = useSelector(getLayout)
  const hierarchy = useSelector(getHierarchy)
  const lastHoveredEl = useRef()
  const gridRowHeight = useSelector(getGridRowHeight)
  const gridColumnWidth = window?.innerWidth / GRID_COLUMNS
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

  // function onDrop(newLayout, droppedBlockLayout) {
  //   dispatch(addNewBlock(newLayout, droppedBlockLayout))
  //   removeHighlightedElem()
  // }

  // function handleLayoutChange(newLayout, __, newItem) {
  //   dispatch(updateLayoutChange(newLayout, newItem))
  //   removeHighlightedElem()
  // }

  // function handleDragStop(newLayout, __, newItem) {
  //   handleLayoutChange(newLayout, __, newItem)
  //   setTimeout(() => dispatch(setDraggingBlock(null)), 0)
  // }

  const handleHiglightSection = useCallback((newItem) => {
    // !draggingBlock && dispatch(setDraggingBlock(newItem.i))
    const newParent = getParentBlock(layouts, newItem, hierarchy)
    highlightFutureParentBlock(newParent?.i, lastHoveredEl)
  }, [])

  const higlightOnDrop = (ev) => {
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
  }

  function handleDropNewItem(ev) {
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
    dispatch(addNewBlock(layouts, newDroppedBlock))
    removeHighlightedElem()
  }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }

  const layoutsKeys = useMemo(() => Object.keys(layouts), [
    Object.keys(layouts),
  ])

  return (
    <GridLayoutWrapper
      higlightOnDrop={higlightOnDrop}
      handleDropNewItem={handleDropNewItem}
    >
      <MemoizeLayoutsRender
        layouts={layoutsKeys}
        handleHiglightSection={handleHiglightSection}
        removeHighlightedElem={removeHighlightedElem}
        gridRowHeight={gridRowHeight}
      />
    </GridLayoutWrapper>
  )
}

const LayoutsRender = ({
  layouts,
  handleHiglightSection,
  removeHighlightedElem,
  gridRowHeight,
}) => {
  return layouts.map((i) => {
    return (
      <MemoDrag
        key={i + gridRowHeight}
        blockId={i}
        handleHiglightSection={handleHiglightSection}
        removeHighlightedElem={removeHighlightedElem}
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
