import { Button } from '@chakra-ui/button'
import { Box, Spinner } from '@chakra-ui/react'

import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useEffect, useState } from 'react'
import { sendEmailNotifiaction } from './block-helpers/transporter'
import colorShades, { getIsColorBright } from './block-helpers/color-shades'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sendEmail(inputEmail, updateSate) {
  updateSate((status) => ({ ...status, loading: true }))
  try {
    await timeout(3000)
    await sendEmailNotifiaction(
      'gonzalo.achiaga@gmail.com',
      inputEmail,
      'Gonzalo'
    )
    updateSate((status) => ({ ...status, loading: false, success: true }))
  } catch (err) {
    updateSate((status) => ({ ...status, error: true, loading: false }))
    console.error(err)
  }
}

function getButtonContent(loading, success) {
  if (loading)
    return (
      <Box>
        <Spinner speed="0.65s" size="md" />
      </Box>
    )
  if (success) return 'Sucess'
  return 'Send'
}

const inputInitialValue = {
  loading: false,
  error: false,
  success: false,
}

export const PrevContactForm = () => {
  const [inputValue, setInputValue] = useState()
  const [requestStatus, setRequestStatus] = useState(inputInitialValue)
  const { loading, success, error } = requestStatus
  function handleSubmitForm(e) {
    e.preventDefault()
    if (success) return
    sendEmail(inputValue, setRequestStatus)
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
    <>
      <form onSubmit={handleSubmitForm} style={{ height: '100%' }}>
        <FormControl id="email" d="flex" h="100%">
          <Input
            type="email"
            onChange={onChange}
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            h="100%"
            border="1px solid"
            borderColor="gray.300"
            placeholder="Write your email eg: johnDoe@gmail.com"
          />
          <Button
            type="submit"
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            colorScheme={success ? 'green' : 'primary'}
            h="100%"
            minWidth="fit-content"
          >
            {getButtonContent(loading, success)}
          </Button>
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
    </>
  )
}

const CustonButton = ({ children, ...props }) => {
  const backgroundColor = props.backgroundColor
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
    >
      {children}
    </Button>
  )
}

export const GenericForm = (props) => {
  console.log(props)
  return (
    <Box d="flex" h="100%">
      <Input
        type="email"
        borderRadius={props.borderRadius}
        borderTopRightRadius="0"
        borderBottomRightRadius="0"
        h="100%"
        border={props.border}
        placeholder="eg: your@email.com"
      />
      <CustonButton
        type="submit"
        borderRadius={props.borderRadius}
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        backgroundColor={props.backgroundColor}
        h="100%"
        minWidth="fit-content"
      >
        Get in touch
      </CustonButton>
    </Box>
  )
}
