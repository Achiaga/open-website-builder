import { RedirectWrapper } from '../../builder/blocks/text'

export const PrevInception = (props) => {
  const redirectUrl = props?.redirect
  const gradientColor = props.gradientColor
  const inceptionModifiers = {
    boxShadow: props.boxShadow,
    background: gradientColor
      ? `linear-gradient(225deg, ${gradientColor[0]} 0%, ${gradientColor[1]} 100%)`
      : props.backgroundColor,
    borderRadius: props.borderRadius,
    border: props.border,
  }
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${props.imageUrl})`,
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          margin: 'auto',
          ...inceptionModifiers,
        }}
      />
    </RedirectWrapper>
  )
}
