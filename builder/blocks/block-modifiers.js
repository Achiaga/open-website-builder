import { Box, Button, Input } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
// import { ChromePicker } from 'react-color';
import { Portal } from '../usePortal'

import { BiFontSize } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi'
import {
	AiOutlineVerticalAlignBottom,
	AiOutlineVerticalAlignMiddle,
	AiOutlineVerticalAlignTop
} from 'react-icons/ai'

import { DELETE, EDIT } from './constants'

// Text **********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const fontSize = {
	type: 'dropdown',
	icon: <BiFontSize size='1.5rem' />,
	property: 'fontSize',
	options: [
		{ value: '4rem', title: '4xl' },
		{ value: '3rem', title: '3xl' },
		{ value: '2rem', title: '2xl' },
		{ value: '1.75rem', title: 'xl' },
		{ value: '1.5rem', title: 'lg' },
		{ value: '1.25rem', title: 'md' },
		{ value: '1rem', title: 'sm' },
		{ value: '0.75rem', title: 'xs' }
	]
}
const textAlign = {
	type: 'dropdown',
	property: 'textAlign',
	options: [
		{ value: 'left', title: <FiAlignLeft /> },
		{ value: 'center', title: <FiAlignCenter /> },
		{ value: 'right', title: <FiAlignRight /> }
	]
}
const alignItems = {
	type: 'dropdown',
	property: 'alignItems',
	options: [
		{ value: 'start', title: <AiOutlineVerticalAlignTop /> },
		{ value: 'center', title: <AiOutlineVerticalAlignMiddle /> },
		{ value: 'end', title: <AiOutlineVerticalAlignBottom /> }
	]
}
const fontWeight = {
	type: 'dropdown',
	property: 'fontWeight',
	options: [
		{ value: '300', title: 'thin' },
		{ value: '400', title: 'normal' },
		{ value: '500', title: 'semibold' },
		{ value: '700', title: 'bold' },
		{ value: '900', title: 'super bold' }
	]
}
const color = {
	type: 'dropdown',
	property: 'fontColor',
	options: [
		{ value: 'yellow', title: 'yellow' },
		{ value: 'black', title: 'black' },
		{ value: 'red', title: 'red' },
		{ value: 'brown', title: 'brown' },
		{ value: '#4a40ce', title: 'blue' }
	]
}

// Block *********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const borderRadius = {
	type: 'dropdown',
	property: 'borderRadius',
	options: [
		{ value: '0px', title: 'none' },
		{ value: '10px', title: 'sm' },
		{ value: '20px', title: 'md' },
		{ value: '100px', title: 'lg' },
		{ value: '100%', title: 'circle' }
	]
}
const boxShadow = {
	type: 'dropdown',
	property: 'boxShadow',
	options: [
		{
			value: 'none',
			title: 'none'
		},
		{
			value:
				'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
			title: 'sm'
		},
		{
			value:
				'0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)',
			title: 'md'
		},
		{
			value: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
			title: 'lg'
		},
		{
			value:
				'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;',
			title: 'in'
		}
	]
}

// Common ********************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************
// ***************************************************************

const backgroundColor = {
	type: 'dropdown',
	property: 'backgroundColor',
	options: [
		{ value: 'trasnparent', title: 'none' },
		{ value: '#ffffff', title: 'white' },
		{ value: 'yellow', title: 'yellow' },
		{ value: 'black', title: 'black' },
		{ value: 'red', title: 'red' },
		{ value: 'brown', title: 'brown' },
		{ value: '#4a40ce', title: 'blue' }
	]
}

const deleteBlock = {
	type: 'button',
	placeholder: <RiDeleteBin6Line color='red' size='1rem' />,
	property: '',
	operationType: DELETE
}

const imageInput = {
	type: 'text',
	placeholder: 'Img',
	inputPlaceholder: 'Enter your link',
	property: 'imageUrl'
}

const redirectInput = {
	type: 'text',
	placeholder: 'Link',
	inputPlaceholder: 'Add a link to redirect to when click',
	property: 'redirect'
}

