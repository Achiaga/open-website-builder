import { useState } from 'react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { WebBuilder } from '../builder/web-builder'
import { WebPreview } from '../builder/web-preview'
import { initialLayout, initialLB } from '../builder/initial-data'
import { Box } from '@chakra-ui/react'
import { BuilderSidebar } from '../builder/sidebar'

const Builder = () => {
	const [blocksConfig, udpateBlocksConfig] = useState(initialLB)
	const [newBlockType, setNewBlockType] = useState(null)
	const [layout, setLayout] = useState(initialLayout)
	return (
		<Box d='flex' m='auto' flexDir='row'>
			{/* <BuilderSidebar setNewBlockType={setNewBlockType} /> */}
			<WebBuilder
				layout={layout}
				isDroppable={true}
				newBlockType={newBlockType}
				udpateBlocksConfig={udpateBlocksConfig}
				updateLayout={setLayout}
				blocksConfig={blocksConfig}
			/>
			<WebPreview layout={layout} blocksConfig={blocksConfig} />
		</Box>
	)
}

export default Builder
