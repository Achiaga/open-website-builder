import { Box, Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaPlus, FaRegTimesCircle } from 'react-icons/fa'

const TextBlock = ({ setNewBlockType, handleDrop }) => {
	return (
		<Box
			h='50px'
			w='50px'
			border='1px solid'
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragEnd={handleDrop}
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlockType('text')
			}}>
			Text
		</Box>
	)
}
const InceptionBlock = ({ setNewBlockType, handleDrop }) => {
	return (
		<Box
			h='50px'
			w='50px'
			border='1px solid'
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragEnd={handleDrop}
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlockType('inception')
			}}>
			Inception
		</Box>
	)
}
const ImageBlock = ({ setNewBlockType }) => {
	return (
		<Box
			h='50px'
			w='50px'
			border='1px solid'
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlockType('image')
			}}>
			Image
		</Box>
	)
}

const BuilderSidebar = ({ setNewBlockType, isSaved }) => {
	const [isOpen, setIsOpen] = useState(false)

	function handleDrop() {
		setIsOpen(false)
	}
	if (!isOpen)
		return (
			<Box
				pos='fixed'
				top='10px'
				right='10px'
				zIndex='9999'
				border='1px solid transparent'
				borderRadius='100%'
				w='60px'
				h='60px'
				bg='white'
				justifyContent='center'
				d='flex'
				alignItems='center'
				cursor='pointer'
				boxShadow='rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'
				_hover={{
					bg: 'primary.100',
					border: '1px solid',
					borderColor: 'primary.500'
				}}
				onClick={() => setIsOpen(true)}>
				<FaPlus size='2.5em' />
			</Box>
		)
	return (
		<Box
			d='flex'
			flexDir='column'
			pos='fixed'
			top='10px'
			right='10px'
			zIndex='9999'
			bg='white'
			p='10px'
			boxShadow='rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'
			borderRadius='10px'>
			<Box onClick={() => setIsOpen(false)}>
				<FaRegTimesCircle size='1em' />
			</Box>
			<div>{isSaved ? 'saved' : <Spinner />}</div>
			<TextBlock setNewBlockType={setNewBlockType} handleDrop={handleDrop} />
			<ImageBlock setNewBlockType={setNewBlockType} />
			<InceptionBlock setNewBlockType={setNewBlockType} />
		</Box>
	)
}

BuilderSidebar.propTypes = {
	setNewBlockType: PropTypes.any,
	isSaved: PropTypes.any
}
ImageBlock.propTypes = {
	setNewBlockType: PropTypes.any
}
TextBlock.propTypes = {
	setNewBlockType: PropTypes.func,
	handleDrop: PropTypes.func
}

export default BuilderSidebar
