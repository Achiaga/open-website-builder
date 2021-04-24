import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Portal } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
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
} from '../../features/builderSlice'
import { BuilderBlock, ResizingCounter } from '../blocks'

const blocksZIndex = {
  inception: 0,
  image: 1,
  text: 2,
}

function getZIndexValue(blockType, isSelected) {
  if (isSelected && blockType === 'text') return '4'
  return blocksZIndex[blockType]?.toString() ?? '2'
}

let blockPosRef = {}

function isBlockOnRow(staticBlockY, draggingBlock, staticBlockHeight) {
  return (
    staticBlockY < draggingBlock.y &&
    staticBlockY + staticBlockHeight > draggingBlock.y
  )
}
function isBlockOnRight(staticBlockX, draggingBlock) {
  return staticBlockX < draggingBlock.x
}
function getGridPos({ x, w, h, y }, gridColumnWidth, gridRowHeight) {
  const sbX = x * gridColumnWidth
  const sbY = y * gridRowHeight
  const sbW = w * gridColumnWidth
  const sbH = h * gridRowHeight
  return { sbX, sbY, sbW, sbH }
}

function hasNoLeftBlocks(closest) {
  return closest.diff === Infinity
}

function getLeftBorderPos(draggingBlock) {
  return { x: 0, diff: Math.round(draggingBlock.x) }
}

function isBlockOnCenter(sbX, sbW, dgB) {
  const draggingBlockHalf = dgB.x + dgB.w / 2
  const staticBlockHalf = sbX + sbW / 2
  return (
    draggingBlockHalf - 10 < staticBlockHalf &&
    draggingBlockHalf + 10 > staticBlockHalf
  )
}

function getClosestElement(layout, dgB, gridColumnWidth, gridRowHeight) {
  const copyLayout = { ...layout }
  delete copyLayout[dgB.i]
  let closest = { x: 0, diff: Infinity, middle: false }

  for (let block in copyLayout) {
    const { i } = layout[block]
    const { sbX, sbY, sbW, sbH } = getGridPos(
      layout[block],
      gridColumnWidth,
      gridRowHeight
    )

    if (isBlockOnCenter(sbX, sbW, dgB)) {
      return { middle: true, x: sbX, w: sbW, h: sbH, y: sbY }
    }

    if (isBlockOnRow(sbY, dgB, sbH) && isBlockOnRight(sbX, dgB)) {
      const diffLeft = Math.round(dgB.x - sbX)
      const diffRight = Math.round(dgB.x - (sbX + sbW))
      const isBlockRight = dgB.x > sbX + sbW
      const diff = Math.abs(isBlockRight ? diffRight : diffLeft)

      if (diff < closest.diff) {
        closest = { ...closest, x: sbX, diff: diff, i }
      }
    }
  }

  if (hasNoLeftBlocks(closest)) return getLeftBorderPos(dgB)

  return closest
}

