import { useState } from 'react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { WebBuilder } from '../builder/web-builder'
import { WebPreview } from '../builder/web-preview'
import { Box } from '@chakra-ui/react'
import { BuilderSidebar } from '../builder/sidebar'

function normalizeLayout(userBlocksData) {
	return Object.values(userBlocksData).map((block) => {
		return block.layout
	})
}
function normalizeBlockStructure(userBlocksData) {
	return Object.entries(userBlocksData).reduce((acc, [blockId, value]) => {
		return {
			...acc,
			[blockId]: value.block
		}
	}, {})
}

const Builder = ({ userBlocksData }) => {
	console.log(userBlocksData)
	const [newBlockType, setNewBlockType] = useState(null)

	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(userBlocksData)
	)
	const [layout, setLayout] = useState(() => normalizeLayout(userBlocksData))

	return (
		<Box d='flex' m='auto' flexDir='row'>
			<BuilderSidebar setNewBlockType={setNewBlockType} />
			<WebBuilder
				layout={layout}
				blocksConfig={blocksConfig}
				newBlockType={newBlockType}
				udpateBlocksConfig={udpateBlocksConfig}
				updateLayout={setLayout}
			/>
			<WebPreview layout={layout} blocksConfig={blocksConfig} />
		</Box>
	)
}

export default Builder
