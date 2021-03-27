import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from '../../components/react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { saveOnLocal } from './helpers'
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
  setLayout,
  addNewBlock,
  getResizingBlock,
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

const WebBuilder = () => {
  const dispatch = useDispatch()
  const { blocks, layouts, structure } = useSelector(getBuilderData)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)
  const [reRender, setReRender] = useState(null)

  useEffect(() => {
    saveOnLocal({ blocks, layouts, structure })
  }, [blocks, layouts, structure])

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

  function handleLayoutChange(_, __, newItem) {
    dispatch(setLayout({ ...newItem }))
    // setReRender((render) => !render)
    setTimeout(() => {
      dispatch(setResizingBlockId(null))
    }, 1000)
  }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      dispatch(setBlockEditable(null))
    }
  }

  const isDroppable = !selectedBlockId?.includes('inception')

  function handleAddSize(_, __, resizingBlock) {
    dispatch(setResizingBlockId(resizingBlock))
  }

  function geLayout(parent = 'main') {
    return Object.values(layouts).filter((layout) =>
      structure[parent].includes(layout.i)
    )
  }
  console.log('render', reRender ? v4() : '')
  return (
    <GridLayoutWrapper>
      <ReactGridLayout
        key={reRender ? v4() : ''}
        {...reactGridLayoutProps}
        rowHeight={gridRowHeight}
        onDrop={onDrop}
        preventCollision={!!newBlockType}
        isDroppable={isDroppable}
        onResize={handleAddSize}
        onResizeStop={handleLayoutChange}
        onDragStop={handleLayoutChange}
        useCSSTransforms={!selectedBlockId}
        droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 15, h: 10 }}
        layout={geLayout()}
      >
        {structure['main'].map((blockId) => (
          <Box key={blockId}>
            <BuilderBlock blockId={blockId} />
          </Box>
        ))}
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
