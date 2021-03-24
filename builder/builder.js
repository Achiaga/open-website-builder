import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
import { getBuilderData } from '../features/builderSlice'
import { SettingsBar } from './sidebar/settingsBar'
import LogoSvg from '../assets/logo'

const Builder = () => {
  const router = useRouter()

  const userBlocksData = useSelector(getBuilderData)

  const redirectLogo = () => {
    router.push('/')
  }

  if (!userBlocksData) return <div>Loading...</div>
  return (
    <>
      <Box
        d={['none', 'flex']}
        m="auto"
        flexDir="row"
        // bg={`url("./background.svg")`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        height="500vw"
      >
        <SettingsBar />
        <BuilderSidebar />
        <WebBuilder />
      </Box>
      <Box d={['fixed', 'none']} w="100vw" h="100vh">
        <Box
          d="flex"
          w="100%"
          pb="8"
          p={2}
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Box onClick={redirectLogo} pb="6" cursor="pointer">
            <LogoSvg width="3.5rem" />
          </Box>
          <Text
            as="h4"
            textAlign="center"
            fontSize={{ sm: 'md', base: 'xl', md: '2xl' }}
            fontWeight="semibold"
            pb="6"
          >
            <Text>Sorry,</Text>
            <Text>the builder is not avialable for mobile</Text>
          </Text>
          <Text as="p" textAlign="center" fontSize="lg">
            <Text>Please, access the builder</Text>
            <Text>from your computer</Text>
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default Builder
