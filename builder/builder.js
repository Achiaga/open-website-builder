import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
import { getBuilderData, getBuilderDevice } from '../features/builderSlice'
import { SettingsBar } from './sidebar/settingsBar'
import { useEffect } from 'react'
import MobileVersion from './web-builder/mobile-version'

const MobileWrapper = ({ children }) => {
  const builderDevice = useSelector(getBuilderDevice)
  if (builderDevice !== 'mobile') return children
  return (
    <Box w="100%" height="100%" bg="#dbe5f0" py="1rem" overflow="scroll">
      <Box
        width="50%"
        m="auto"
        boxShadow="lg"
        height="100%"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="5rem"
      >
        <Box h="50px" bg="gray.200" textAlign="center" fontSize="xl">
          Navbar
        </Box>
        {children}
      </Box>
    </Box>
  )
}

const Builder = () => {
  const userBlocksData = useSelector(getBuilderData)

  function confirmExit() {
    return ''
  }

  useEffect(() => {
    window.onbeforeunload = confirmExit
  }, [])

  if (!userBlocksData)
    return (
      <Box
        w="100%"
        h="100%"
        d="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" thickness="4px" color="primary.500" speed="0.65s" />
      </Box>
    )
  return (
    <>
      <Box
        d={['none', 'flex']}
        m="auto"
        flexDir="row"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        height="500vw"
      >
        <SettingsBar />
        <BuilderSidebar />
        <MobileWrapper>
          <WebBuilder />
        </MobileWrapper>
      </Box>
      <MobileVersion />
    </>
  )
}

export default Builder
