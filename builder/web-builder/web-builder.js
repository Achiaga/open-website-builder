import React, { useCallback, useEffect, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/layout'
import { v4 as uuid } from 'uuid'

import { getParentBlock, highlightFutureParentBlock } from './helpers'
import { GRID_COLUMNS } from './constants'
import { batch, useDispatch, useSelector } from 'react-redux'
import {
  getGridRowHeight,
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  getLayoutsKeys,
  getHierarchy,
  getNewBlockType,
  getLayout,
  getIsMobileBuilder,
  setGroupSelectedBlocksIds,
} from '../../features/builderSlice'

import MemoDrag from './components/draggable-item'
import MultipleSelection from './multiple-selection'

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
        onClick={() => {
          dispatch(setBlockEditable(null))
        }}
        id="main-builder"
        overflow="hidden"
        pos="relative"
        className="droppable-element elements selecto-area"
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
GridLayoutWrapper.displayName = 'GridLayoutWrapper'

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
      batch(() => {
        dispatch(setBlockEditable(null))
        dispatch(setGroupSelectedBlocksIds([]))
      })
    }
  }
  return (
    <>
      <GridLayoutWrapper
        ref={builderRef}
        higlightOnDrop={higlightOnDrop}
        handleDropNewItem={handleDropNewItem}
      >
        <MultipleSelection />
        <MemoizeLayoutsRender
          layouts={layoutsKeys}
          handleHiglightSection={handleHiglightSectionMiddleWare}
          removeHighlightedElem={removeHighlightedElem}
          gridRowHeight={gridRowHeight}
          gridColumnWidth={gridColumnWidth}
          builderRef={builderRef}
        />
      </GridLayoutWrapper>
    </>
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
