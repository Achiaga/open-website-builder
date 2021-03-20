import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from '../../components/react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
  denormalizeBlockData,
  generateBuilderBlocks,
  saveOnLocal,
} from './helpers'
import { GRID_COLUMNS } from './constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  getSelectedBlockId,
  setGridRowHeight,
  setNewBlock,
  setSelectedBlockId,
  upadateLayout,
  addBlockConfig,
  udpateBlocksConfigInception,
} from '../../features/builderSlice'

const reactGridLayoutProps = {
  cols: GRID_COLUMNS,
  autoSize: true,
  margin: [0, 0],
  style: { width: '100%', minHeight: '100vh', height: '100%' },
  className: 'layout',
  verticalCompact: false,
}

const ReactGridLayout = WidthProvider(RGL)

const WebBuilder = () => {
  const dispatch = useDispatch()
  const { blocksConfig, layout } = useSelector(getBuilderData)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)

  const saveData = () => {
    saveOnLocal(denormalizeBlockData(layout, { ...blocksConfig }))
  }

  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    saveData(layout, blocksConfig)
  }, [layout, blocksConfig])

  useEffect(() => {
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  function setBlockEditable(editableBlockId) {
    dispatch(setSelectedBlockId(editableBlockId))
    dispatch(upadateLayout({ editableBlockId }))
  }

  function onDrop(newLayout, droppedBlockLayout) {
    dispatch(upadateLayout({ newLayout }))
    dispatch(
      addBlockConfig({
        newBlockId: droppedBlockLayout?.i,
      })
    )
    dispatch(setNewBlock({ type: null }))
  }

  const onLayoutChange = (newLayout) => {
    if (newLayout?.length !== Object.keys(blocksConfig)?.length) return
    dispatch(upadateLayout({ newLayout }))
  }

  function handleWindowResize() {
    dispatch(setGridRowHeight(window?.innerWidth / GRID_COLUMNS))
  }

  function handleResize(_, oldItem, newItem) {
    if (newItem.i.includes('inception') && newItem.w !== oldItem.w) {
      setReRender((value) => !value)
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Escape') {
      setBlockEditable(null)
    }
  }

  function layoutCallback(newBlocks, parentBlockKey) {
    dispatch(udpateBlocksConfigInception({ newBlocks, parentBlockKey }))
  }
  console.log(layout)
  const isDroppable = !selectedBlockId?.includes('inception')
  return (
    <Box
      d="flex"
      w="100%"
      flexDir="row"
      onClick={() => setBlockEditable(null)}
      id="main-builder"
    >
      <ReactGridLayout
        {...reactGridLayoutProps}
        rowHeight={gridRowHeight}
        onDrop={onDrop}
        preventCollision={!!newBlockType}
        isDroppable={isDroppable}
        onResizeStop={handleResize}
        useCSSTransforms={isDroppable}
        droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 15, h: 10 }}
        layout={layout.reduce((acc, item) => {
          return [...acc, { ...item }]
        }, [])}
        onLayoutChange={onLayoutChange}
      >
        {generateBuilderBlocks(
          blocksConfig,
          setBlockEditable,
          reRender,
          layoutCallback
        )}
      </ReactGridLayout>
    </Box>
  )
}

WebBuilder.propTypes = {
  userBlocksData: PropTypes.any,
  newBlockType: PropTypes.any,
  setIsSaved: PropTypes.any,
  setNewBlockType: PropTypes.any,
}

export default WebBuilder
