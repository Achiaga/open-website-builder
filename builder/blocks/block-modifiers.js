import { Box, Button, Select } from '@chakra-ui/react'
import PropTypes from 'prop-types'

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
	property: 'color'
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

const PropertiesModifiers = {
	dropdown: DropDownSelector,
	color: ColorSelector,
	button: ButtonSelector
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
	value: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	placeholder: PropTypes.string.isRequired
}

function ColorSelector({ handleEdit, property, value, placeholder }) {
	const handleChange = (e) => {
		const { value } = e.target
		handleEdit(property, value)
	}
	return (
		<Box>
			<label>{placeholder}</label>
			<input type='color' onChange={handleChange} value={value} />
		</Box>
	)
}
ColorSelector.propTypes = {
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
	image: [deleteBlock, boxShadow, borderRadius]
}

export const Modifier = ({ handleEdit, propertiesValues, properties }) => {
	console.log({ properties })
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

export const BlockModifiers = ({ data, blockKey, blockType }) => {
	const { editBlock = () => {} } = data

	function handleEdit(id, value, operationType = EDIT) {
		editBlock({ ...data, [id]: value }, blockKey, operationType)
	}
	return (
		<Box
			onClick={(e) => e.stopPropagation()}
			pos='absolute'
			top='-20px'
			backgroundColor='black'
			color='white'
			transform='translate(0px, -100%)'>
			<Modifier
				handleEdit={handleEdit}
				propertiesValues={data}
				properties={Properties[blockType]}
			/>
		</Box>
	)
}

BlockModifiers.propTypes = {
	data: PropTypes.any,
	blockKey: PropTypes.string.isRequired,
	blockType: PropTypes.string.isRequired
}
