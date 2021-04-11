import React, { useCallback, useEffect, useRef } from 'react'
import RGL, { WidthProvider } from '../../components/react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import {
  saveOnLocal,
  getUpdatedHierarchy,
  getParentBlock,
  highlightFutureParentBlock,
} from './helpers'
import { GRID_COLUMNS } from './constants'
import { batch, useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  setResizingBlockId,
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  getBuilderDevice,
  updateLayouts,
  updateHierarchy,
  getLayout,
  setSaveStatus,
  getHierarchy,
} from '../../features/builderSlice'
import { BuilderBlock } from '../blocks'

const reactGridLayoutProps = {
  autoSize: true,
  margin: [0, 0],
  className: 'layout',
  verticalCompact: false,
}

const ReactGridLayout = WidthProvider(RGL)

const GridLayoutWrapper = ({ children }) => {
  const dispatch = useDispatch()
  return (
    <Box
      d="flex"
      w="100%"
      height="100%"
      flexDir="row"
      onClick={() => dispatch(setBlockEditable(null))}
      id="main-builder"
      pos="relative"
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
  const gridRowHeight = useSelector(getGridRowHeight)
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
    const updatedHierarchy = getUpdatedHierarchy(newLayout, newItem, hierarchy)
    batch(() => {
      dispatch(updateLayouts(newLayout, newItem.i))
      dispatch(updateHierarchy(updatedHierarchy))
      setTimeout(() => {
        dispatch(setResizingBlockId(null))
      }, 600)
    })
    removeHighlightedElem()
  }

  function handleDragStop(newLayout, __, newItem) {
    handleLayoutChange(newLayout, __, newItem)
  }

  function handleDrag(layout, _, newItem) {
    const newParent = getParentBlock(layout, newItem, hierarchy)
    highlightFutureParentBlock(newParent?.i, lastHoveredEl)
  }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }

  function handleAddSize(_, __, resizingBlock) {
    dispatch(setResizingBlockId(resizingBlock))
  }

  const getLayouts = useCallback(() => {
    return (
      layouts
        .map(({ i }) => {
          const { type } = blocks[i] || {}
          if (!type) return null
          return (
            <Box key={i} zIndex={blocksZIndex[type]}>
              <BuilderBlock blockId={i} />
            </Box>
          )
        })
        //this is use to remove undefines in case of error when deleting
        .filter((item) => item)
    )
  }, [layouts])

  const isMobile = builderDevice === 'mobile'

  return (
    <GridLayoutWrapper
      style={{
        minHeight: '100vh',
        height: '100%',
      }}
    >
      <ReactGridLayout
        {...reactGridLayoutProps}
        key={builderDevice}
        cols={isMobile ? 100 : GRID_COLUMNS}
        style={{
          width: '100%',
          minHeight: '100vh',
          height: '100%',
          backgroundColor: '#f4f5f6',
        }}
        rowHeight={gridRowHeight}
        onDrop={onDrop}
        preventCollision={!!newBlockType}
        isDroppable={true}
        onResize={handleAddSize}
        onDrag={handleDrag}
        onResizeStop={handleLayoutChange}
        onDragStop={handleDragStop}
        useCSSTransforms={true}
        droppingItem={{
          i: newBlockType ? `${newBlockType}-${newBlockId}` : '',
          w: 15,
          h: 10,
        }}
        layout={layouts}
        hierarchy={hierarchy}
        draggableHandle=".draggHandle"
      >
        {getLayouts()}
      </ReactGridLayout>
    </GridLayoutWrapper>
  )
}

WebBuilder.propTypes = {
  userBlocksData: PropTypes.any,
  newBlockType: PropTypes.any,
  setIsSaved: PropTypes.any,
  setNewDropBlockType: PropTypes.any,
}

export default WebBuilder
