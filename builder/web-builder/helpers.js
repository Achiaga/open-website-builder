import { imageURL } from '../initial-data'

// Block Factory *********************************

const blocksProperties = {
	title: {
		text: 'Change the ext',
		fontSize: '1rem',
		textAlign: 'center',
		fontColor: '#4a40ce',
		bgColor: '#fff'
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
			type: [blockType],
			...loadBlockInitialData(blockType, editBlockCallback)
		}
	}
}

// Block Edition *********************************

export function editBlock(blocks, id, newData) {
	return {
		...blocks,
		[id]: {
			...blocks[id],
			data: newData
		}
	}
}

// Edit block layout properties *********************************

export const editDraggableItemProperty = (layout, editableBlockId) => {
	return layout.map((layoutItem) => {
		const isSelectedItem = layoutItem.i === editableBlockId
		const isDraggable = isSelectedItem ? !layoutItem.isDraggable : true
		return { ...layoutItem, isDraggable }
	})
}

// Add editior function to inital blocks *********************************

export function addCallbackToBlock(blocksConfig, editBlockCallback) {
	return Object.entries(blocksConfig).reduce((acc, [blockId, blockInfo]) => {
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
