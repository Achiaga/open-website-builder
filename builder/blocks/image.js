import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

function validateUrl(string) {
	try {
		new URL(string)
	} catch (err) {
		console.error(err)
		if (string.includes('https://')) return 'upsy, something went wrong'
		return `https://${string}`
	}

	return string
}

export const GenericImage = forwardRef((props, ref) => {
	const modifiers = {
		boxShadow: props.boxShadow,
		borderRadius: props.borderRadius
	}
	const { isPreview, redirect } = props

	function handleClick() {
		if (isPreview && redirect) {
			window.open(validateUrl(redirect), '_blank')
		}
	}

	return (
		<Box
			onClick={handleClick}
			onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
			backgroundImage={`url(${props?.imageUrl})`}
			width='100%'
			height='100%'
			backgroundPosition='50% 50%'
			backgroundRepeat='no-repeat'
			backgroundSize='cover'
			cursor={isPreview && redirect ? 'pointer' : 'auto'}
			{...modifiers}
		/>
	)
})
GenericImage.displayName = 'TextBlock'

GenericImage.propTypes = {
	contentEditable: PropTypes.bool,
	isEditable: PropTypes.bool,
	imageUrl: PropTypes.string,
	boxShadow: PropTypes.string,
	borderRadius: PropTypes.string,
	ref: PropTypes.any
}

export default GenericImage
