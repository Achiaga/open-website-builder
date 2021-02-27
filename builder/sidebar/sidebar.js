import { Box, Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TextBlock = ({ setNewBlockType }) => {
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
				setNewBlockType('text')
			}}>
			Text
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
	return (
		<Box d='flex' flexDir='column'>
			<div>{isSaved ? 'saved' : <Spinner />}</div>
			<TextBlock setNewBlockType={setNewBlockType} />
			<ImageBlock setNewBlockType={setNewBlockType} />
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
	setNewBlockType: PropTypes.any
}

export default BuilderSidebar
