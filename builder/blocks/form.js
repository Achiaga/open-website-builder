import { Button } from '@chakra-ui/button'
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { useState } from 'react'

export const GenericForm = () => {
  const [inputValue, setInputValue] = useState()
  function handleSubmitForm(e) {
    e.preventDefault()
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
