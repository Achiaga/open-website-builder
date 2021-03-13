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

const ReactGridLayout = WidthProvider(RGL)

const ROW_HEIGHT = 10

const BlockInception = forwardRef(({ extraProps, ...data }, ref) => {
	const {
		reRender,
		selectedItemId,
		newBlockType = 'text',
		layoutCallback,
		blockKey: parentBlockKey,
		setSelectedItem
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

	function isObjectOutside(newItem) {
		const parentHeight = gridRef.current.parentElement.getBoundingClientRect()
			.height
		const rowsNumber = Math.round(parentHeight / ROW_HEIGHT)
		return newItem.y + newItem.h > rowsNumber
	}

	function handleLayoutChange(layout, oldItem, newItem) {
		if (isObjectOutside(newItem)) {
			return setSecondRender((x) => !x)
		}

		updateLayout(layout)
	}

	const isDroppable = selectedItemId?.includes('inception')
	return (
		<Box
			{...data}
			w='100%'
			h='100%'
			id='inception'
			outline='1px dashed lightgray'>
			<ReactGridLayout
				innerRef={gridRef}
				key={reRender | secondRender ? 'a' : 'b'}
				cols={50}
				rowHeight={ROW_HEIGHT}
				margin={[0, 0]}
				style={{ width: '100%', height: '100%' }}
				autoSize={false}
				preventCollision={!isDroppable}
				isDroppable={isDroppable}
				onDrop={onDrop}
				droppingItem={{ i: 'child-inception-' + newBlockId, w: 2, h: 2 }}
				verticalCompact={false}
				className='layout'
				onDragStop={handleLayoutChange}
				onResizeStop={handleLayoutChange}
				layout={layout}
				// onLayoutChange={onLayoutChange}
			>
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
		setSelectedItem: PropTypes.func
	})
}

export default BlockInception
