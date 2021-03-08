import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'

export const GenericText = forwardRef((props, ref) => {
	const { isEditable, onKeyUp, contentEditable, text } = props
	const Textmodifiers = {
		fontSize: props.fontSize,
		textAlign: props.textAlign,
		backgroundColor: props.backgroundColor,
		color: props.fontColor,
		alignItems: props.alignItems,
		fontWeight: props.fontWeight,
		boxShadow: props.boxShadow,
		borderRadius: props.borderRadius
	}
	return (
		<Text
			w='100%'
			h='100%'
			d='grid'
			onDoubleClick={(e) => isEditable && e.stopPropagation()}
			onKeyUp={onKeyUp}
			contentEditable={contentEditable}
			suppressContentEditableWarning={contentEditable}
			{...Textmodifiers}
			wordBreak='break-word'
			ref={ref}>
			{text}
		</Text>
	)
})
GenericText.displayName = 'TextBlock'

GenericText.propTypes = {
	isEditable: PropTypes.bool,
	contentEditable: PropTypes.bool,
	text: PropTypes.string,
	editBlock: PropTypes.func,
	fontSize: PropTypes.string,
	textAlign: PropTypes.string,
	fontColor: PropTypes.string,
	backgroundColor: PropTypes.string,
	alignItems: PropTypes.string,
	fontWeight: PropTypes.string,
	boxShadow: PropTypes.string,
	borderRadius: PropTypes.string,
	bg: PropTypes.string,
	onKeyUp: PropTypes.func
}

export default GenericText
