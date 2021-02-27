import { Box, Button, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { TextPropTypes } from '..'
import { DELETE } from '../../constants'

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
const TextAlignEditor = ({ changeTextAlign, textAlign }) => {
	const handleChange = (e) => {
		const { value } = e.target
		changeTextAlign(value)
	}
	return (
		<Box>
			<Select
				placeholder='Select option'
				value={textAlign}
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
			<label>Font Color</label>
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
const DeleteBlock = ({ deleteBlock }) => {
	return (
		<Box>
			<Button onClick={deleteBlock} bg='blackAlpha.400'>
				Delete this block
			</Button>
		</Box>
	)
}

const Modifiers = ({ data, blockKey }) => {
	const { editBlock = () => {}, fontSize, textAlign, fontColor, bgColor } = data
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
	function deleteBlock() {
		editBlock({}, blockKey, DELETE)
	}
	return (
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
			<BackgroundColorEditor changeBGColor={changeBGColor} bgColor={bgColor} />
			<TextAlignEditor
				changeTextAlign={changeTextAlign}
				textAlign={textAlign}
			/>
			<DeleteBlock deleteBlock={deleteBlock} />
		</Box>
	)
}

Modifiers.propTypes = {
	data: TextPropTypes,
	blockKey: PropTypes.string
}

export default Modifiers
