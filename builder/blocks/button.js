import { Button } from '@chakra-ui/button'
import getColorShades, { getIsColorBright } from './block-helpers/color-shades'
import { RedirectWrapper } from './text'

export const CustonButton = ({ children, ...props }) => {
  const backgroundColor = props.backgroundColor || '#fff'
  const shades = getColorShades(backgroundColor)
  const isColorBright = getIsColorBright(backgroundColor)
  const fontColor = isColorBright ? 'gray.500' : 'white'
  return (
    <Button
      w="100%"
      h="100%"
      boxShadow={props.boxShadow}
      border={props.border}
      borderRaidus={props.borderRadius}
      backgroundColor={props.backgroundColor}
      color={fontColor}
      _hover={{
        backgroundColor: shades.colors[isColorBright ? '600' : '400'],
        boxShadow: props.boxShadow,
      }}
      _active={{
        backgroundColor: shades.colors[isColorBright ? '700' : '300'],
        boxShadow: props.boxShadow,
      }}
    >
      {children}
    </Button>
  )
}

export const ButtonGeneric = (props) => {
  const redirectUrl = props?.redirect
  const { borderRadius, backgroundColor, border, boxShadow } = props
  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustonButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
      >
        {props.text || 'Button'}
      </CustonButton>
    </RedirectWrapper>
  )
}