const RayTracing = ({ width, gridColumnWidth, blockPostRef2, blockId }) => {
  const draggingBlockPos = blockPostRef2.current || {}
  const layouts = useSelector(getLayout)
  const gridRowHeight = useSelector(getGridRowHeight)
  const windowWidth = window.innerWidth
  const leftDis = Math.round(draggingBlockPos?.x + width / 2)
  const item = {
    i: blockId,
    x: draggingBlockPos.x,
    y: draggingBlockPos.y,
    w: draggingBlockPos.w,
  }
  const closestItem = getClosestElement(
    layouts,
    item,
    gridColumnWidth,
    gridRowHeight
  )
  if (closestItem.middle) {
    return (
      <Portal id="main-builder">
        <Box
          pos="absolute"
          left={`${closestItem.w / 2 + closestItem.x}px`}
          top={`${closestItem.y}px`}
          zIndex="2"
          bg="green.500"
          width="1px"
          h={`${closestItem.h}px`}
        >
          <Box textAlign="center">{closestItem.diff}</Box>
        </Box>
      </Portal>
    )
  }
  return null
  // Left ray tracing
  // return (
  //   <Box
  //     pos="absolute"
  //     left={`${-closestItem.diff}px`}
  //     zIndex="2"
  //     bg="green.500"
  //     width={`${closestItem.diff}px`}
  //     h="1px"
  //   >
  //     <Box textAlign="center">{closestItem.diff}</Box>
  //   </Box>
  // )
  // Middle Screen line
  // if (leftDis - 20 <= windowWidth / 2 && leftDis + 20 >= windowWidth / 2) {
  //   return (
  //     <>
  //       <Box
  //         pos="absolute"
  //         left="50%"
  //         transform="translate(-50%,0)"
  //         top="0"
  //         zIndex="9999"
  //         bg="green.500"
  //         width="1px"
  //         h="100%"
  //       />
  //       <Box
  //         pos="absolute"
  //         left={blockPosRef.x}
  //         top={blockPosRef.y}
  //         zIndex="9999"
  //         bg="green.500"
  //         width={`${diff}px`}
  //         h="1px"
  //       />
  //     </>
  //   )
  // }
}

const DraggableItem = ({
  blockId,
  handleHiglightSection,
  removeHighlightedElem,
  gridColumnWidth,
}) => {
  const [resizeValues, setResizeValues] = useState(null)
  const [isOver, setIsOver] = useState(false)
  const dispatch = useDispatch()
  const gridRowHeight = useSelector(getGridRowHeight)
  const blockLayout = useSelector(getBlockLayoutById(blockId))
  const selectedBlock = useSelector(getSelectedBlockId)
  if (!blockLayout) return null
  const blockData = useSelector(getBlockData(blockId))
  const { x, y, w, h } = blockLayout
  const width = gridColumnWidth * w
  const height = gridRowHeight * h
  const xPos = x * gridColumnWidth
  const yPos = y * gridRowHeight
  const blockType = blockData?.type
  const isTextBlock = blockType === 'text'
  const isSelected = selectedBlock === blockId
  const blockPostRef2 = useRef(null)
  function onDragStop(_, blockPos) {
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
    blockPosRef = blockPos
    blockPostRef2.current = {
      ...blockPos,
      w: w * gridColumnWidth,
      h: h * gridRowHeight,
      blockId,
    }
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
  if (el) {
    el.offsetParent.offsetParent.style.zIndex = getZIndexValue(
      blockType,
      isSelected
    )
  }
  useEffect(() => {
    setIsOver()
  }, [])
  const zIndexValue = getZIndexValue(blockType, isSelected)
  return (
    <>
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
          style={{ position: 'absolute', zIndex: 2 }}
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
          onResize={handleResize}
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          handleStyles={
            isOver && {
              bottomRight: {
                border: '1px solid blue',
                background: 'white',
                borderRadius: '2px',
                zIndex: 2,
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
          {isSelected && (
            <RayTracing
              width={width}
              gridColumnWidth={gridColumnWidth}
              blockPostRef2={blockPostRef2}
              blockId={blockId}
            />
          )}
          <MemoBlockItem
            blockId={blockId}
            isOver={isOver}
            setIsOver={setIsOver}
            zIndexValue={zIndexValue}
          />
          <ResizingCounter {...resizeValues} />
        </Resizable>
      </Draggable>
    </>
  )
}

const BlockItem = ({ blockId, isOver, setIsOver }) => {
  return (
    <Box
      w={'100%'}
      h={'100%'}
      pos="absolute"
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
      // zIndex={zIndexValue}
    >
      <BuilderBlock blockId={blockId} isOver={isOver} />
    </Box>
  )
}
const MemoBlockItem = React.memo(BlockItem)
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
        const origin = e.dataTransfer.getData('text/plain')
        e.preventDefault()
        if (origin === 'safe') {
          handleDropNewItem(e)
        }
      }}
      fontSize="13px"
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
