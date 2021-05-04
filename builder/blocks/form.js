import { Button } from '@chakra-ui/button'
import { Box, Spinner } from '@chakra-ui/react'

import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useContext, useEffect, useState } from 'react'
import { sendEmailNotifiaction } from './block-helpers/transporter'
import colorShades, { getIsColorBright } from './block-helpers/color-shades'
import { useDispatch } from 'react-redux'
import { editBlockConfig } from '../../features/builderSlice'
import { BlocksContext } from '../web-preview/preview'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sendEmail(inputEmail, updateSate, websiteId) {
  updateSate((status) => ({ ...status, loading: true }))
  try {
    // await timeout(3000)
    await sendEmailNotifiaction(websiteId, inputEmail)
    updateSate((status) => ({ ...status, loading: false, success: true }))
  } catch (err) {
    updateSate((status) => ({ ...status, error: true, loading: false }))
    console.error(err)
  }
}

function getButtonContent(loading, success, buttonText) {
  if (loading)
    return (
      <Box>
        <Spinner speed="0.65s" size="md" />
      </Box>
    )
  if (success) return 'Sucess'
  return buttonText || 'Send'
}

const inputInitialValue = {
  loading: false,
  error: false,
  success: false,
}

export const PrevContactForm = (props) => {
  const { websiteId } = useContext(BlocksContext)
  const [inputValue, setInputValue] = useState()
  const [requestStatus, setRequestStatus] = useState(inputInitialValue)
  const { loading, success, error } = requestStatus
  function handleSubmitForm(e) {
    e.preventDefault()
    if (success) return
    sendEmail(inputValue, setRequestStatus, websiteId)
  }

  function onChange(e) {
    if (success) {
      setRequestStatus(inputInitialValue)
    }
    setInputValue(e.target.value)
  }

  useEffect(() => {
    success && setInputValue('')
  }, [success])
  return (
    <form onSubmit={handleSubmitForm} style={{ height: '100%' }}>
      <FormControl id="email" d="flex" h="100%">
        <Input
          type="email"
          onChange={onChange}
          borderTopRightRadius="0"
          borderBottomRightRadius="0"
          h="100%"
          border={props.border !== 'none' ? 'none' : '1px solid'}
          borderColor="gray.300"
          placeholder={
            props.inputPlaceholder || 'Write your email eg: johnDoe@gmail.com'
          }
          background="transparent"
        />
        <CustonButton
          type="submit"
          borderTopLeftRadius="0"
          borderBottomLeftRadius="0"
          backgroundColor={success ? '#3cd04e' : props.backgroundColor}
          borderRadius={props.borderRadius}
          color="gray.400"
          h="100%"
          w="50%"
          minW="fit-content"
        >
          {getButtonContent(loading, success, props.buttonText)}
        </CustonButton>
        {error && (
          <Box
            color="red.500"
            position="absolute"
            bottom="-1.25rem"
            fontWeight="500"
            fontSize="sm"
          >
            Sorry, something went wrong. Try again!
          </Box>
        )}
      </FormControl>
    </form>
  )
}

export const CustonButton = ({ children, ...props }) => {
  const backgroundColor = props.backgroundColor || '#ffffff'
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
