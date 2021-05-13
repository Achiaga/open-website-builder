import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { GoCheck } from 'react-icons/go'
import {
  addDomain,
  requestDomainStatus,
} from '../../../builder/blocks/block-helpers/transporter'

const DomainsWrapper = ({ domain, projectId }) => {
  const [domainInput, setDomainInput] = useState('')
  const [domainStatus, setDomainStatus] = useState(null)

  async function handleAddDomain() {
    const domainStatus = await addDomain(domainInput, projectId)
    console.log('domainStatus', domainStatus)
  }
  async function checkDomainStatus() {
    setDomainStatus('loading')
    const { domainStatus } = await requestDomainStatus(domain)
    setDomainStatus(domainStatus || 'none')
  }
  useEffect(() => {
    checkDomainStatus()
  }, [])

  const isActive = domainStatus === 'active'

  if (!domainStatus) return <Box>Loading Domain status...</Box>

  return (
    <Box py="1rem" fontSize="md">
      Custom Domain
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="0.5rem"
      >
        {isActive ? (
          <Box d="flex" alignItems="center">
            <Box d="flex" alignItems="center">
              <GoCheck color="#3fab3f" size="20px" />
              <Text fontSize="md" fontWeight="600" ml="0.5rem">
                {domain}
              </Text>
            </Box>
          </Box>
        ) : (
          <Box d="flex">
            <Input
              placeholder="www.your-domain.com"
              borderColor="gray.300"
              mr="1rem"
              onChange={(e) => setDomainInput(e.target.value)}
            />
            <Button
              colorScheme="primary"
              minW="fit-content"
              onClick={handleAddDomain}
            >
              Add Domain
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default DomainsWrapper
