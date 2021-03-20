import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
  denormalizeBlockData,
  generateBuilderBlocks,
  normalizeBlockStructure,
  normalizeLayout,
  saveOnLocal,
  addBlock,
  addCallbackToBlock,
  editBlock,
  editItemDraggableProperty,
} from './helpers'
import { GRID_COLUMNS } from './constants'
import { DELETE } from '../blocks/constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  getSelectedBlockId,
  setGridRowHeight,
  setNewBlock,
  setSelectedBlockId,
} from '../../features/builderSlice'

const ReactGridLayout = WidthProvider(RGL)

function reconstructBlocksConfig(blocksConfig, parentBlockKey, newBlocks) {
  return {
    ...blocksConfig,
    [parentBlockKey]: {
      ...blocksConfig[parentBlockKey],
      data: {
        ...blocksConfig[parentBlockKey]?.data,
        ...newBlocks,
      },
    },
  }
}

const WebBuilder = () => {
  const dispatch = useDispatch()
  const userBlocksData = useSelector(getBuilderData)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)

  const [reRender, setReRender] = useState(false)
  const [realBlockData] = useState(userBlocksData)
  const [blocksConfig, udpateBlocksConfig] = useState(() =>
    normalizeBlockStructure(realBlockData)
  )
  const [layout, updateLayout] = useState(() => normalizeLayout(realBlockData))

  const debouncedSaved = () => {
    saveOnLocal(denormalizeBlockData(layout, { ...blocksConfig }))
  }

  useEffect(() => {
    debouncedSaved(layout, blocksConfig)
  }, [layout, blocksConfig])

  useEffect(() => {
    udpateBlocksConfig((blocksConfig) =>
      addCallbackToBlock(blocksConfig, editBlockCallback)
    )
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
    updateLayout((layout) => editItemDraggableProperty(layout, editableBlockId))
  }

  const editBlockCallback = (newData, blockId, operationType) => {
    if (operationType === DELETE) {
      dispatch(setSelectedBlockId(null))
    }
    udpateBlocksConfig((blocksConfig) =>
      editBlock(blocksConfig, blockId, newData, operationType)
    )
  }

  function onDrop(layout, droppedBlockLayout) {
    updateLayout(layout)
    udpateBlocksConfig((blocksConfig) =>
      addBlock(
        droppedBlockLayout?.i,
        newBlockType,
        blocksConfig,
        editBlockCallback
      )
    )
    dispatch(setNewBlock({ type: null }))
  }

  const onLayoutChange = (layout) => {
    if (layout?.length !== Object.keys(blocksConfig)?.length) return
    updateLayout(layout)
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
    udpateBlocksConfig((blocksConfig) => {
      const newBlocksConfig = reconstructBlocksConfig(
        blocksConfig,
        parentBlockKey,
        newBlocks
      )
      saveOnLocal(denormalizeBlockData(layout, newBlocksConfig))
      return newBlocksConfig
    })
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
        cols={GRID_COLUMNS}
        rowHeight={gridRowHeight}
        onDrop={onDrop}
        margin={[0, 0]}
        autoSize
        preventCollision={!!newBlockType}
        isDroppable={isDroppable}
        onResizeStop={handleResize}
        verticalCompact={false}
        // This makes everything go 6x slower
        // This also makes the drop block go crazy while dragging
        useCSSTransforms={isDroppable}
        droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 15, h: 10 }}
        style={{ width: '100%', minHeight: '100vh', height: '100%' }}
        className={'layout'}
        layout={layout}
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
