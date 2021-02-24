import { useRef, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Select, Text } from '@chakra-ui/react'
import { AiOutlineFontSize } from 'react-icons/ai'

const GenericTitle = forwardRef((props, ref) => {
	return (
		<Text
			w='100%'
			h='100%'
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			fontSize={props?.fontSize}
			textAlign={props?.textAlign}
			color={props?.fontColor}
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			bg={props?.bgColor}
			ref={ref}>
			{props?.text}
		</Text>
	)
})
GenericTitle.displayName = 'Hello'

const FontSizeEditor = ({ changeFontSize, fontSize }) => {
	const handleChange = (e) => {
		const { value } = e.target
		changeFontSize(value)
	}
	return (
		<Box>
			<Select
				placeholder='Select option'
				value={fontSize}
				onChange={handleChange}>
				<option value='2rem'>Title</option>
				<option value='1.75rem'>Subtitle 1</option>
				<option value='1.5rem'>Subtitle 2</option>
				<option value='1rem'>texto</option>
			</Select>
		</Box>
	)
}
const TextAlignEditor = ({ changeTextAlign, fontSize }) => {
	const handleChange = (e) => {
		const { value } = e.target
		changeTextAlign(value)
	}
	return (
		<Box>
			<Select
				placeholder='Select option'
				value={fontSize}
				onChange={handleChange}>
				<option value='center'>center</option>
				<option value='left'>left</option>
				<option value='right'>right</option>
			</Select>
		</Box>
	)
}
const FontColorEditor = ({ changeFontColor, fontColor }) => {
	const handleChange = (e) => {
		const { value } = e.target
		changeFontColor(value)
	}
	return (
		<Box>
			<lable>Font Color</lable>
			<input type='color' onChange={handleChange} value={fontColor} />
		</Box>
	)
}
const BackgroundColorEditor = ({ changeBGColor, bgColor }) => {
	const handleChange = (e) => {
		const { value } = e.target
		changeBGColor(value)
	}
	return (
		<Box>
			<label>Background Color</label>
			<input type='color' onChange={handleChange} value={bgColor} />
		</Box>
	)
}

function BuilderTitle({ data, blockKey, isEditable }) {
	const { editBlock, fontSize, textAlign, fontColor, bgColor } = data
	const [text] = useState(data?.text)
	const titleRef = useRef(null)
	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const updatedBlock = { ...data, text: value }
		editBlock(updatedBlock, blockKey)
	}
	function changeFontSize(fontSize) {
		editBlock({ ...data, fontSize }, blockKey)
	}
	function changeTextAlign(textAlign) {
		editBlock({ ...data, textAlign }, blockKey)
	}
	function changeFontColor(fontColor) {
		editBlock({ ...data, fontColor }, blockKey)
	}
	function changeBGColor(bgColor) {
		editBlock({ ...data, bgColor }, blockKey)
	}

	return (
		<Box width='100%' h='100%' onClick={(e) => e.stopPropagation()}>
			{isEditable && (
				<Box
					onClick={(e) => e.stopPropagation()}
					pos='absolute'
					top='-20px'
					backgroundColor='black'
					color='white'
					transform='translate(0px, -100%)'>
					<FontSizeEditor changeFontSize={changeFontSize} fontSize={fontSize} />
					<FontColorEditor
						changeFontColor={changeFontColor}
						fontColor={fontColor}
					/>
					<BackgroundColorEditor
						changeBGColor={changeBGColor}
						fontColor={fontColor}
					/>
					<TextAlignEditor
						changeTextAlign={changeTextAlign}
						fontColor={fontColor}
					/>
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
				fontColor={fontColor}
				bgColor={bgColor}
			/>
		</Box>
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
	fontColor: PropTypes.string,
	bgColor: PropTypes.string
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
