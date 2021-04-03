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

export const GenericImage = (props) => {
  const modifiers = {
    boxShadow: props.boxShadow,
    borderRadius: props.borderRadius,
  }
  const { isPreview, redirect } = props

  // function handleClick(e) {
  //   e.stopPropagation()
  //   if (isPreview && redirect) {
  //     window.open(validateUrl(redirect), '_blank')
  //   }
  // }

  return (
    <Box
      // onClick={handleClick}
      // onDoubleClick={(e) => props.isEditable && e.stopPropagation()}
      backgroundImage={`url(${props?.imageUrl})`}
      width="100%"
      height="100%"
      backgroundPosition="50% 50%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      cursor={
        isPreview && redirect ? 'pointer' : !isPreview ? 'pointer' : 'auto'
      }
      {...modifiers}
    />
  )
}
GenericImage.displayName = 'ImageBlock'

GenericImage.propTypes = {
  contentEditable: PropTypes.bool,
  isEditable: PropTypes.bool,
  imageUrl: PropTypes.string,
  boxShadow: PropTypes.string,
  borderRadius: PropTypes.string,
  redirect: PropTypes.string,
  ref: PropTypes.any,
  isPreview: PropTypes.bool,
}

export default GenericImage
