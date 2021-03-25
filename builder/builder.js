import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
import { getBuilderData } from '../features/builderSlice'
import { SettingsBar } from './sidebar/settingsBar'
import { useEffect } from 'react'
import MobileVersion from './web-builder/mobile-version'
import { useRouter } from 'next/router'

const Builder = () => {
  const userBlocksData = useSelector(getBuilderData)
  const router = useRouter()

  function confirmExit() {
    return ''
  }

  const redirectLogo = () => {
    router.push('/')
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
        <WebBuilder />
      </Box>
      <MobileVersion />
    </>
  )
}

export default Builder
