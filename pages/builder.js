import { useState } from 'react'
import { generateLayout } from '../builder/helpers'
import { v4 as uuid } from 'uuid'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import WebBuilder from '../builder/web-builder'
import { WebPreview } from '../builder/preview'

const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

const initialLayout = [
	{ i: 'a', x: 0, y: 0, w: 3, h: 2 },
	{ i: 'b', x: 3, y: 0, w: 3, h: 2 },
	{ i: 'c', x: 6, y: 0, w: 4, h: 2 },
	{ i: 'd', x: 0, y: 2, w: 3, h: 2 }
]

const initialLB = {
	a: {
		type: 'title',
		data: {
			text: 'Hola, soy Pedro',
			callback: () => {}
		}
	},
	b: { type: 'img', data: imageURL },
	c: {
		type: 'list',
		data: { title: 'My Skills', elements: ['Code', 'Money', 'Marketing'] }
	},
	d: {
		type: 'list',
		data: { title: 'Hoobies', elements: ['Code', 'Money', 'Marketing'] }
	}
}

const editTitleBlock = (blocks, id, value) => {
	return {
		...blocks,
		[id]: { ...blocks[id], data: { ...blocks[id].data, text: value } }
	}
}

const editBlock = (blocks, id, value) => {
	if (blocks[id].type === 'title') {
		const editedBlock = editTitleBlock(blocks, id, value)
		return editedBlock
	}
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
			data: { text: 'Change the ext', callback }
		}
	}
}

const addBlock = (newId, blockType, blocks, callback) => {
	if (blockType === 'title') return addTextBlock(newId, blocks, callback)
	if (blockType === 'image') return addImageBlock(newId, blocks, callback)
}

const TitleBlock = ({ setNewBlock }) => {
	return (
		<div
			style={{ height: '50px', width: '50px', border: '1px solid' }}
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlock('title')
			}}>
			Title
		</div>
	)
}
const ImageBlock = ({ setNewBlock }) => {
	return (
		<div
			style={{ height: '50px', width: '50px', border: '1px solid' }}
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlock('image')
			}}>
			Image
		</div>
	)
}

const BlocksSidebar = ({ setNewBlock }) => {
	return (
		<>
			<TitleBlock setNewBlock={setNewBlock} />
			<ImageBlock setNewBlock={setNewBlock} />
		</>
	)
}

const Builder = () => {
	const [layoutBlocks, setLayoutBlocks] = useState(initialLB)
	const [newBlockType, setNewBlockType] = useState(null)
	const [layout, setLayout] = useState(initialLayout)

	const handleCallback = (value, blockId) => {
		setLayoutBlocks((layoutBlocks) => {
			const block = editBlock(layoutBlocks, blockId, value)
			console.log({ block })
			return block
		})
	}

	function handleAddItemText() {
		setLayoutBlocks(addTextBlock(layoutBlocks))
	}

	function onDrop(_, layoutItem) {
		const newId = uuid()
		const newLayout = [...layout, { ...layoutItem, i: newId.toString() }]
		setLayout(newLayout)
		setLayoutBlocks(addBlock(newId, newBlockType, layoutBlocks, handleCallback))
	}

	const handleLayoutChange = (layout) => {
		if (layout.length !== Object.keys(layoutBlocks).length) return
		setLayout(layout)
	}

	return (
		<>
			<button onClick={handleAddItemText}>Add Text</button>
			<div
				style={{
					display: 'flex',
					margin: 'auto',
					flexDirection: 'row'
				}}>
				<BlocksSidebar setNewBlock={setNewBlockType} />
				<WebBuilder
					onLayoutChange={handleLayoutChange}
					layout={layout}
					onDrop={onDrop}
					isDroppable={true}
					Layouts={generateLayout(layoutBlocks)}
				/>
				<WebPreview layout={layout} layoutBlocks={layoutBlocks} />
			</div>
		</>
	)
}

export default Builder
