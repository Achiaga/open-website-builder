import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useState } from 'react'
import {
	addBlock,
	editBlock,
	editItemDraggableProperty,
	generateBuilderBlocks
} from '../web-builder/helpers'

const ReactGridLayout = WidthProvider(RGL)

const initialBlockConfig = {
	'inception-1': {
		type: 'text',
		data: {
			text: 'Hola, soy Inception 1'
		}
	},
	'inception-2': {
		type: 'text',
		data: {
			text: 'Hola, soy Inception 2'
		}
	}
}

const initialLayout = [
	{ i: 'inception-1', x: 0, y: 0, w: 10, h: 10 },
	{ i: 'inception-2', x: 10, y: 20, w: 10, h: 10 }
]

const BlockInception = ({ data }) => {
	const [newBlockType, setNewBlockType] = useState('text')
	const [newBlockId, setNewBlockId] = useState(() => uuid())
	const [blocksConfig, udpateBlocksConfig] = useState(initialBlockConfig)
	const [layout, setLayout] = useState(initialLayout)
	const [selectedItemId, setSelectedItem] = useState(null)

	const editBlockCallback = (newData, blockId, operationType) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, newData, operationType)
		)
	}

	function setItemEditable(editableBlockId) {
		setSelectedItem(editableBlockId)
		setLayout((layout) => editItemDraggableProperty(layout, editableBlockId))
	}

	const onLayoutChange = (layout) => {
		if (layout?.length !== Object.keys(blocksConfig)?.length) return
		setLayout(layout)
	}

	function onDrop(layout, droppedBlockLayout) {
		setLayout(layout)
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

	return (
		<ReactGridLayout
			cols={10}
			rowHeight={10}
			margin={[0, 0]}
			style={{ backgroundColor: 'lightblue' }}
			isDroppable
			onDrop={onDrop}
			droppingItem={{ i: newBlockId, w: 5, h: 5 }}
			verticalCompact={false}
			layout={layout}
			onLayoutChange={onLayoutChange}
			className='layout'>
			{generateBuilderBlocks(
				blocksConfig,
				setItemEditable,
				layout,
				selectedItemId
			)}
		</ReactGridLayout>
	)
}

export default BlockInception
