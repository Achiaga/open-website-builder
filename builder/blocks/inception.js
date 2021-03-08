import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { forwardRef, useEffect, useState } from 'react'
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

const BlockInception = forwardRef(({ extraProps, ...data }, ref) => {
	const {
		reRender,
		selectedItemId: parenSelectedItem,
		newBlockType = 'text',
		layoutCallback,
		blockKey: parentBlockKey
	} = extraProps
	const [newBlockId, setNewBlockId] = useState(() => uuid())
	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(data.blocks)
	)
	const [layout, setLayout] = useState(() => normalizeLayout(data.blocks))
	const [selectedItemId, setSelectedItem] = useState(null)

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
			layoutCallback(newBlocksConfig)
			return newBlocksConfig
		})
	}

	function setBlockEditable(editableBlockId) {
		setSelectedItem(editableBlockId)
		setLayout((layout) => editItemDraggableProperty(layout, editableBlockId))
	}

	const onLayoutChange = (layout) => {
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

	const isDroppable = parenSelectedItem?.includes('inception')
	return (
		<Box {...data} w='100%' h='100%' id='inception'>
			<ReactGridLayout
				key={reRender ? 'a' : 'b'}
				cols={10}
				rowHeight={10}
				margin={[0, 0]}
				height={100}
				style={{ width: '100%', height: '100%' }}
				autoSize={false}
				preventCollision={isDroppable}
				isDroppable={isDroppable}
				useCSSTransforms={false}
				onDrop={onDrop}
				droppingItem={{ i: newBlockId, w: 5, h: 5 }}
				verticalCompact={false}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{generateBuilderBlocks(
					blocksConfig,
					setBlockEditable,
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
		layoutCallback: PropTypes.func
	})
}

export default BlockInception
