import PropTypes from 'prop-types'

const TitleBlock = ({ setNewBlock }) => {
	return (
		<div
			style={{ height: '50px', width: '50px', border: '1px solid' }}
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlock('title')
			}}>
			Title
		</div>
	)
}
const ImageBlock = ({ setNewBlock }) => {
	return (
		<div
			style={{ height: '50px', width: '50px', border: '1px solid' }}
			className='droppable-element'
			draggable={true}
			unselectable='on'
			onDragStart={(e) => {
				e.dataTransfer.setData('text/plain', '')
				setNewBlock('image')
			}}>
			Image
		</div>
	)
}

const BuilderSidebar = ({ setNewBlock }) => {
	return (
		<>
			<TitleBlock setNewBlock={setNewBlock} />
			<ImageBlock setNewBlock={setNewBlock} />
		</>
	)
}

BuilderSidebar.propTypes = {
	setNewBlock: PropTypes.any
}
ImageBlock.propTypes = {
	setNewBlock: PropTypes.any
}
TitleBlock.propTypes = {
	setNewBlock: PropTypes.any
}

export default BuilderSidebar
