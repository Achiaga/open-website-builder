import { Box, Button, Input, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { Portal } from '../usePortal'

import { DELETE, EDIT } from './constants'

// Text **********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const fontSize = {
	type: 'dropdown',
	placeholder: 'Select a FontSize',
	property: 'fontSize',
	options: [
		{ value: '2rem', title: 'Title' },
		{ value: '1.75rem', title: 'Subtitle 1' },
		{ value: '1.5rem', title: 'Subtitle 2' },
		{ value: '1rem', title: 'Text' }
	]
}
const textAlign = {
	type: 'dropdown',
	placeholder: 'Align text',
	property: 'textAlign',
	options: [
		{ value: 'center', title: 'center' },
		{ value: 'left', title: 'left' },
		{ value: 'right', title: 'right' }
	]
}
const alignItems = {
	type: 'dropdown',
	placeholder: 'Vertical Align',
	property: 'alignItems',
	options: [
		{ value: 'start', title: 'top' },
		{ value: 'center', title: 'center' },
		{ value: 'end', title: 'bottom' }
	]
}
const fontWeight = {
	type: 'dropdown',
	placeholder: 'Font Bold',
	property: 'fontWeight',
	options: [
		{ value: '400', title: 'normal' },
		{ value: '700', title: 'bold' },
		{ value: '900', title: 'super bold' }
	]
}
const fontColor = {
	type: 'color',
	placeholder: 'font color',
	property: 'fontColor'
}

// Block *********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const borderRadius = {
	type: 'dropdown',
	placeholder: 'Border Radius',
	property: 'borderRadius',
	options: [
		{ value: '10px', title: 'small' },
		{ value: '20px', title: 'medium' },
		{ value: '100px', title: 'large' },
		{ value: '100%', title: 'circle' }
	]
}
const boxShadow = {
	type: 'dropdown',
	placeholder: 'Shadow',
	property: 'boxShadow',
	options: [
		{
			value:
				'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
			title: 'small'
		},
		{
			value:
				'0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)',
			title: 'medium'
		},
		{
			value: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
			title: 'large'
		},
		{
			value:
				'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
			title: 'inside'
		}
	]
}

// Common ********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const backgroundColor = {
	type: 'color',
	placeholder: 'Background color',
	property: 'backgroundColor'
}

const deleteBlock = {
	type: 'button',
	placeholder: 'Delete block',
	property: '',
	operationType: DELETE
}
const imageInput = {
	type: 'text',
	placeholder: 'Enter image url',
	property: 'imageUrl'
}

const Properties = {
	text: [
		deleteBlock,
		fontSize,
		textAlign,
		backgroundColor,
		fontColor,
		alignItems,
		fontWeight,
		boxShadow,
		borderRadius
	],
	image: [deleteBlock, boxShadow, borderRadius, imageInput],
	inception: [deleteBlock, boxShadow, borderRadius, backgroundColor]
}

const PropertiesModifiers = {
	dropdown: DropDownSelector,
	color: ColorSelector,
	button: ButtonSelector,
	text: TextInput
}

function DropDownSelector({
	handleEdit,
	property,
	value,
	options,
	placeholder
}) {
	const handleChange = (e) => {
		const { value } = e.target
		handleEdit(property, value)
	}
	return (
		<Box>
			<Select placeholder={placeholder} value={value} onChange={handleChange}>
				{options?.map(({ value, title }, index) => {
					return (
						<option key={index} value={value}>
							{title}
						</option>
					)
				})}
			</Select>
		</Box>
	)
}

DropDownSelector.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	placeholder: PropTypes.string.isRequired
}

function RGBAToHexA({ r, g, b, a }) {
	r = r.toString(16)
	g = g.toString(16)
	b = b.toString(16)
	a = Math.round(a * 255).toString(16)

	if (r.length == 1) r = '0' + r
	if (g.length == 1) g = '0' + g
	if (b.length == 1) b = '0' + b
	if (a.length == 1) a = '0' + a

	return '#' + r + g + b + a
}

