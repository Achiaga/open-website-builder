import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/react'

import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'

import colorShades, { getIsColorBright } from './block-helpers/color-shades'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'

function getBackgroundColor(color) {
  if (!color) return '#000000'
  if (color === 'transparent') return '#ffffff00'
  return color
}

export const CustonButton = ({ children, ...props }) => {
  const backgroundColor = getBackgroundColor(props?.backgroundColor)
  const shades = colorShades(backgroundColor)
  const isColorBright = getIsColorBright(backgroundColor)
  const fontColor = isColorBright ? 'gray.500' : 'white'

  return (
    <Button
      {...props}
      color={fontColor}
      _hover={{
        backgroundColor: shades.colors[isColorBright ? '600' : '400'],
      }}
      _active={{
        backgroundColor: shades.colors[isColorBright ? '700' : '300'],
      }}
    >
      {children}
    </Button>
  )
}

export const GenericContactForm = (props) => {
  const dispatch = useDispatch()
  const [buttonText, setButtonText] = useState(props.buttonText || 'Button')
  const [textInput, setTextInput] = useState(
    props.inputPlaceholder || 'eg: my@email.com'
  )

  const { borderRadius, border, boxShadow, backgroundColor } = props

  function handleButtonChange(e) {
    setButtonText(e.target.value)
  }
  function handleInputChange(e) {
    setTextInput(e.target.value)
  }
  useEffect(() => {
    const updatedBlock = {
      ...props,
      buttonText: buttonText,
      inputPlaceholder: textInput,
    }
    dispatch(
      editBlockConfig({ newData: updatedBlock, blockId: props.parentBlockId })
    )
  }, [textInput, buttonText])
  return (
    <Box
      d="flex"
      h="100%"
      minW="300px"
      boxShadow={boxShadow}
      border={border}
      borderRadius={borderRadius}
    >
      <Input
        type="text"
        borderRadius={props.borderRadius}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        border={border !== 'none' ? 'none' : '1px solid'}
        borderColor="gray.300"
        color="gray.400"
        h="100%"
        value={textInput}
        onChange={handleInputChange}
      />
      <CustonButton
        type="submit"
        borderRadius={borderRadius}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        backgroundColor={backgroundColor}
        h="100%"
        w="50%"
        minW="fit-content"
      >
        <Input
          p="0"
          onChange={handleButtonChange}
          value={buttonText}
          w="100%"
          border="none"
          textAlign="center"
        />
      </CustonButton>
    </Box>
  )
}
