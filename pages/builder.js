import { useState } from 'react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { WebBuilder } from '../builder/web-builder'
import { WebPreview } from '../builder/web-preview'
import { initialLayout, initialLB } from '../builder/initial-data'
import { Box } from '@chakra-ui/react'

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
	const [blocksConfig, udpateBlocksConfig] = useState(initialLB)
	const [newBlockType, setNewBlockType] = useState(null)
	const [layout, setLayout] = useState(initialLayout)

	return (
		<Box d='flex' m='auto' flexDir='row'>
			<BlocksSidebar setNewBlock={setNewBlockType} />
			<WebBuilder
				layout={layout}
				isDroppable={true}
				newBlockType={newBlockType}
				setLayoutBlocks={udpateBlocksConfig}
				updateLayout={setLayout}
				blocksConfig={blocksConfig}
			/>
			<WebPreview layout={layout} blocksConfig={blocksConfig} />
		</Box>
	)
}

export default Builder
