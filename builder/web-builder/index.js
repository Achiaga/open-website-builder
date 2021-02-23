import React from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { imageURL } from '../initial-data'

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

const WebBuilder = ({
	layout,
	Blocks,
	isDroppable,
	setLayoutBlocks,
	setLayout,
	newBlockType,
	layoutBlocks
}) => {
	const handleCallback = (value, blockId) => {
		setLayoutBlocks((layoutBlocks) => editBlock(layoutBlocks, blockId, value))
	}
	function onDrop(layout, layoutItem) {
		const newId = uuid()
		const newLayout = [...layout, { ...layoutItem, i: newId.toString() }]
		setLayout(newLayout)
		setLayoutBlocks((layoutBlocks) =>
			addBlock(newId, newBlockType, layoutBlocks, handleCallback)
		)
	}

	const onLayoutChange = (layout) => {
		if (layout.length !== Object.keys(layoutBlocks).length) return
		setLayout(layout)
	}

	return (
		<div
			style={{
				display: 'flex',
				width: '50vw',
				margin: 'auto',
				flexDirection: 'row'
			}}>
			<ReactGridLayout
				onClick={(e) => console.log(e)}
				cols={10}
				rowHeight={50}
				onDrop={onDrop}
				isDroppable={isDroppable}
				style={{ width: '500px', height: '100vh' }}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{Blocks}
			</ReactGridLayout>
		</div>
	)
}

WebBuilder.propTypes = {
	layout: PropTypes.any,
	Blocks: PropTypes.any,
	isDroppable: PropTypes.any,
	setLayoutBlocks: PropTypes.any,
	setLayout: PropTypes.any,
	newBlockType: PropTypes.any,
	layoutBlocks: PropTypes.any
}

export default WebBuilder
