import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
	addBlock,
	editBlock,
	editItemDraggableProperty,
	generateBuilderBlocks,
	addCallbackToBlock,
	normalizeLayout,
	normalizeBlockStructure,
	denormalizeInceptionBlock
} from '../web-builder/helpers'
import { Box } from '@chakra-ui/react'
import { GRID_COLUMNS } from '../web-builder/constants'

const ReactGridLayout = WidthProvider(RGL)

function isObjectOutside(newItem, rowHeight, gridRef) {
	const parentHeight = gridRef.current.parentElement.getBoundingClientRect()
		.height
	const rowsNumber = Math.round(parentHeight / rowHeight)
	return newItem.y + newItem.h > rowsNumber
}

const BlockInception = forwardRef(({ extraProps, ...data }, ref) => {
	const {
		reRender,
		selectedItemId,
		newBlockType = 'text',
		layoutCallback,
		blockKey: parentBlockKey,
		setSelectedItem,
		rowHeight
	} = extraProps
	const [newBlockId, setNewBlockId] = useState(() => uuid())
	const [secondRender, setSecondRender] = useState(false)
	const gridRef = useRef()
	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(data.blocks)
	)
	const [layout, setLayout] = useState(() => normalizeLayout(data.blocks))

	useEffect(() => {
		udpateBlocksConfig((blocksConfig) =>
			addCallbackToBlock(blocksConfig, editBlockCallback)
		)
	}, [])

	const editBlockCallback = (newData, blockId, operationType) => {
		udpateBlocksConfig((blocksConfig) => {
			const newBlocksConfig = editBlock(
				blocksConfig,
				blockId,
				newData,
				operationType
			)
			layoutCallback(
				denormalizeInceptionBlock(layout, newBlocksConfig),
				parentBlockKey
			)
			return newBlocksConfig
		})
	}

	useEffect(() => {
		setLayout((layout) => editItemDraggableProperty(layout, selectedItemId))
	}, [selectedItemId])

	const updateLayout = (layout) => {
		if (layout?.length !== Object.keys(blocksConfig)?.length) return
		setLayout(layout)
		layoutCallback(
			denormalizeInceptionBlock(layout, blocksConfig),
			parentBlockKey
		)
	}

	function onDrop(layout, droppedBlockLayout) {
		if (newBlockType === 'inception') return null
		setLayout(layout)
		udpateBlocksConfig((blocksConfig) => {
			const newBlocksConfig = addBlock(
				droppedBlockLayout?.i,
				newBlockType,
				blocksConfig,
				editBlockCallback
			)
			layoutCallback(
				denormalizeInceptionBlock(layout, newBlocksConfig),
				parentBlockKey
			)
			return newBlocksConfig
		})
		setNewBlockId(uuid())
	}

	function handleLayoutChange(layout, _, newItem) {
		if (isObjectOutside(newItem, rowHeight, gridRef)) {
			return setSecondRender(uuid())
		}
		updateLayout(layout)
	}

	useEffect(() => {
		setSecondRender(uuid())
	}, [reRender])

	const isDroppable = selectedItemId?.includes('inception')
	const { contentEditable, ...extraData } = data
	return (
		<Box
			{...extraData}
			w='100%'
			h='100%'
			id='inception'
			cursor='pointer'
			outline='1px dashed lightgray'>
			<ReactGridLayout
				innerRef={gridRef}
				key={secondRender}
				cols={GRID_COLUMNS}
				rowHeight={rowHeight}
				margin={[0, 0]}
				style={{ width: '100%', height: '100%' }}
				autoSize={false}
				preventCollision={true}
				isDroppable={isDroppable}
				onDrop={onDrop}
				droppingItem={{ i: 'child-inception-' + newBlockId, w: 20, h: 10 }}
				verticalCompact={false}
				className='layout'
				onDragStop={handleLayoutChange}
				onResizeStop={handleLayoutChange}
				layout={layout}>
				{generateBuilderBlocks(
					blocksConfig,
					setSelectedItem,
					layout,
					selectedItemId
				)}
			</ReactGridLayout>
		</Box>
	)
})

BlockInception.displayName = 'BlockInception'

BlockInception.propTypes = {
	extraProps: PropTypes.shape({
		reRender: PropTypes.bool,
		blockKey: PropTypes.string,
		newBlockType: PropTypes.string,
		selectedItemId: PropTypes.string,
		layoutCallback: PropTypes.func,
		setSelectedItem: PropTypes.func,
		rowHeight: PropTypes.number
	})
}

export default BlockInception
