import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const TitleBlock = ({ setNewBlockType }) => {
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
				setNewBlockType('title')
			}}>
			Title
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

const BuilderSidebar = ({ setNewBlockType }) => {
	return (
		<>
			<TitleBlock setNewBlockType={setNewBlockType} />
			<ImageBlock setNewBlockType={setNewBlockType} />
		</>
	)
}

BuilderSidebar.propTypes = {
	setNewBlockType: PropTypes.any
}
ImageBlock.propTypes = {
	setNewBlockType: PropTypes.any
}
TitleBlock.propTypes = {
	setNewBlockType: PropTypes.any
}

export default BuilderSidebar
