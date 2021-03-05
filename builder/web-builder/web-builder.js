import React, { useEffect, useState } from 'react'
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
	const [newBlockId, setNewBlockId] = useState(() => uuid())
	const [rowHeight, setRowHeight] = useState(ROW_HEIGHT)
	function handleEditBlock(editableBlockId) {
		updateLayout((layout) => editItemDraggableProperty(layout, editableBlockId))
	}
	const editBlockCallback = (newData, blockId, operationType) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, newData, operationType)
		)
	}

	function droppableCallback(e) {
		console.log('droppableCallback', e)
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
		setNewBlockId(uuid())
	}

	const onLayoutChange = (layout) => {
		if (layout?.length !== Object.keys(blocksConfig)?.length) return
		updateLayout(layout)
	}

	function handleWindowResize() {
		setRowHeight(window?.innerWidth / GRID_COLUMNS)
	}

	useEffect(() => {
		udpateBlocksConfig((blocksConfig) =>
			addCallbackToBlock(blocksConfig, editBlockCallback)
		)
		window.addEventListener('resize', handleWindowResize)
		setRowHeight(window?.innerWidth / GRID_COLUMNS)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return (
		<Box d='flex' w='100%' flexDir='row' onClick={handleEditBlock}>
			<ReactGridLayout
				cols={GRID_COLUMNS}
				rowHeight={rowHeight}
				onDrop={onDrop}
				margin={[0, 0]}
				autoSize
				isDroppable={false}
				verticalCompact={false}
				droppingItem={{ i: newBlockId, w: 50, h: 50 }}
				style={{ width: '100%', minHeight: '100vh' }}
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
