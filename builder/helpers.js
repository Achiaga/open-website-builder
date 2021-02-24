import { Box } from '@chakra-ui/react'
import blocks from './blocks'

export const generateBuilderBlock = (
	blockKey,
	blockInfo,
	setIsEditable,
	layoutItemInfo
) => {
	if (!blockInfo) return null
	const Block = blocks[blockInfo.type]
	const isDraggable = layoutItemInfo.isDraggable || false
	return (
		<Box
			border='1px solid'
			borderColor={isDraggable ? 'transparent' : 'blue'}
			key={blockKey}
			onDoubleClick={() => setIsEditable(blockKey)}>
			<Block
				data={blockInfo.data}
				blockKey={blockKey}
				isEditable={!isDraggable}
			/>
		</Box>
	)
}

export const generatePreviewBlock = (blockInfo, layoutItemInfo) => {
	if (!blockInfo?.type) return null
	const { w, h, x, y, i } = layoutItemInfo || {}
	const Block = blocks[blockInfo.type]

	return (
		<div
			key={i}
			style={{
				gridColumn: `${x + 1} /  ${x + 1 + w}`,
				gridRow: `${y + 1} /  ${y + 1 + h}`
			}}>
			<Block data={blockInfo.data} isPreview />
		</div>
	)
}

export const generateBuilderBlocks = (blocksConfig, setIsEditable, layout) => {
	return Object.entries(blocksConfig).map(([blockKey, blockInfo]) => {
		const layoutItem = layout.find((layoutItem) => layoutItem.i === blockKey)
		return generateBuilderBlock(blockKey, blockInfo, setIsEditable, layoutItem)
	})
}

export const generatePageCode = (layout, layoutBlocks) => {
	return layout.map((layoutItem) => {
		const BlockKey = layoutItem.i
		return generatePreviewBlock(layoutBlocks[BlockKey], layoutItem)
	})
}
