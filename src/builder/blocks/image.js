import PropTypes from 'prop-types'

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
    <div
      style={{
        width: '100%',
        height: '100%',
        background: props.backgroundColor,
        position: 'relative',
        overflow: 'hidden',
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
            isPreview && redirect ? 'pointer' : !isPreview ? 'pointer' : 'auto',
          ...modifiers,
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
