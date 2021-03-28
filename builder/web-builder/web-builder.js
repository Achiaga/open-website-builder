import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from '../../components/react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { saveOnLocal, getUpdatedHierarchy } from './helpers'
import { GRID_COLUMNS } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  getSelectedBlockId,
  setResizingBlockId,
  setGridRowHeight,
  setBlockEditable,
  addNewBlock,
  setLayouts,
  setHierarchy,
  getHierarchy,
} from '../../features/builderSlice'
import { BuilderBlock } from '../blocks'
import { v4 } from 'uuid'

const reactGridLayoutProps = {
  cols: GRID_COLUMNS,
  autoSize: true,
  margin: [0, 0],
  style: { width: '100%', minHeight: '100vh', height: '100%' },
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
      flexDir="row"
      onClick={() => dispatch(setBlockEditable(null))}
      id="main-builder"
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
  const { blocks, layouts, hierarchy } = useSelector(getBuilderData)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)
  // const hierarchy = useSelector(getHierarchy)
  const [reRender, setReRender] = useState(null)

  useEffect(() => {
    saveOnLocal({ blocks, layouts, hierarchy })
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

  function onDrop(_, droppedBlockLayout) {
    dispatch(addNewBlock(droppedBlockLayout))
  }

  function handleWindowResize() {
    dispatch(setGridRowHeight(window?.innerWidth / GRID_COLUMNS))
  }

  function handleLayoutChange(newLayout, __, newItem) {
    const updatedHierarchy = getUpdatedHierarchy(newLayout, newItem, hierarchy)
    dispatch(setHierarchy(updatedHierarchy))
    dispatch(setLayouts(newLayout))
    setTimeout(() => {
      dispatch(setResizingBlockId(null))
    }, 1000)
  }

  function handleDrag(layout, _, newItem) {
    // const { newParent } = getParentBlock(layout, hierarchy || {}, newItem)
    // if (newParent?.i) {
    //   const elem = document.getElementById(newParent.i)
    //   // elem.style.backgroundColor = 'green'
    //   console.log(elem)
    // }
  }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }

  function handleAddSize(_, __, resizingBlock) {
    dispatch(setResizingBlockId(resizingBlock))
  }

  function getLayout() {
    return Object.values(layouts).filter((layout) => layout)
  }
  return (
    <GridLayoutWrapper>
      <ReactGridLayout
        key={reRender ? v4() : ''}
        {...reactGridLayoutProps}
        rowHeight={gridRowHeight}
        onDrop={onDrop}
        preventCollision={!!newBlockType}
        isDroppable={true}
        onResize={handleAddSize}
        onDrag={handleDrag}
        onResizeStop={handleLayoutChange}
        onDragStop={handleLayoutChange}
        useCSSTransforms={true}
        droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 15, h: 10 }}
        layout={layouts}
        hierarchy={hierarchy}
      >
        {layouts.map(({ i }) => {
          const { type } = blocks[i]
          return (
            <Box key={i} zIndex={blocksZIndex[type]}>
              <BuilderBlock blockId={i} />
            </Box>
          )
        })}
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
