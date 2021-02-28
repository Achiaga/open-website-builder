import { Box } from '@chakra-ui/react'
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
	const { boxShadow, borderRadius } = blockInfo.data
	return (
		<Box
			key={i}
			gridColumn={`${x + 1} /  ${x + 1 + w}`}
			gridRow={`${y + 1} /  ${y + 1 + h}`}
			overflow='hidden'
			boxShadow={boxShadow}
			borderRadius={borderRadius}>
			<PreviewBlock data={blockInfo.data} isPreview />
		</Box>
	)
}
