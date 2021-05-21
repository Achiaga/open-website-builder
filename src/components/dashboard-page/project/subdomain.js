import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useState } from 'react'
import { GoCheck } from 'react-icons/go'
import { requestSubDomainAvailability } from '../../../builder/blocks/block-helpers/transporter'

const SubdomainWrapper = ({ projectId, actualSubdomain }) => {
  const [subdomain, setSubdomain] = useState('')
  const [subdomainStatus, setSubdomainStatus] = useState('')
  async function testSubdomain(e) {
    e.preventDefault()
    setSubdomainStatus('adding')
    try {
      const { addded } = await requestSubDomainAvailability(
        subdomain,
        projectId
      )
      setSubdomainStatus(addded ? 'success' : 'no-available')
    } catch (err) {
      setSubdomainStatus('error')
      console.error('testSubdomain', err)
    }
  }
  const adding = subdomainStatus === 'adding'
  const success = subdomainStatus === 'success'
  const error = subdomainStatus === 'error'
  const noAvailable = subdomainStatus === 'no-available'

  return (
    <Box py="1rem" fontSize="md" as="span">
      Custom Subdomain
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="0.5rem"
      >
        {success || actualSubdomain ? (
          <Box d="flex" alignItems="center" justifyContent="flex-start">
            <GoCheck color="#3fab3f" size="20px" />
            <Box fontSize="md" fontWeight="600" ml="0.5rem" as="span">
              <Box d="flex">
                {subdomain || actualSubdomain}
                <Box color="gray.300">.antfolio.app</Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <form onSubmit={testSubdomain}>
              <Box d="flex">
                <Input
                  placeholder="free-subdomain"
                  onChange={(e) => setSubdomain(e.target.value)}
                  value={subdomain}
                  borderColor="gray.300"
                  mr="1rem"
                />
                <Button
                  colorScheme="primary"
                  variant="outline"
                  type="submit"
                  minW="fit-content"
                >
                  {adding ? <Spinner /> : 'Add'}
                </Button>
              </Box>
            </form>
            {noAvailable && (
              <Box>This domain is already in use, please choose another</Box>
            )}
            {error && <Box color="red.500">Something went wrong</Box>}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SubdomainWrapper
