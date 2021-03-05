import { Box } from '@chakra-ui/react'

import { Block } from '../blocks'
import { DELETE, EDIT } from '../blocks/constants'

import { imageURL } from '../initial-data'

// Block Factory *********************************

const blocksProperties = {
	text: {
		text: 'Change the ext',
		fontSize: '1rem',
		textAlign: 'center',
		fontColor: '#4a40ce',
		backgroundColor: '#ffffff'
	},
	image: {
		imageUrl: imageURL
	}
}
const loadBlockInitialData = (blockType, extraProps) => {
	return {
		data: {
			...blocksProperties[blockType],
			...extraProps
		}
	}
}

export function addBlock(newId, blockType, blocks, editBlockCallback) {
	return {
		...blocks,
		[newId]: {
			type: blockType,
			...loadBlockInitialData(blockType, { editBlock: editBlockCallback })
		}
	}
}

// Block Edition *********************************

export function deleteBlock(blocks, deletedBlockId) {
	const updatedBlocks = { ...blocks }
	delete updatedBlocks[deletedBlockId]
	return updatedBlocks
}

export function editBlock(blocks, id, newData, operationType = EDIT) {
	if (operationType === DELETE) return deleteBlock(blocks, id)
	return {
		...blocks,
		[id]: {
			...blocks[id],
			data: newData
		}
	}
}

// Edit block layout properties *********************************

export const editItemDraggableProperty = (layout, editableBlockId) => {
	return layout.map((layoutItem) => {
		const isSelectedItem = layoutItem.i === editableBlockId
		let isDraggable = isSelectedItem ? !layoutItem.isDraggable : true
		return { ...layoutItem, isDraggable }
	})
}

// Add editior function to inital blocks *********************************

export function addCallbackToBlock(blocksConfig, editBlockCallback) {
	if (!blocksConfig) return
	return Object.entries(blocksConfig)?.reduce((acc, [blockId, blockInfo]) => {
		return {
			...acc,
			[blockId]: {
				...blockInfo,
				data: {
					...blockInfo.data,
					editBlock: editBlockCallback
				}
			}
		}
	}, {})
}

// Block Builder

const generateBuilderBlock = (
	blockKey,
	blockInfo,
	setIsEditable,
	layoutItemInfo,
	selectedItemId
) => {
	if (!blockInfo) return null
	const isEditable = selectedItemId === blockKey
	return (
		<Box
			outline='solid'
			outlineWidth='1px'
			outlineColor={isEditable ? 'blue' : 'transparent'}
			key={blockKey}
			onDoubleClick={(e) => {
				e.stopPropagation()
				setIsEditable(selectedItemId === blockKey ? null : blockKey)
			}}>
			<Block
				data={blockInfo.data}
				blockKey={blockKey}
				isEditable={isEditable}
				blockType={blockInfo.type}
			/>
		</Box>
	)
}

export const generateBuilderBlocks = (
	blocksConfig,
	setIsEditable,
	layout,
	selectedItemId
) => {
	if (!blocksConfig) return null
	return Object.entries(blocksConfig).map(([blockKey, blockInfo]) => {
		const layoutItem = layout.find((layoutItem) => layoutItem.i === blockKey)
		return generateBuilderBlock(
			blockKey,
			blockInfo,
			setIsEditable,
			layoutItem,
			selectedItemId
		)
	})
}
