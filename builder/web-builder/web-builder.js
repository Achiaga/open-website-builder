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
  const { blocks, layouts, structure } = useSelector(getBuilderData)
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)
  const hierarchy = useSelector(getHierarchy)
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

  function isNewItemInsideInception(l1, l2) {
    if (l1.i === l2.i) return false // same element
    if (l1.x + l1.w <= l2.x) return false // l1 is left of l2
    if (l1.x >= l2.x + l2.w) return false // l1 is right of l2
    if (l1.y + l1.h <= l2.y) return false // l1 is above l2
    if (l1.y >= l2.y + l2.h) return false // l1 is below l2
    return true // boxes overlap
  }

  function findItemParent(item, parents) {
    return parents.filter((parentCandidate) =>
      isNewItemInsideInception(parentCandidate, item)
    )
  }

  function isBlockInHierarchy(hierarchy, item) {
    return Object.keys(hierarchy).reduce((acc, parentId) => {
      const isParentsChild = hierarchy[parentId].find(
        (child) => child === item.i
      )
      if (isParentsChild) return parentId
      return acc
    }, null)
  }

  function getAllParents(newLayout) {
    return newLayout.filter(({ i }) => i.includes('inception'))
  }

  function handleLayoutChange(newLayout, __, newItem) {
    const parents = getAllParents(newLayout)
    const updatedHierarchy = { ...(hierarchy || {}) }
    const oldParentId = isBlockInHierarchy(updatedHierarchy, newItem)

    const parentList = findItemParent(newItem, parents)
    const newParent = parentList?.[0]
    if (oldParentId && !newParent) {
      updatedHierarchy[oldParentId] = updatedHierarchy[oldParentId].filter(
        (child) => child !== newItem.i
      )
    }
    if (!!newParent && newParent?.i !== oldParentId) {
      updatedHierarchy[newParent.i] = [
        ...(updatedHierarchy[newParent.i] || []),
        newItem.i,
      ]
    }

    dispatch(setHierarchy(updatedHierarchy))
    dispatch(setLayouts(newLayout))
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
        onResizeStop={handleLayoutChange}
        onDragStop={handleLayoutChange}
        useCSSTransforms={!selectedBlockId}
        droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 15, h: 10 }}
        layout={getLayout()}
        hierarchy={hierarchy}
      >
        {getLayout().map(({ i }) => {
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
