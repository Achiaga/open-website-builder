import RGL, { WidthProvider } from '../../components/react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useRef, useState } from 'react'
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
      backgroundImage={`url(${extraData?.imageUrl})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
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
ReactGridLayoutWrapper.propTypes = {
  extraData: PropTypes.any,
  children: PropTypes.any,
}

const ReactGridLayout = WidthProvider(RGL)

function isObjectOutside(newItem, rowHeight, gridRef) {
  const parentElemment = gridRef.current?.parentElement
  const parentHeight = parentElemment.getBoundingClientRect().height
  const rowsNumber = Math.round(parentHeight / rowHeight)
  return newItem.y + newItem.h > rowsNumber
}

const BlockInception = ({ parentBlockId, ...data }) => {
  const dispatch = useDispatch()

  const { id: newBlockId } = useSelector(getNewBlock)
  const selectedBlockId = useSelector(getSelectedBlockId)
  const gridRowHeight = useSelector(getGridRowHeight)
  const { layouts, structure } = useSelector(getBuilderData)

  const gridRef = useRef()

  const [forceRender, setForceRender] = useState(false)

  function onDrop(_, droppedBlockLayout) {
    dispatch(addNewBlock(droppedBlockLayout, parentBlockId))
  }

  function handleLayoutChange(_, __, newItem) {
    if (isObjectOutside(newItem, gridRowHeight, gridRef)) {
      setForceRender(uuid())
    } else {
      dispatch(setLayout({ ...newItem }))
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
        key={forceRender}
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
              <BuilderBlock blockId={blockId} />
            </Box>
          )
        })}
      </ReactGridLayout>
    </ReactGridLayoutWrapper>
  )
}

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
  parentBlockId: PropTypes.string,
}

export default BlockInception
