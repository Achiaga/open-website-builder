import PropTypes from 'prop-types'
import { RedirectWrapper } from './text'

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
  const { isPreview, redirect } = props

  return (
    <RedirectWrapper redirectUrl={redirect}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: props.backgroundColor,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: !isPreview && props.boxShadow,
          borderRadius: props.borderRadius,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${props.imageUrl})`,
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            cursor:
              isPreview && redirect
                ? 'pointer'
                : !isPreview
                ? 'pointer'
                : 'auto',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: props.opacity || 0,
            overflow: 'hidden',
            borderRadius: props.borderRadius,
          }}
        />
      </div>
    </RedirectWrapper>
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
