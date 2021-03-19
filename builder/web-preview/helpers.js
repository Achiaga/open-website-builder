import { Box } from '@chakra-ui/react';

import { previewBlocks } from '../blocks';

export const generatePageCode = (layout, blocksConfig, rowHeight) => {
	return layout?.map((layoutItem) => {
		const BlockKey = layoutItem.i;
		return generatePreviewBlock(blocksConfig[BlockKey], layoutItem, rowHeight);
	});
};

export function generatePreviewBlock(blockInfo, blockLayout, rowHeight) {
	if (!blockInfo?.type) return null;
	const { w, h, x, y, i } = blockLayout || {};
	const { boxShadow, borderRadius } = blockInfo.data;
	const GenericBlock = previewBlocks[blockInfo.type];
	return (
		<Box
			key={i}
			gridColumn={`${x + 1} /  span ${w}`}
			gridRow={`${y + 1} / span ${h}`}
			overflow='hidden'
			boxShadow={boxShadow}
			borderRadius={borderRadius}>
			<GenericBlock
				{...blockInfo.data}
				rowHeight={rowHeight}
				parentHeight={h}
				isPreview
			/>
		</Box>
	);
}
