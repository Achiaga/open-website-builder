import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useEffect, useState } from 'react'
import { GoCheck } from 'react-icons/go'
import ExclamationIcon from '../../../assets/exclamation-icon'
import {
  addDomain,
  requestDomainStatus,
} from '../../../builder/blocks/block-helpers/transporter'

const DomainsWrapper = ({ domain, projectId }) => {
  const [domainInput, setDomainInput] = useState('')
  const [domainStatus, setDomainStatus] = useState(null)
  const [nameServers, setNameServers] = useState('')

  async function handleAddDomain() {
    setDomainStatus('adding')
    try {
      const res = await addDomain(domainInput, projectId)
      setDomainStatus(res.domainStatus)
      setNameServers(res.nameServers)
    } catch (err) {
      console.error(err)
      setDomainStatus('error')
    }
  }
  async function checkDomainStatus() {
    setDomainStatus('checking')
    const { domainStatus, nameServers } = await requestDomainStatus(domain)
    setDomainStatus(domainStatus || null)
    setNameServers(nameServers)
  }
  useEffect(() => {
    domain && checkDomainStatus()
  }, [])

  const isActive = domainStatus === 'active'
  const isPending = domainStatus === 'pending'
  const isAddingDomain = domainStatus === 'adding'
  const checkingStatus = domainStatus === 'checking'
  const isDuplicated = domainStatus === 'no-available'
  if (checkingStatus) return <Box>Loading Domain status...</Box>

  return (
    <Box py="1rem" fontSize="md">
      Custom Domain
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py="0.5rem"
      >
        {isActive || isPending ? (
          <Box d="flex" justifyContent="center" flexDir="column">
            <Box d="flex" alignItems="center">
              {isActive ? (
                <GoCheck color="#3fab3f" size="20px" />
              ) : (
                <Box
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  background="yellow.400"
                  marginLeft="0.5rem"
                />
              )}
              <Text fontSize="md" fontWeight="600" ml="0.5rem">
                {domain || domainInput}
              </Text>
              <br />
            </Box>

            <Text>
              {isPending && !isActive ? (
                <Box
                  border="1px solid gray"
                  borderRadius="10px"
                  mt="1rem"
                  paddingX="1rem"
                  paddingY="0.5rem"
                >
                  <Box display="flex" alignItems="center" pb="0.4rem">
                    <ExclamationIcon fill="#2943de" />
                    <Text
                      mb="0.2rem"
                      pb="0.1rem"
                      ml="0.5rem"
                      fontWeight="600"
                      borderBottom="2px solid"
                      borderColor="#2943de"
                    >
                      Info
                    </Text>
                  </Box>
                  <Text pb="0.2rem">
                    Add the following name servers on your domain name provider:
                  </Text>
                  <Text>- {nameServers?.[0]}</Text>
                  <Text>- {nameServers?.[1]}</Text>
                  <Text pt="1.5rem">
                    You can follow this{' '}
                    <a
                      href="https://www.antfolio.app/guides/guides-custom-domain"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'underline', color: 'blue' }}
                    >
                      guide
                    </a>{' '}
                    to set up your name server.
                  </Text>
                </Box>
              ) : (
                <Box pt="0.5rem">
                  Congrats! Your site is already set up correctly
                </Box>
              )}
            </Text>
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
              {isAddingDomain ? <Spinner /> : 'Add Domain'}
            </Button>
          </Box>
        )}
      </Box>
      {isDuplicated && <Box>Sorry this domain is already in use</Box>}
    </Box>
  )
}

export default DomainsWrapper
