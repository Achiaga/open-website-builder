import { useRef, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'

const GenericTitle = forwardRef((props, ref) => {
	return (
		<Text
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			fontSize={props?.fontSize}
			textAlign={props?.textAlign}
			color={props?.color}
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			ref={ref}>
			{props?.text}
		</Text>
	)
})
GenericTitle.displayName = 'Hello'

function BuilderTitle({ data, blockKey, isEditable }) {
	const { editBlock, fontSize, textAlign, color } = data
	const [text] = useState(data?.text)
	const titleRef = useRef(null)
	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const updatedBlock = { ...data, text: value }
		editBlock(updatedBlock, blockKey)
	}
	function changeFontSize() {
		const updatedBlock = { ...data, fontSize: '30px' }
		editBlock(updatedBlock, blockKey)
	}
	function changeAligment() {
		const updatedBlock = { ...data, textAlign: 'left' }
		editBlock(updatedBlock, blockKey)
	}
	function changeColor() {
		const updatedBlock = { ...data, color: 'red' }
		editBlock(updatedBlock, blockKey)
	}

	return (
		<div>
			{isEditable && (
				<Box
					pos='absolute'
					top='-20px'
					backgroundColor='black'
					color='white'
					transform='translate(0px, -100%)'>
					<Box as='button' onClick={changeFontSize}>
						Up font
					</Box>
					<Box as='button' onClick={changeAligment}>
						textAlign
					</Box>
					<Box as='button' onClick={changeColor}>
						change Color
					</Box>
				</Box>
			)}
			<GenericTitle
				isEditable={isEditable}
				onKeyUp={handleKeyDown}
				contentEditable={isEditable}
				ref={titleRef}
				text={text}
				fontSize={fontSize}
				textAlign={textAlign}
				color={color}
			/>
		</div>
	)
}
const PreviewTitle = ({ data }) => {
	return <GenericTitle text={data?.text} {...data} />
}

const SelectTitleBlock = ({ isPreview, data, blockKey, isEditable }) => {
	if (isPreview) return <PreviewTitle data={data} />
	return (
		<BuilderTitle data={data} blockKey={blockKey} isEditable={isEditable} />
	)
}

const DataPropTypes = PropTypes.shape({
	text: PropTypes.string,
	editBlock: PropTypes.func,
	fontSize: PropTypes.string,
	textAlign: PropTypes.string,
	color: PropTypes.string
})

SelectTitleBlock.propTypes = {
	isPreview: PropTypes.bool,
	isEditable: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}
BuilderTitle.propTypes = {
	isPreview: PropTypes.bool,
	isEditable: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}

PreviewTitle.propTypes = {
	data: DataPropTypes
}

GenericTitle.propTypes = { ...DataPropTypes }

export default SelectTitleBlock