const Properties = {
	text: [
		deleteBlock,
		fontSize,
		textAlign,
		alignItems,
		fontWeight,
		borderRadius,
		boxShadow,
		color,
		backgroundColor
	],
	image: [deleteBlock, boxShadow, borderRadius, imageInput, redirectInput],
	inception: [deleteBlock, boxShadow, borderRadius, backgroundColor]
}

const PropertiesModifiers = {
	dropdown: DropDownSelector,
	button: ButtonSelector,
	text: TextInput,
	redirect: TextInput
}

function DropDownSelector({
	handleEdit,
	isOpen,
	handleOpenToolbar,
	property,
	value,
	options
}) {
	const handleChange = (e) => {
		const { value } = e.currentTarget
		handleEdit(property, value)
	}

	const result = options.find((option) => option.value === value)?.title || ''

	return (
		<Box
			position='relative'
			display='flex'
			alignItems='center'
			justifyContent='center'
			cursor='pointer'
			height='20px'
			borderLeft='1px solid gray'
			paddingX='0.3rem'>
			<Button
				id={property}
				size='sm'
				padding='3px'
				bg='transparent'
				onClick={handleOpenToolbar}>
				{result}
			</Button>
			<Box
				position='absolute'
				top='-50px'
				bg='white'
				rounded='5px'
				zIndex='999999'
				boxShadow='rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;'>
				{isOpen === property &&
					options?.map(({ value: optionValue, title }, index) => {
						return (
							<Button
								bg='transparent'
								onClick={handleChange}
								key={index}
								w='full'
								size='sm'
								background={`${optionValue === value && '#bdd4f95e'}`}
								_hover={
									optionValue === value
										? { bg: '#bdd4f98a' }
										: { bg: '#F2F2F2' }
								}
								value={optionValue}
								paddingX='4px'>
								{title}
							</Button>
						)
					})}
			</Box>
		</Box>
	)
}

DropDownSelector.propTypes = {
	isOpen: PropTypes.string.isRequired,
	handleOpenToolbar: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			title: PropTypes.any.isRequired
		}).isRequired
	).isRequired,
	placeholder: PropTypes.string.isRequired
}

function TextInput({
	handleEdit,
	handleCloseInput,
	isOpen,
	handleOpenToolbar,
	property,
	value,
	placeholder,
	inputPlaceholder
}) {
	const handleChange = (e) => {
		handleEdit(property, e.target.value)
	}
	return (
		<Box
			onDoubleClick={(e) => e.stopPropagation()}
			position='relative'
			display='flex'
			alignItems='center'
			justifyContent='center'
			cursor='pointer'
			height='20px'
			borderLeft='1px solid gray'
			paddingX='0.3rem'>
			<Button
				id={property}
				size='sm'
				padding='3px'
				bg='transparent'
				onClick={handleOpenToolbar}>
				{placeholder}
			</Button>
			{isOpen === property && (
				<Box
					position='absolute'
					bottom='-60px'
					bg='white'
					rounded='5px'
					zIndex='999999'
					padding='8px'
					boxShadow='rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;'>
					<Input
						placeholder={inputPlaceholder}
						onChange={handleChange}
						onKeyDown={handleCloseInput}
						value={value}
						rounded='3px'
						color='black'
						paddingX='6px'
						paddingY='3px'
						paddingLeft='0.4rem'
						boxShadow='rgb(15 15 15 / 10%) 0px 0px 0px 1px inset'
						background='rgba(242, 241, 238, 0.6)'
						w='15rem'
						height='1.9rem'
						fontSize='14px'
						border='transparent'
					/>
				</Box>
			)}
		</Box>
	)
}
TextInput.propTypes = {
	handleEdit: PropTypes.func.isRequired,
	property: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	handleCloseInput: PropTypes.func,
	placeholder: PropTypes.string.isRequired,
	inputPlaceholder: PropTypes.string,
	isOpen: PropTypes.bool,
	handleOpenToolbar: PropTypes.func
}

