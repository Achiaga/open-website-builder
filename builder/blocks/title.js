import { useRef, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from '@chakra-ui/react'

const GenericTitle = forwardRef((props, ref) => {
	return (
		<Text
			fontSize={props?.fontSize}
			textAlign={props?.textAlign}
			color={props?.color}
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			ref={ref}>
			{props?.text}
		</Text>
	)
})
GenericTitle.displayName = 'Hello'

function BuilderTitle({ data, blockKey }) {
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
	function changeAligment() {
		const newData = { ...data, textAlign: 'left' }
		data.callback(newData, blockKey)
	}
	function changeColor() {
		const newData = { ...data, color: 'red' }
		data.callback(newData, blockKey)
	}
	return (
		<div>
			<Box pos='absolute' top='-20px' backgroundColor='black' color='white'>
				<Box as='button' onClick={changeFontSize}>
					Up font
				</Box>
				<Box as='button' onClick={changeAligment}>
					textAlign
				</Box>
				<Box as='button' onClick={changeColor}>
					change Color
				</Box>
			</Box>
			<GenericTitle
				onKeyUp={handleKeyDown}
				contentEditable
				ref={titleRef}
				text={text}
				fontSize={data.fontSize}
				textAlign={data.textAlign}
				color={data.color}
			/>
		</div>
	)
}
const PreviewTitle = ({ data }) => {
	return <GenericTitle text={data?.text} {...data} />
}

const SelectBlock = ({ isPreview, data, blockKey }) => {
	if (isPreview) return <PreviewTitle data={data} />
	return <BuilderTitle data={data} blockKey={blockKey} />
}

const DataPropTypes = PropTypes.shape({
	text: PropTypes.string,
	callback: PropTypes.func,
	fontSize: PropTypes.string,
	textAlign: PropTypes.string,
	color: PropTypes.string
})

SelectBlock.propTypes = {
	isPreview: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}
BuilderTitle.propTypes = {
	isPreview: PropTypes.bool,
	data: DataPropTypes,
	blockKey: PropTypes.string
}

PreviewTitle.propTypes = {
	data: DataPropTypes
}

GenericTitle.propTypes = { ...DataPropTypes }

export default SelectBlock
