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

  function containsInX(parent, child) {
    return child.x >= parent.x && child.x <= parent.x + parent.w
  }
  function containsInY(parent, child) {
    return child.y >= parent.y && child.y <= parent.y + parent.h
  }

  function isNewItemInsideInception(parent, child) {
    if (parent.i === child.i) return false
    if (containsInX(parent, child) && containsInY(parent, child)) return true
    return false
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

  function getIsGammaInception(hierarchy, parentId, parents) {
    const parentsIds = parents.map((parent) => parent.i)
    const childsId = hierarchy?.[parentId]
    const inceptionChilds = childsId?.filter((childId) =>
      parentsIds.includes(childId)
    )
    const isGammaInception = !inceptionChilds || inceptionChilds?.length < 1
    return isGammaInception
  }

  function solveParentConflict(parents, hierarchy) {
    if (parents.length < 2) return parents[0]
    for (let parent of parents) {
      const isGammaInception = getIsGammaInception(hierarchy, parent.i, parents)
      if (isGammaInception) return parent
    }
    return parents[0]
  }

  function removeChildFromOldParent(hierarchy, oldParentId, newItemId) {
    let updatedHierarchy = { ...(hierarchy || {}) }
    updatedHierarchy[oldParentId] = updatedHierarchy[oldParentId].filter(
      (child) => child !== newItemId
    )

    return updatedHierarchy
  }
  function addChildToNewParent(hierarchy, newParentId, newItemId) {
    let updatedHierarchy = { ...(hierarchy || {}) }
    updatedHierarchy[newParentId] = [
      ...(updatedHierarchy[newParentId] || []),
      newItemId,
    ]
    return updatedHierarchy
  }

  function shoudlRemoveChildFromOldParent(oldParentId, newParent) {
    return (
      (oldParentId && newParent?.i !== oldParentId) ||
      (oldParentId && !newParent?.i)
    )
  }

  function shouldAddChildToNewParent(newParent, oldParentId) {
    return !!newParent && newParent?.i !== oldParentId
  }

  function getParentBlock(newLayout, updatedHierarchy, newItem) {
    const allInceptions = getAllParents(newLayout)
    const parentList = findItemParent(newItem, allInceptions)

    const oldParentId = isBlockInHierarchy(updatedHierarchy, newItem)
    const newParent = solveParentConflict(parentList, hierarchy)
    return { oldParentId, newParent }
  }

  function handleLayoutChange(newLayout, __, newItem) {
    let updatedHierarchy = { ...(hierarchy || {}) }
    if (updatedHierarchy) {
      const { newParent, oldParentId } = getParentBlock(
        newLayout,
        updatedHierarchy,
        newItem
      )
      if (shoudlRemoveChildFromOldParent(oldParentId, newParent)) {
        updatedHierarchy = removeChildFromOldParent(
          updatedHierarchy,
          oldParentId,
          newItem.i
        )
      }

      if (shouldAddChildToNewParent(newParent, oldParentId)) {
        updatedHierarchy = addChildToNewParent(
          updatedHierarchy,
          newParent.i,
          newItem.i
        )
      }

      console.log('updatedHierarchy', updatedHierarchy)
    }

    dispatch(setHierarchy(updatedHierarchy))
    dispatch(setLayouts(newLayout))
    // setReRender((render) => !render)
    setTimeout(() => {
      dispatch(setResizingBlockId(null))
    }, 1000)
  }

  function handleDrag(layout, _, newItem) {
    const { newParent } = getParentBlock(layout, hierarchy || {}, newItem)
    if (newParent?.i) {
      const elem = document.getElementById(newParent.i)
      // elem.style.backgroundColor = 'green'
      console.log(elem)
    }
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