function ButtonSelector({ handleEdit, property, operationType, placeholder }) {
	const handleClick = () => {
		handleEdit(property, null, operationType)
	}
	return (
		<Box>
			<Button padding='0' onClick={handleClick} bg=''>
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

export const Modifiers = ({
	isOpen,
	handleOpenToolbar,
	handleEdit,
	handleCloseInput,
	propertiesValues,
	properties
}) => {
	return (
		properties?.map((propertyData, index) => {
			const type = propertyData.type
			const property = propertyData.property
			const Modifier = PropertiesModifiers[type]
			return (
				<Modifier
					isOpen={isOpen}
					handleOpenToolbar={handleOpenToolbar}
					handleEdit={handleEdit}
					handleCloseInput={handleCloseInput}
					{...propertyData}
					key={index}
					value={propertiesValues[property]}
				/>
			)
		}) ?? null
	)
}

function getBlockOffset(elem) {
	let offsetTop = 0
	let offsetLeft = 0
	let elemWidth = 0
	do {
		if (!isNaN(elem.offsetTop)) {
			if (elem.id.includes('inception')) {
				elemWidth = elem.getBoundingClientRect()?.width
			}
			offsetTop += elem.offsetTop
			offsetLeft += elem.offsetLeft
		}
		// eslint-disable-next-line no-cond-assign
	} while ((elem = elem.offsetParent))
	return { left: +offsetLeft, top: +offsetTop, width: elemWidth }
}

function getTranslateValues(element) {
	if (!element?.offsetParent)
		return {
			left: 0,
			top: 0
		}
	const style = window.getComputedStyle(element?.offsetParent)
	const widthBlock = style['width']?.replace('px', '') || 0
	const heightBlock = style['height']?.replace('px', '') || 0
	const matrix =
		style['transform'] || style.webkitTransform || style.mozTransform
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)?.[1].split(', ') ?? null
	if (!matrixValues)
		return {
			left: 0,
			top: 0
		}
	return {
		right: +matrixValues[4],
		left: +matrixValues[4],
		top: +matrixValues[5],
		width: +widthBlock,
		height: +heightBlock
	}
}

function getOffsets(blockKey) {
	const mainParentStyles = document.getElementById(blockKey).offsetParent
		.offsetParent.offsetParent
	if (blockKey.includes('child-inception')) {
		const v1 = getBlockOffset(mainParentStyles)
		const v2 = getTranslateValues(document.getElementById(blockKey))
		return { top: v1.top + v2.top, left: v1.left + v2.left }
	}
	if (blockKey.includes('inception')) {
		return getBlockOffset(document.getElementById(blockKey))
	}
	return getTranslateValues(document.getElementById(blockKey))
}

export const BlockModifiers = ({ data, blockKey, blockType }) => {
	const [isOpen, setIsOpen] = useState('')
	const { editBlock = () => {} } = data

	const handleOpenToolbar = (e) => {
		const { id } = e.currentTarget
		setIsOpen(id)
	}

	function handleCloseInput(e) {
		if (e.key === 'Enter') {
			setIsOpen('')
		}
	}

	function handleEdit(id, value, operationType = EDIT) {
		if (id !== 'imageUrl' || id !== 'redirect') setIsOpen('')
		editBlock({ ...data, [id]: value }, blockKey, operationType)
	}
	const dim = getOffsets(blockKey)

	const isBlockAtRight = dim.left > window.innerWidth * 0.7

	const xOffsetToolbar = isBlockAtRight
		? { right: window.innerWidth - (dim.left + dim.width) }
		: { left: dim.left }

	const isBlockAtTop = dim.top < 100
	const yOffsetToolbar = isBlockAtTop
		? { top: dim.top + 'px' }
		: { top: dim.top - 50 + 'px' }

	return (
		<Portal id='main-builder'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='left'
				paddingRight='3px'
				{...xOffsetToolbar}
				{...yOffsetToolbar}
				rounded='5px'
				boxShadow='rgb(15 15 15 / 5%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;'
				pos='absolute'
				onClick={(e) => e.stopPropagation()}
				backgroundColor='white'
				color='black'>
				<Modifiers
					handleOpenToolbar={handleOpenToolbar}
					isOpen={isOpen}
					handleEdit={handleEdit}
					handleCloseInput={handleCloseInput}
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
