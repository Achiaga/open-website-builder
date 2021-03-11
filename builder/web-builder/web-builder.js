import React, { useCallback, useEffect, useState } from 'react'
import RGL, { WidthProvider } from 'react-grid-layout'
import { v4 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'
import { Box } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {
	denormalizeBlockData,
	generateBuilderBlocks,
	normalizeBlockStructure,
	normalizeLayout,
	saveOnLocal,
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
	const [realBlockDatta, setRealBlockData] = useState(userBlocksData)
	const [blocksConfig, udpateBlocksConfig] = useState(() =>
		normalizeBlockStructure(realBlockDatta)
	)
	const [layout, updateLayout] = useState(() => normalizeLayout(realBlockDatta))

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
		window.addEventListener('keydown', handleKeyPress)
		setRowHeight(10)
		setRowHeight(window?.innerWidth / GRID_COLUMNS)
		return () => {
			window.removeEventListener('keydown', handleKeyPress)
			window.removeEventListener('resize', handleWindowResize)
		}
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

	function handleKeyPress(e) {
		if (e.key === 'Escape') {
			setBlockEditable(null)
		}
	}

	function layoutCallback(newBlocks, parentBlockKey) {
		const newBlocksConfig = {
			...blocksConfig,
			[parentBlockKey]: {
				...blocksConfig[parentBlockKey],
				data: {
					...blocksConfig[parentBlockKey]?.data,
					...newBlocks
				}
			}
		}
		saveOnLocal(
			denormalizeBlockData(layout, { ...newBlocksConfig }),
			setIsSaved
		)
	}

	const isDroppable = !selectedItemId?.includes('inception')
	return (
		<Box
			d='flex'
			w='100%'
			flexDir='row'
			onClick={() => setBlockEditable(null)}
			id='main-builder'>
			<ReactGridLayout
				cols={GRID_COLUMNS}
				rowHeight={rowHeight}
				onDrop={onDrop}
				margin={[0, 0]}
				autoSize
				preventCollision={false}
				isDroppable={isDroppable}
				onResizeStop={handleResize}
				verticalCompact={false}
				// This makes everything go 6x slower
				// This also makes the drop block go crazy while dragging
				useCSSTransforms={isDroppable}
				droppingItem={{ i: `${newBlockType}-${newBlockId}`, w: 30, h: 35 }}
				style={{ width: '100%', minHeight: '100vh', height: '100%' }}
				className={'layout'}
				layout={layout}
				onLayoutChange={onLayoutChange}>
				{generateBuilderBlocks(
					blocksConfig,
					setBlockEditable,
					layout,
					selectedItemId,
					reRender,
					newBlockType,
					layoutCallback,
					setSelectedItem
				)}
			</ReactGridLayout>
		</Box>
	)
}

WebBuilder.propTypes = {
	userBlocksData: PropTypes.any,
	newBlockType: PropTypes.any,
	setIsSaved: PropTypes.any
}

export default WebBuilder
