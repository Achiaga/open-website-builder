import React, { useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { imageURL } from '../initial-data'
import { Box } from '@chakra-ui/react'
import { generateBuilderBlocks } from '../helpers'

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

const addBlock = (newId, blockType, blocks, editBlock) => {
	if (blockType === 'title') return addTextBlock(newId, blocks, editBlock)
	if (blockType === 'image') return addImageBlock(newId, blocks, editBlock)
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
const addTextBlock = (newId, blocks, editBlock) => {
	return {
		...blocks,
		[newId]: {
			type: 'title',
			data: {
				text: 'Change the ext',
				editBlock,
				fontSize: '1rem',
				textAlign: 'center',
				fontColor: '#4a40ce',
				bgColor: '#fff'
			}
		}
	}
}

const GRID_COLUMNS = 10
const ROW_HEIGHT = 50

const editDraggableItemProperty = (layout, editableBlock) => {
	return layout.map((layoutItem) => {
		if (layoutItem.i === editableBlock) {
			return { ...layoutItem, isDraggable: !layoutItem.isDraggable }
		}
		return { ...layoutItem, isDraggable: true }
	})
}

const inceptionLayout = [
	{ i: 'a1', x: 0, y: 0, w: 1, h: 2, isBounded: true },
	{ i: 'b2', x: 1, y: 0, w: 3, h: 2, isBounded: true }
]

const Inception = (reRender) => {
	const [layout, setLayout] = useState(inceptionLayout)
	const onLayoutChange = (layout) => {
		console.log(layout)
		setLayout(layout)
	}
	console.log(reRender)
	return (
		<ReactGridLayout
			autoSize
			useCSSTransforms={false}
			key={reRender ? 'a' : 'b'}
			cols={20}
			rowHeight={10}
			height={250}
			className='layout'
			onLayoutChange={onLayoutChange}
			layout={layout}>
			<div key='a1'>
				<div contentEditable> Hola A</div>
			</div>
			<div key='b2'>
				<div
					style={{
						backgroundImage: `url(${imageURL})`,
						width: '100%',
						height: '100%',
						backgroundPosition: '50% 50%',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover'
					}}
				/>
			</div>
		</ReactGridLayout>
	)
}

const WebBuilder = ({
	layout,
	isDroppable,
	udpateBlocksConfig,
	updateLayout,
	newBlockType,
	blocksConfig
}) => {
	const [reRender, setReRender] = useState(false)
	function handleEditBlock(editableBlock) {
		updateLayout((layout) => editDraggableItemProperty(layout, editableBlock))
	}

	const editBlockCallback = (value, blockId) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, value)
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
		if (layout.length !== Object.keys(blocksConfig).length) return
		updateLayout(layout)
	}
	function handleResize(e) {
		if (
			e.find((item) => item.i === 'e').w !==
			layout.find((item) => item.i === 'e').w
		) {
			setReRender((value) => !value)
		}
	}
	return (
		<Box d='flex' w='50vw' m='auto' flexDir='row' onClick={handleEditBlock}>
			<ReactGridLayout
				cols={GRID_COLUMNS}
				rowHeight={ROW_HEIGHT}
				onDrop={onDrop}
				droppingItem={{ i: uuid(), w: 4, h: 4 }}
				isDroppable={isDroppable}
				style={{ width: '500px', background: 'lightblue', height: '100vh' }}
				className='layout'
				layout={layout}
				// onResizeStop={handleResize}
				onLayoutChange={onLayoutChange}>
				{/* <div key='e' style={{ border: '1px solid', background: 'lightgray' }}>
					{Inception(reRender)}
				</div> */}
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
