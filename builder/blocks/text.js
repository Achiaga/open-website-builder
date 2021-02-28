import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'

export const GenericText = forwardRef((props, ref) => {
	return (
		<Text
			w='100%'
			h='100%'
			d='grid'
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			suppressContentEditableWarning={props?.contentEditable}
			{...props}
			wordBreak='break-word'
			ref={ref}>
			{props?.text}
		</Text>
	)
})
GenericText.displayName = 'TextBlock'

const TextPropTypes = PropTypes.shape({
	text: PropTypes.string,
	editBlock: PropTypes.func,
	fontSize: PropTypes.string,
	textAlign: PropTypes.string,
	fontColor: PropTypes.string,
	bg: PropTypes.string
})
GenericText.propTypes = { ...TextPropTypes }

export default GenericText
