import blocks from './blocks'

export const generateLayoutBlock = (blockKey, blockInfo) => {
	if (!blockInfo) return null
	const Block = blocks[blockInfo.type]
	return (
		<div key={blockKey} style={{ background: 'lightgray' }}>
			<Block data={blockInfo.data} blockKey={blockKey} />
		</div>
	)
}

export const generateBlock = (blockKey, blockInfo, layoutItemInfo) => {
	if (!blockInfo?.type) return null
	const { w, h, x, y } = layoutItemInfo || {}
	const Block = blocks[blockInfo.type]
	return (
		<div
			key={blockKey}
			style={{
				gridColumn: `${x + 1} /  ${x + 1 + w}`,
				gridRow: `${y + 1} /  ${y + 1 + h}`
			}}>
			<Block data={blockInfo.data} />
		</div>
	)
}

export const generateLayout = (layoutBlocks) => {
	return Object.entries(layoutBlocks).map(([blockKey, blockInfo]) => {
		return generateLayoutBlock(blockKey, blockInfo)
	})
}

export const generatePageCode = (layout, layoutBlocks) => {
	const page = layout.map((layoutItem) => {
		const BlockKey = layoutItem.i
		return generateBlock(BlockKey, layoutBlocks[BlockKey], layoutItem)
	})
	return page
}
