import { Box, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { TextPropTypes } from '..'

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
			<BackgroundColorEditor
				changeBGColor={changeBGColor}
				fontColor={fontColor}
			/>
			<TextAlignEditor
				changeTextAlign={changeTextAlign}
				fontColor={fontColor}
			/>
		</Box>
	)
}

Modifiers.propTypes = {
	data: TextPropTypes,
	blockKey: PropTypes.string
}

export default Modifiers
