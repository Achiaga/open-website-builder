import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Text } from '@chakra-ui/react'
import PreviewText from './preview-text/preview-text'
import BuilderText from './builder-text/builder-text'
import { TextPropTypes } from '.'

export const GenericText = forwardRef((props, ref) => {
	return (
		<Text
			w='100%'
			h='100%'
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			fontSize={props?.fontSize}
			textAlign={props?.textAlign}
			color={props?.fontColor}
			onKeyUp={props?.onKeyUp}
			contentEditable={props?.contentEditable}
			bg={props?.bgColor}
			ref={ref}>
			{props?.text}
		</Text>
	)
})
GenericText.displayName = 'TextBlock'

const SelectTextBlock = ({ isPreview, data, blockKey, isEditable }) => {
	if (isPreview) return <PreviewText data={data} />
	return <BuilderText data={data} blockKey={blockKey} isEditable={isEditable} />
}

SelectTextBlock.propTypes = {
	isPreview: PropTypes.bool,
	isEditable: PropTypes.bool,
	data: TextPropTypes,
	blockKey: PropTypes.string
}

GenericText.propTypes = { ...TextPropTypes }

export default SelectTextBlock
