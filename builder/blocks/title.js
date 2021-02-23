import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

const DataPropTypes = PropTypes.shape({
	text: PropTypes.string,
	callback: PropTypes.func
})

SelectBlock.propTypes = {
	isPreview: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}
EditableTitle.propTypes = {
	isPreview: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}
SimpleTitle.propTypes = {
	data: DataPropTypes
}

function EditableTitle({ data, blockKey }) {
	const [text] = useState(data?.text)
	const titleRef = useRef(null)
	function handleKeyDown() {
		const value = titleRef.current.innerText
		console.log({ value })
		data.callback(value, blockKey)
	}
	return (
		<h1 onKeyUp={handleKeyDown} contentEditable ref={titleRef}>
			{text}
		</h1>
	)
}
const SimpleTitle = ({ data }) => {
	return <h1>{data?.text}</h1>
}

const SelectBlock = ({ isPreview, data, blockKey }) => {
	if (isPreview) return <SimpleTitle data={data} />
	return <EditableTitle data={data} blockKey={blockKey} />
}

export default SelectBlock
