export const PrevInception = (props) => {
  const gradientColor = props.gradientColor

  let background
  if (gradientColor) {
    background = `linear-gradient(225deg, ${gradientColor[0]} 0%, ${gradientColor[1]} 100%)`
  } else if (props.backgroundColor && !props.imageUrl) {
    background = props.backgroundColor
  }
  const inceptionModifiers = {
    ...(background ? { background } : {}),
    borderRadius: props.borderRadius,
    border: props.border,
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto',
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        ...inceptionModifiers,
      }}
    >
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
