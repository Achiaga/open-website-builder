import { useRef, useState, forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'

const Title = forwardRef((props, ref) => {
	return (
		<Text
			fontSize={props?.fontSize}
			textAlign='center'
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			ref={ref}>
			{props?.text}
		</Text>
	)
})
Title.displayName = 'Hello'

Title.propTypes = {
	onKeyUp: PropTypes.func,
	text: PropTypes.string,
	contentEditable: PropTypes.bool
}

function EditableTitle({ data, blockKey }) {
	const [text] = useState(data?.text)
	const titleRef = useRef(null)
	function handleKeyDown() {
		const value = titleRef.current?.innerText
		const newData = { ...data, text: value }
		data.callback(newData, blockKey)
	}
	function changeFontSize() {
		const newData = { ...data, fontSize: '30px' }
		data.callback(newData, blockKey)
	}
	return (
		<div>
			<Box as='button' pos='absolute' top='-20px' onClick={changeFontSize}>
				Up font
			</Box>
			<Title
				onKeyUp={handleKeyDown}
				contentEditable
				ref={titleRef}
				text={text}
				fontSize={data.fontSize}
			/>
		</div>
	)
}
const SimpleTitle = ({ data }) => {
	return <Title text={data?.text} {...data} />
}

const SelectBlock = ({ isPreview, data, blockKey }) => {
	if (isPreview) return <SimpleTitle data={data} />
	return <EditableTitle data={data} blockKey={blockKey} />
}

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

export default SelectBlock
