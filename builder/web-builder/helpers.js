import { Box } from '@chakra-ui/react';
import localforage from 'localforage';

import { Block } from '../blocks';
import { DELETE, EDIT } from '../blocks/constants';

import { blocksProperties } from './default-data';

// Block Factory *********************************

const loadBlockInitialData = (blockType, extraProps) => {
	return {
		data: {
			...blocksProperties[blockType],
			...extraProps,
		},
	};
};

export function addBlock(newId, blockType, blocks, editBlockCallback) {
	return {
		...blocks,
		[newId]: {
			type: blockType,
			...loadBlockInitialData(blockType, { editBlock: editBlockCallback }),
		},
	};
}

// Block Edition *********************************

export function deleteBlock(blocks, deletedBlockId) {
	const updatedBlocks = { ...blocks };
	delete updatedBlocks[deletedBlockId];
	return updatedBlocks;
}

export function editBlock(blocks, id, newData, operationType = EDIT) {
	if (operationType === DELETE) return deleteBlock(blocks, id);
	return {
		...blocks,
		[id]: {
			...blocks[id],
			data: newData,
		},
	};
}

// Edit block layout properties *********************************

export const editItemDraggableProperty = (layout, editableBlockId) => {
	return layout.map((layoutItem) => {
		const isSelectedItem = layoutItem.i === editableBlockId;
		let isDraggable = isSelectedItem ? false : true;
		return { ...layoutItem, isDraggable };
	});
};

// Add editior function to inital blocks *********************************

export function addCallbackToBlock(blocksConfig, editBlockCallback) {
	if (!blocksConfig) return;
	return Object.entries(blocksConfig)?.reduce((acc, [blockId, blockInfo]) => {
		return {
			...acc,
			[blockId]: {
				...blockInfo,
				data: {
					...blockInfo.data,
					editBlock: editBlockCallback,
				},
			},
		};
	}, {});
}

// Block Builder

const generateBuilderBlock = (
	blockKey,
	blockInfo,
	setIsEditable,
	layoutItemInfo,
	selectedItemId,
	reRender,
	newBlockType,
	layoutCallback,
	setSelectedItem
) => {
	if (!blockInfo) return null;
	const isEditable = selectedItemId === blockKey;
	return (
		<Box
			outline='2px solid'
			outlineColor={isEditable ? 'blue' : 'transparent'}
			key={blockKey}
			onDoubleClick={(e) => {
				e.stopPropagation();
				setIsEditable(selectedItemId === blockKey ? null : blockKey);
			}}>
			<Block
				data={blockInfo.data}
				blockKey={blockKey}
				isEditable={isEditable}
				blockType={blockInfo.type}
				reRender={reRender}
				selectedItemId={selectedItemId}
				newBlockType={newBlockType}
				layoutCallback={layoutCallback}
				setSelectedItem={setSelectedItem}
			/>
		</Box>
	);
};

export const generateBuilderBlocks = (
	blocksConfig,
	setIsEditable,
	layout,
	selectedItemId,
	reRender,
	newBlockType,
	layoutCallback,
	setSelectedItem
) => {
	if (!blocksConfig) return null;
	return Object.entries(blocksConfig).map(([blockKey, blockInfo]) => {
		const layoutItem = layout.find((layoutItem) => layoutItem.i === blockKey);
		return generateBuilderBlock(
			blockKey,
			blockInfo,
			setIsEditable,
			layoutItem,
			selectedItemId,
			reRender,
			newBlockType,
			layoutCallback,
			setSelectedItem
		);
	});
};

// Builder
export function denormalizeBlockData(layout, blocksConfig) {
	return Object.entries(blocksConfig).reduce((acc, [blockKey, blockConfig]) => {
		return {
			...acc,
			[blockKey]: {
				layout: {
					...layout.find((layoutItem) => layoutItem.i === blockKey),
				},
				block: {
					...removeEventListener(blockConfig),
				},
			},
		};
	}, {});
}

export function denormalizeInceptionBlock(layout, blockConfig) {
	const blocks = {
		...denormalizeBlockData(layout, blockConfig),
	};
	return { blocks };
}

export function saveOnLocal(userBlocksData, setIsSaved) {
	if (!Object.keys(userBlocksData).length) return;
	setIsSaved(false);
	localforage.setItem('userData', JSON.stringify(userBlocksData)).then(() => {
		setIsSaved(true);
	});
}

function removeEventListener(blockConfig) {
	// eslint-disable-next-line no-unused-vars
	const { editBlock, ...rest } = blockConfig.data;
	return {
		...blockConfig,
		data: {
			...rest,
		},
	};
}

export function normalizeLayout(userBlocksData) {
	if (!userBlocksData) return [];
	return Object.values(userBlocksData).map((block) => {
		return block.layout;
	});
}
export function normalizeBlockStructure(userBlocksData) {
	if (!userBlocksData) return {};
	return Object.entries(userBlocksData).reduce((acc, [blockId, value]) => {
		return {
			...acc,
			[blockId]: value.block,
		};
	}, {});
}
