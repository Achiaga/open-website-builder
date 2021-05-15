import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { requestSubDomainAvailability } from '../../../builder/blocks/block-helpers/transporter'

const Subdomain = ({ projectId }) => {
  const [subdomain, setSubdomain] = useState('')
  async function testSubdomain(e) {
    e.preventDefault()
    const value = await requestSubDomainAvailability(subdomain, projectId)
    console.log(value)
  }
  return (
    <Box>
      <Text>Add Free subdomain</Text>
      <form onSubmit={testSubdomain}>
        <Input
          placeholder="free-subdomain"
          onChange={(e) => setSubdomain(e.target.value)}
          value={subdomain}
        />
        <Button colorScheme="primary" variant="outline" type="submit">
          Add
        </Button>
      </form>
    </Box>
  )
}

export default Subdomain
