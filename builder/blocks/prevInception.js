import { RedirectWrapper } from './text'

export const PrevInception = (props) => {
  const redirectUrl = props?.redirect
  const gradientColor = props.gradientColor

  let background
  if (gradientColor) {
    background = `linear-gradient(225deg, ${gradientColor[0]} 0%, ${gradientColor[1]} 100%)`
  } else if (props.backgroundColor && !props.imageUrl) {
    background = props.background
  }
  const inceptionModifiers = {
    boxShadow: props.boxShadow,
    ...(background ? { background } : {}),
    borderRadius: props.borderRadius,
    border: props.border,
  }
  console.log(inceptionModifiers, gradientColor)
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
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
      />
    </RedirectWrapper>
  )
}