function ColorSelector({ handleEdit, property, value, placeholder }) {
	const [isOpen, setIsOpen] = useState(false)
	const handleChange = ({ rgb }) => {
		handleEdit(property, RGBAToHexA(rgb))
	}
	return (
		<Box>
			<label onClick={() => setIsOpen(true)}>{placeholder}</label>
			{isOpen && (
				<Box pos='absolute' zIndex='9999'>
					<button onClick={() => setIsOpen(false)}>Close</button>
					<ChromePicker color={value} onChange={handleChange} />
				</Box>
			)}
		</Box>
	)
}
ColorSelector.propTypes = {
	handleEdit: PropTypes.func,
	property: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string
}
function TextInput({ handleEdit, property, value, placeholder }) {
	const handleChange = (e) => {
		handleEdit(property, e.target.value)
	}
	return (
		<Box onDoubleClick={(e) => e.stopPropagation()}>
			<Input
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				color='white'
			/>
		</Box>
	)
}
TextInput.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
}

function ButtonSelector({ handleEdit, property, operationType, placeholder }) {
	const handleClick = () => {
		handleEdit(property, null, operationType)
	}
	return (
		<Box>
			<Button onClick={handleClick} bg='blackAlpha.400'>
				{placeholder}
			</Button>
		</Box>
	)
}
ButtonSelector.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	operationType: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired
}

export const Modifier = ({ handleEdit, propertiesValues, properties }) => {
	return (
		properties?.map((propertyData, index) => {
			const type = propertyData.type
			const property = propertyData.property
			const Modifier = PropertiesModifiers[type]
			return (
				<Modifier
					handleEdit={handleEdit}
					{...propertyData}
					key={index}
					value={propertiesValues[property]}
				/>
			)
		}) ?? null
	)
}

function getOffsetTop(elem) {
	var offsetTop = 0
	var offsetLeft = 0
	do {
		if (!isNaN(elem.offsetTop)) {
			offsetTop += elem.offsetTop
			offsetLeft += elem.offsetLeft
		}
		// eslint-disable-next-line no-cond-assign
	} while ((elem = elem.offsetParent))
	return { left: +offsetLeft, top: +offsetTop }
}

function getTranslateValues(element) {
	if (!element?.offsetParent)
		return {
			left: 0,
			top: 0
		}
	const style = window.getComputedStyle(element?.offsetParent)
	const matrix =
		style['transform'] || style.webkitTransform || style.mozTransform
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ') ?? null
	if (!matrixValues)
		return {
			left: 0,
			top: 0
		}
	return {
		left: +matrixValues[4],
		top: +matrixValues[5]
	}
}

function getOffsets(blockKey) {
	const mainParentStyles = document.getElementById(blockKey).offsetParent
		.offsetParent
	if (blockKey.includes('child-inception')) {
		const v1 = getTranslateValues(mainParentStyles)
		const v2 = getTranslateValues(document.getElementById(blockKey))
		console.log(v1, v2)
		return { top: v1.top + v2.top, left: v1.left + v2.left }
	}
	if (blockKey.includes('inception')) {
		return getOffsetTop(document.getElementById(blockKey))
	}
	return getTranslateValues(document.getElementById(blockKey))
}

export const BlockModifiers = ({ data, blockKey, blockType }) => {
	const { editBlock = () => {} } = data

	function handleEdit(id, value, operationType = EDIT) {
		editBlock({ ...data, [id]: value }, blockKey, operationType)
	}
	console.log(blockKey, getOffsets(blockKey))
	const dim = getOffsets(blockKey)
	// const dim = getOffsetTop(document.getElementById(blockKey))
	return (
		<Portal id='main-builder'>
			<Box
				left={dim.left}
				top={dim.top}
				pos='absolute'
				onClick={(e) => e.stopPropagation()}
				backgroundColor='black'
				color='white'>
				<Modifier
					handleEdit={handleEdit}
					propertiesValues={data}
					properties={Properties[blockType]}
				/>
			</Box>
		</Portal>
	)
}

BlockModifiers.propTypes = {
	data: PropTypes.any,
	blockKey: PropTypes.string.isRequired,
	blockType: PropTypes.string.isRequired
}
