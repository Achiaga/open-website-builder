import RGL, { WidthProvider } from '../../components/react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useEffect, useRef, useState } from 'react'
import {
  addBlock,
  editBlock,
  editItemDraggableProperty,
  generateBuilderBlocks,
  normalizeLayout,
  normalizeBlockStructure,
  denormalizeInceptionBlock,
} from '../web-builder/helpers'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS } from '../web-builder/constants'
import { useDispatch, useSelector } from 'react-redux'
import {
  addNewBlock,
  getBuilderData,
  getGridRowHeight,
  getNewBlock,
  getSelectedBlockId,
  setLayout,
  setNewBlock,
  udpateBlocksConfigInception,
} from '../../features/builderSlice'
import { BuilderBlock } from '.'

const reactGridConfig = {
  cols: GRID_COLUMNS,
  margin: [0, 0],
  style: { width: '100%', height: '100%' },
  autoSize: false,
  preventCollision: true,
  verticalCompact: false,
  className: 'layout',
}

const ReactGridLayoutWrapper = ({ extraData, children }) => {
  return (
    <Box
      {...extraData}
      w="100%"
      h="100%"
      id="inception"
      cursor="pointer"
      outline="1px dashed lightgray"
    >
      {children}
    </Box>
  )
}

const ReactGridLayout = WidthProvider(RGL)

function isObjectOutside(newItem, rowHeight, gridRef) {
  const parentHeight = gridRef.current.parentElement.getBoundingClientRect()
    .height
  const rowsNumber = Math.round(parentHeight / rowHeight)
  return newItem.y + newItem.h > rowsNumber
}

const BlockInception = ({ extraProps, ...data }) => {
  const dispatch = useDispatch()
  const { type: newBlockType, id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)
  const gridRef = useRef()
  const { layouts, structure } = useSelector(getBuilderData)

  const { reRender, blockId: parentBlockId } = extraProps

  const [secondRender, setSecondRender] = useState(false)

  useEffect(() => {
    setSecondRender(uuid())
  }, [reRender])

  // useEffect(() => {
  //   setLayout((layout) => editItemDraggableProperty(layout, selectedBlockId))
  // }, [selectedBlockId])

  // function updateBlockConfig(layout, newBlocksConfig) {
  //   dispatch(
  //     udpateBlocksConfigInception({
  //       newBlocks: denormalizeInceptionBlock(layout, newBlocksConfig),
  //       parentBlockId,
  //     })
  //   )
  // }

  function onDrop(_, droppedBlockLayout) {
    dispatch(addNewBlock(droppedBlockLayout, parentBlockId))
  }

  function handleLayoutChange(layout, _, newItem) {
    dispatch(setLayout({ ...newItem }))
    if (isObjectOutside(newItem, gridRowHeight, gridRef)) {
      return setSecondRender(uuid())
    }
  }

  const isDroppable = selectedBlockId?.includes('inception')
  // eslint-disable-next-line no-unused-vars
  const { contentEditable, ...extraData } = data
  return (
    <ReactGridLayoutWrapper extraData={extraData}>
      <ReactGridLayout
        {...reactGridConfig}
        innerRef={gridRef}
        key={secondRender}
        rowHeight={gridRowHeight}
        isDroppable={isDroppable}
        onDrop={onDrop}
        droppingItem={{ i: 'child-inception-' + newBlockId, w: 20, h: 10 }}
        onDragStop={handleLayoutChange}
        onResizeStop={handleLayoutChange}
      >
        {structure[parentBlockId]?.map((blockId) => {
          const blockLayout = layouts[blockId]
          return (
            <Box key={blockId} data-grid={blockLayout}>
              <BuilderBlock blockId={blockId} reRender={reRender} />
            </Box>
          )
        })}
      </ReactGridLayout>
    </ReactGridLayoutWrapper>
  )
}

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  extraProps: PropTypes.shape({
    reRender: PropTypes.bool,
    blockKey: PropTypes.string,
    layoutCallback: PropTypes.func,
    rowHeight: PropTypes.number,
  }),
}

export default BlockInception
