import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'
import getColorShades, { getIsColorBright } from './block-helpers/color-shades'
import { RedirectWrapper } from './text'

export const CustonButton = ({ children, ...props }) => {
  const backgroundColor = props?.backgroundColor || '#000000'
  const shades = getColorShades(backgroundColor)
  const isColorBright = getIsColorBright(backgroundColor)
  const fontColor = isColorBright ? 'gray.500' : 'white'
  return (
    <Button
      w="100%"
      h="100%"
      boxShadow={props.boxShadow}
      border={props.border}
      borderRadius={props.borderRadius}
      backgroundColor={backgroundColor}
      color={fontColor}
      overflow="hidden"
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
  const dispatch = useDispatch()
  const [textInput, setTextInput] = useState(props.text || 'button')
  const redirectUrl = props?.redirect
  const { borderRadius, border, boxShadow, backgroundColor } = props

  console.log(props)

  function handleChange(e) {
    console.log(e.target.value)
    setTextInput(e.target.value)
  }
  useEffect(() => {
    const updatedBlock = { ...props, text: textInput }
    dispatch(
      editBlockConfig({ newData: updatedBlock, blockId: props.parentBlockId })
    )
  }, [textInput])

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustonButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
      >
        <Input
          p="0"
          onChange={handleChange}
          value={textInput || ''}
          w="100%"
          border="none"
          textAlign="center"
        />
      </CustonButton>
    </RedirectWrapper>
  )
}

export const PreviewButton = (props) => {
  const redirectUrl = props?.redirect
  const { borderRadius, border, boxShadow, backgroundColor, text } = props

  return (
    <RedirectWrapper redirectUrl={redirectUrl}>
      <CustonButton
        borderRadius={borderRadius}
        border={border}
        backgroundColor={backgroundColor}
        boxShadow={boxShadow}
      >
        {text || ''}
      </CustonButton>
    </RedirectWrapper>
  )
}
