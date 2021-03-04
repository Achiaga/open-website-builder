import { Box } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { BlockModifiers } from './block-modifiers'
import Image from './image'
import List from './list'
import GenericText from './text'
import BlockInception from './inception'

const blocks = {
	image: Image,
	list: List,
	text: GenericText,
	inception: BlockInception
}

function BuilderBlock({ data, blockKey, isEditable, blockType }) {
	const GenericBlock = blocks[blockType]
	const { editBlock = () => {}, text: dataText, ...extraProps } = data

	const [text] = useState(dataText)
	const titleRef = useRef(null)

	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const updatedBlock = { ...data, text: value }
		editBlock(updatedBlock, blockKey)
	}
	return (
		<Box width='100%' h='100%' onClick={(e) => e.stopPropagation()}>
			{isEditable && (
				<BlockModifiers data={data} blockKey={blockKey} blockType={blockType} />
			)}
			<GenericBlock
				isEditable={isEditable}
				onKeyUp={handleKeyDown}
				contentEditable={isEditable}
				ref={titleRef}
				text={text}
				{...extraProps}
			/>
		</Box>
	)
}
BuilderBlock.propTypes = {
	isPreview: PropTypes.bool,
	blockKey: PropTypes.string.isRequired,
	isEditable: PropTypes.bool,
	blockType: PropTypes.string.isRequired,
	data: PropTypes.any
}

const PreviewBlock = ({ data, blockType }) => {
	const GenericBlock = blocks[blockType]
	return <GenericBlock {...data} />
}

PreviewBlock.propTypes = {
	blockType: PropTypes.string.isRequired,
	data: PropTypes.any
}

export const Block = ({ isPreview, data, blockKey, isEditable, blockType }) => {
	if (isPreview) return <PreviewBlock data={data} blockType={blockType} />
	return (
		<BuilderBlock
			data={data}
			blockKey={blockKey}
			isEditable={isEditable}
			blockType={blockType}
		/>
	)
}

Block.propTypes = {
	isPreview: PropTypes.bool,
	blockKey: PropTypes.string.isRequired,
	isEditable: PropTypes.bool,
	blockType: PropTypes.string.isRequired,
	data: PropTypes.any
}
