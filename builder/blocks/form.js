import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { useState } from 'react'
import { sendEmailNotifiaction } from './block-helpers/transporter'

export const GenericForm = () => {
  const [inputValue, setInputValue] = useState()
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: false,
    success: false,
  })
  async function handleSubmitForm(e) {
    e.preventDefault()
    setRequestStatus({ ...requestStatus, loading: true })
    try {
      await sendEmailNotifiaction(
        'alfonso.achiaga@gmail.com ',
        'achiaga.10@gmail.com',
        'Alfonso'
      )
      setRequestStatus({ ...requestStatus, loading: false, success: true })
    } catch (err) {
      setRequestStatus((status) => ({ ...status, error: true, loading: false }))
      console.error(err)
    }
    console.log('sendData', inputValue)
  }

  function onChange(e) {
    setInputValue(e.target.value)
  }

  return (
    <Box>
      <form onSubmit={handleSubmitForm}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" onChange={onChange} />
          <FormHelperText>We&apos;ll never share your email.</FormHelperText>
          <Button type="submit">Send</Button>
        </FormControl>
      </form>
    </Box>
  )
}
