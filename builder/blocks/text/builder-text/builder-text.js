import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'
import { GenericText } from '../text'
import Modifiers from './modifiers'
import { TextPropTypes } from '..'

function BuilderText({ data, blockKey, isEditable }) {
	const { editBlock = () => {}, fontSize, textAlign, fontColor, bgColor } = data

	const [text] = useState(data?.text)
	const titleRef = useRef(null)

	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const updatedBlock = { ...data, text: value }
		editBlock(updatedBlock, blockKey)
	}

	return (
		<Box width='100%' h='100%' onClick={(e) => e.stopPropagation()}>
			{isEditable && <Modifiers data={data} blockKey={blockKey} />}
			<GenericText
				isEditable={isEditable}
				onKeyUp={handleKeyDown}
				contentEditable={isEditable}
				ref={titleRef}
				text={text}
				fontSize={fontSize}
				textAlign={textAlign}
				fontColor={fontColor}
				bgColor={bgColor}
			/>
		</Box>
	)
}

BuilderText.propTypes = {
	isPreview: PropTypes.bool,
	isEditable: PropTypes.bool,
	data: TextPropTypes,
	blockKey: PropTypes.string
}

export default BuilderText
