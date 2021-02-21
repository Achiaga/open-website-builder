import React, { useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { generateLayout, generatePageCode } from '../builder/helpers'
import { v4 as uuid } from 'uuid'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ReactGridLayout = WidthProvider(RGL)

const imageURL =
	'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

const initialLayout = [
	{ i: 'a', x: 0, y: 0, w: 3, h: 2 },
	{ i: 'b', x: 3, y: 0, w: 3, h: 2 },
	{ i: 'c', x: 6, y: 0, w: 4, h: 2 },
	{ i: 'd', x: 0, y: 2, w: 3, h: 2 }
]

const WebBuilder = ({
	onLayoutChange,
	layout,
	Layouts,
	onDrop,
	isDroppable
}) => {
	return (
		// <div
		// 	style={{
		// 		display: 'flex',
		// 		width: '50vw',
		// 		margin: 'auto',
		// 		flexDirection: 'row'
		// 	}}>
		<ReactGridLayout
			cols={10}
			rowHeight={50}
			onDrop={onDrop}
			isDroppable={isDroppable}
			style={{ width: '500px', height: '100vh' }}
			className='layout'
			layout={layout}
			onLayoutChange={onLayoutChange}>
			{Layouts}
		</ReactGridLayout>
		// </div>
	)
}

const WebPreview = ({ pageDesign }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(10, 1fr)',
				gridTemplateRows: 'repeat(10, 1fr)',
				width: '50vw',
				height: '100vh',
				borderLeft: '1px solid black'
			}}>
			{pageDesign}
		</div>
	)
}

const editTitleBlock = (blocks, id, value) => {
	return {
		...blocks,
		[id]: { ...blocks[id], data: { ...blocks[id].data, text: value } }
	}
}

const editBlock = (blocks, id, value) => {
	if (blocks[id].type === 'title') return editTitleBlock(blocks, id, value)
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

const Builder = () => {
	const [layoutBlocks, setLayoutBlocks] = useState(initialLB)
	const [layout, setLayout] = useState(initialLayout)
	const [pageDesign, setPageDesign] = useState(null)

	const handleCallback = (value, blockId) => {
		setLayoutBlocks((layoutBlocks) => editBlock(layoutBlocks, blockId, value))
	}

	function handleAddItemText() {
		setLayoutBlocks(addTextBlock(layoutBlocks))
	}
	function onDrop(_, layoutItem) {
		const newId = uuid()
		const newLayout = [...layout, { ...layoutItem, i: newId.toString() }]
		setLayout(newLayout)
		setLayoutBlocks(addTextBlock(newId, layoutBlocks, handleCallback))
	}
	const handleLayoutChange = (layout) => {
		if (layout.length !== layoutBlocks.length) return
		setLayout(layout)
	}

	useEffect(() => {
		setPageDesign(generatePageCode(layout, layoutBlocks))
	}, [layout, layoutBlocks])

	return (
		<>
			<button onClick={handleAddItemText}>Add Text</button>
			<div
				style={{
					display: 'flex',
					margin: 'auto',
					flexDirection: 'row'
				}}>
				<div
					style={{ height: '100px', border: '1px solid' }}
					className='droppable-element'
					draggable={true}
					unselectable='on'
					onDragStart={(e) => e.dataTransfer.setData('text/plain', '')}>
					Droppable Element (Drag me!)
				</div>
				<WebBuilder
					onLayoutChange={handleLayoutChange}
					layout={layout}
					onDrop={onDrop}
					isDroppable={true}
					Layouts={generateLayout(layoutBlocks)}
				/>
				<WebPreview pageDesign={pageDesign} />
			</div>
		</>
	)
}

export default Builder
