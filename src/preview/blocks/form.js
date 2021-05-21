import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useContext, useEffect, useState } from 'react'
import { sendEmailNotifiaction } from '../../builder/blocks/block-helpers/transporter'
import { BlocksContext } from '../web-preview/preview'
import { CustomButton } from './button'

const inputInitialValue = {
  loading: false,
  error: false,
  success: false,
}

async function sendEmail(inputEmail, updateSate, projectId) {
  updateSate((status) => ({ ...status, loading: true }))
  try {
    // await timeout(3000)
    await sendEmailNotifiaction(projectId, inputEmail)
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
  if (success) return 'Succsess'
  return buttonText || 'Send'
}

export const PrevContactForm = (props) => {
  const { projectId } = useContext(BlocksContext)
  const [inputValue, setInputValue] = useState()
  const [requestStatus, setRequestStatus] = useState(inputInitialValue)
  const { loading, success, error } = requestStatus
  function handleSubmitForm(e) {
    e.preventDefault()
    if (success) return
    sendEmail(inputValue, setRequestStatus, projectId)
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
        <CustomButton
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
        </CustomButton>
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
