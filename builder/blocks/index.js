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

function BuilderBlock({
	data,
	blockKey,
	isEditable,
	blockType,
	reRender,
	selectedItemId,
	newBlockType,
	layoutCallback
}) {
	const GenericBlock = blocks[blockType]
	const { editBlock = () => {}, text: dataText, ...metaData } = data

	const [text] = useState(dataText)
	const titleRef = useRef(null)

	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const updatedBlock = { ...data, text: value }
		editBlock(updatedBlock, blockKey)
	}
	return (
		<Box
			width='100%'
			h='100%'
			onClick={(e) => e.stopPropagation()}
			id={blockKey}>
			{isEditable && (
				<BlockModifiers data={data} blockKey={blockKey} blockType={blockType} />
			)}
			<GenericBlock
				onKeyUp={handleKeyDown}
				contentEditable={isEditable}
				{...(blockType === 'text' ? { ref: titleRef } : {})}
				text={text}
				extraProps={{
					reRender,
					selectedItemId,
					newBlockType,
					layoutCallback,
					blockKey
				}}
				{...metaData}
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

export const Block = ({
	isPreview,
	data,
	blockKey,
	isEditable,
	blockType,
	selectedItemId,
	reRender,
	newBlockType,
	layoutCallback
}) => {
	if (isPreview) return <PreviewBlock data={data} blockType={blockType} />
	return (
		<BuilderBlock
			data={data}
			blockKey={blockKey}
			isEditable={isEditable}
			blockType={blockType}
			reRender={reRender}
			selectedItemId={selectedItemId}
			newBlockType={newBlockType}
			layoutCallback={layoutCallback}
		/>
	)
}

Block.propTypes = {
	isPreview: PropTypes.bool,
	blockKey: PropTypes.string.isRequired,
	isEditable: PropTypes.bool,
	blockType: PropTypes.string.isRequired,
	data: PropTypes.any,
	selectedItemId: PropTypes.string,
	reRender: PropTypes.bool,
	newBlockType: PropTypes.string
}
