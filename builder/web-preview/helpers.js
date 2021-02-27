import blocks from '../blocks'

export const generatePageCode = (layout, blocksConfig) => {
	return layout?.map((layoutItem) => {
		const BlockKey = layoutItem.i
		return generatePreviewBlock(blocksConfig[BlockKey], layoutItem)
	})
}

function generatePreviewBlock(blockInfo, blockLayout) {
	if (!blockInfo?.type) return null
	const { w, h, x, y, i } = blockLayout || {}
	const PreviewBlock = blocks[blockInfo.type]

	return (
		<div
			key={i}
			style={{
				gridColumn: `${x + 1} /  ${x + 1 + w}`,
				gridRow: `${y + 1} /  ${y + 1 + h}`
			}}>
			<PreviewBlock data={blockInfo.data} isPreview />
		</div>
	)
}
