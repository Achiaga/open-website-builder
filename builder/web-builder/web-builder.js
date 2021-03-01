import React, { useEffect } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Box } from '@chakra-ui/react'
import { generateBuilderBlocks } from './helpers'
import {
	addBlock,
	addCallbackToBlock,
	editBlock,
	editItemDraggableProperty
} from './helpers'
import { GRID_COLUMNS, ROW_HEIGHT } from './constants'

const ReactGridLayout = WidthProvider(RGL)

const WebBuilder = ({
	layout,
	blocksConfig,
	udpateBlocksConfig,
	updateLayout,
	newBlockType
}) => {
	function handleEditBlock(editableBlock) {
		updateLayout((layout) => editItemDraggableProperty(layout, editableBlock))
	}
	const editBlockCallback = (newData, blockId, operationType) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, newData, operationType)
		)
	}

	function onDrop(layout, droppedBlockLayout) {
		updateLayout(layout)
		udpateBlocksConfig((blocksConfig) =>
			addBlock(
				droppedBlockLayout.i,
				newBlockType,
				blocksConfig,
				editBlockCallback
			)
		)
	}

	const onLayoutChange = (layout) => {
		if (layout?.length !== Object.keys(blocksConfig)?.length) return
		updateLayout(layout)
	}

	useEffect(() => {
		udpateBlocksConfig((blocksConfig) =>
			addCallbackToBlock(blocksConfig, editBlockCallback)
		)
	}, [])

	return (
		<Box d='flex' w='100%' flexDir='row' onClick={handleEditBlock}>
			<ReactGridLayout
				cols={GRID_COLUMNS}
				rowHeight={ROW_HEIGHT}
				onDrop={onDrop}
				autoSize
				isDroppable
				droppingItem={{ i: uuid(), w: 4, h: 4 }}
				style={{ width: '100%', background: 'lightblue' }}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{generateBuilderBlocks(blocksConfig, handleEditBlock, layout)}
			</ReactGridLayout>
		</Box>
	)
}

WebBuilder.propTypes = {
	layout: PropTypes.any,
	isDroppable: PropTypes.any,
	udpateBlocksConfig: PropTypes.any,
	updateLayout: PropTypes.any,
	newBlockType: PropTypes.any,
	blocksConfig: PropTypes.any
}

export default WebBuilder
