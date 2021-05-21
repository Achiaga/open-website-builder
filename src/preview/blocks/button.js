import { getIsColorBright } from '../../builder/blocks/block-helpers/color-shades'
import { RedirectWrapper } from '../../builder/blocks/text'

function getBackgroundColor(color) {
  if (!color) return '#000000'
  if (color === 'transparent') return '#ffffff00'
  return color
}

export const CustomButton = ({ children, ...props }) => {
  const backgroundColor = getBackgroundColor(props?.backgroundColor)
  const isColorBright = getIsColorBright(backgroundColor)
  const fontColor = isColorBright ? 'gray.500' : 'white'
  return (
    <button
      style={{
        width: '100%',
        height: '100%',
        boxShadow: props.boxShadow,
        border: props.border,
        borderRadius: props.borderRadius,
        backgroundColor: backgroundColor,
        color: fontColor,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export const PreviewButton = (props) => {
  const redirectUrl = props?.redirect
  const { borderRadius, border, boxShadow, backgroundColor, text } = props

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustomButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
      >
        {text || ''}
      </CustomButton>
    </RedirectWrapper>
  )
}
