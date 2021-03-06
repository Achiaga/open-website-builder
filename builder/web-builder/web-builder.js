import React, { useCallback, useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Box } from '@chakra-ui/react'
import {
	denormalizeBlockData,
	generateBuilderBlocks,
	normalizeBlockStructure,
	normalizeLayout,
	saveOnLocal
} from './helpers'
import {
	addBlock,
	addCallbackToBlock,
	editBlock,
	editItemDraggableProperty
} from './helpers'
import { GRID_COLUMNS, ROW_HEIGHT } from './constants'

const ReactGridLayout = WidthProvider(RGL)
const SAVE_TIME = 5000

const WebBuilder = ({ userBlocksData, newBlockType, setIsSaved }) => {
	const [newBlockId, setNewBlockId] = useState(() => uuid())
	const [reRender, setReRender] = useState(false)
	const [rowHeight, setRowHeight] = useState(ROW_HEIGHT)
	const [selectedItemId, setSelectedItem] = useState(null)
	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(userBlocksData)
	)
	const [layout, updateLayout] = useState(() => normalizeLayout(userBlocksData))

	const debouncedSaved = useCallback(
		debounce((layout, blocksConfig) => {
			saveOnLocal(denormalizeBlockData(layout, { ...blocksConfig }), setIsSaved)
		}, SAVE_TIME),
		[]
	)

	useEffect(() => {
		debouncedSaved(layout, blocksConfig)
	}, [layout, blocksConfig])

	useEffect(() => {
		udpateBlocksConfig((blocksConfig) =>
			addCallbackToBlock(blocksConfig, editBlockCallback)
		)
		window.addEventListener('resize', handleWindowResize)
		setRowHeight(window?.innerWidth / GRID_COLUMNS)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	function setBlockEditable(editableBlockId) {
		setSelectedItem(editableBlockId)
		updateLayout((layout) => editItemDraggableProperty(layout, editableBlockId))
	}
	const editBlockCallback = (newData, blockId, operationType) => {
		udpateBlocksConfig((blocksConfig) =>
			editBlock(blocksConfig, blockId, newData, operationType)
		)
	}

	function onDrop(layout, droppedBlockLayout) {
		updateLayout(layout)
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

	const onLayoutChange = (layout) => {
		if (layout?.length !== Object.keys(blocksConfig)?.length) return
		updateLayout(layout)
	}

	function handleWindowResize() {
		setRowHeight(window?.innerWidth / GRID_COLUMNS)
	}

	function handleResize(_, oldItem, newItem) {
		if (newItem.i.includes('inception') && newItem.w !== oldItem.w) {
			setReRender((value) => !value)
		}
	}

	const isDroppable = selectedItemId?.includes('inception') ? false : true
	return (
		<Box d='flex' w='100%' flexDir='row' onClick={() => setBlockEditable(null)}>
			<ReactGridLayout
				id='inception'
				cols={GRID_COLUMNS}
				rowHeight={rowHeight}
				onDrop={onDrop}
				margin={[0, 0]}
				autoSize
				preventCollision={!isDroppable}
				isDroppable={isDroppable}
				onResizeStop={handleResize}
				compactType='null'
				droppingItem={{ i: newBlockId, w: 50, h: 50 }}
				style={{ width: '100%', minHeight: '100vh' }}
				className='layout'
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{generateBuilderBlocks(
					blocksConfig,
					setBlockEditable,
					layout,
					selectedItemId,
					reRender
				)}
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
