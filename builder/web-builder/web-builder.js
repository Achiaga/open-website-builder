import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { imageURL } from '../initial-data'
import { Box } from '@chakra-ui/react'
import { generateBuilderView } from '../helpers'

const ReactGridLayout = WidthProvider(RGL)

const editTitleBlock = (blocks, id, data) => {
	return {
		...blocks,
		[id]: { ...blocks[id], data }
	}
}

const editBlock = (blocks, id, value) => {
	if (blocks[id].type === 'title') {
		const editedBlock = editTitleBlock(blocks, id, value)
		return editedBlock
	}
}

const addBlock = (newId, blockType, blocks, callback) => {
	if (blockType === 'title') return addTextBlock(newId, blocks, callback)
	if (blockType === 'image') return addImageBlock(newId, blocks, callback)
}

const addImageBlock = (newId, blocks) => {
	return {
		...blocks,
		[newId]: {
			type: 'img',
			data: imageURL
		}
	}
}
const addTextBlock = (newId, blocks, callback) => {
	return {
		...blocks,
		[newId]: {
			type: 'title',
			data: {
				text: 'Change the ext',
				callback,
				fontSize: '20px',
				textAlign: 'center',
				color: 'blue'
			}
		}
	}
}

const GRID_COLUMNS = 10
const ROW_HEIGHT = 50

const WebBuilder = ({
	layout,
	isDroppable,
	udpateBlocksConfig,
	updateLayout,
	newBlockType,
	blocksConfig
}) => {
	const BuilderBlocks = generateBuilderView(blocksConfig)

	const editBlockCallback = (value, blockId) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, value)
		)
	}
	function onDrop(layout, droppedBlockLayout) {
		const blockID = uuid()
		const newLayout = [
			...layout,
			{ ...droppedBlockLayout, i: blockID.toString() }
		]
		updateLayout(newLayout)
		udpateBlocksConfig((blocksConfig) =>
			addBlock(blockID, newBlockType, blocksConfig, editBlockCallback)
		)
	}

	const onLayoutChange = (layout) => {
		if (layout.length !== Object.keys(blocksConfig).length) return
		updateLayout(layout)
	}

	return (
		<Box d='flex' w='50vw' m='auto' flexDir='row'>
			<ReactGridLayout
				cols={GRID_COLUMNS}
				rowHeight={ROW_HEIGHT}
				onDrop={onDrop}
				isDroppable={isDroppable}
				style={{ width: '500px', height: '100vh' }}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{BuilderBlocks}
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
