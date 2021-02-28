import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

export const GenericImage = forwardRef((props) => {
	return (
		<Box
			contentEditable={props?.contentEditable}
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			backgroundImage={`url(${props?.imageUrl})`}
			width='100%'
			height='100%'
			backgroundPosition='50% 50%'
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
			{...props}
		/>
	)
})
GenericImage.displayName = 'TextBlock'

const ImagePropTypes = PropTypes.shape({
	contentEditable: PropTypes.func,
	isEditable: PropTypes.func,
	imageUrl: PropTypes.string
})
GenericImage.propTypes = { ...ImagePropTypes, ref: PropTypes.any }

export default GenericImage
