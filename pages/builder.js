import { useState } from 'react'
import { generateLayout } from '../builder/helpers'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import WebBuilder from '../builder/web-builder'
import { WebPreview } from '../builder/web-preview'
import { initialLayout, initialLB } from '../builder/initial-data'

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

	return (
		<>
			<div
				style={{
					display: 'flex',
					margin: 'auto',
					flexDirection: 'row'
				}}>
				<BlocksSidebar setNewBlock={setNewBlockType} />
				<WebBuilder
					layout={layout}
					isDroppable={true}
					Blocks={generateLayout(layoutBlocks)}
					newBlockType={newBlockType}
					setLayoutBlocks={setLayoutBlocks}
					setLayout={setLayout}
					layoutBlocks={layoutBlocks}
				/>
				<WebPreview layout={layout} layoutBlocks={layoutBlocks} />
			</div>
		</>
	)
}

export default Builder
