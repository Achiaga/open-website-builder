import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'

import { WebBuilder } from '../builder/web-builder'
import { BuilderSidebar } from '../builder/sidebar'
import { getBuilderData, getBuilderDevice } from '../features/builderSlice'
import { SettingsBar } from './sidebar/settingsBar'
import { useEffect } from 'react'
import MobileVersion from './web-builder/mobile-version'
import { HiMenu } from 'react-icons/hi'
import { AiOutlineReload } from 'react-icons/ai'

const SerachBar = () => {
  return (
    <Box
      bg="white"
      w="90%"
      h="50px"
      d="flex"
      borderRadius="10px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box p="1rem">
        <HiMenu size="30px" />
      </Box>
      <Box as="span">www.antfolio.com</Box>
      <Box p="1rem">
        <AiOutlineReload size="30px" />
      </Box>
    </Box>
  )
}

const Speaker = () => {
  return (
    <Box
      pos="absolute"
      top="12px"
      left="50%"
      transform="translate(-50%, 6px)"
      height="8px"
      width="15%"
      bg="#101010"
      borderRadius="8px"
      boxShadow="inset 0px -3px 3px 0px rgb(255 255 255 / 20%)"
    ></Box>
  )
}
const Camera = () => {
  return (
    <Box
      pos="absolute"
      left="40%"
      top="12px"
      transform="translate(180px, 4px)"
      width="12px"
      height="12px"
      background-color="#101010"
      borderRadius="12px"
      boxShadow="inset 0px -3px 2px 0px rgb(255 255 255 / 20%)"
      _after={{
        content: "''",
        position: 'absolute',
        backgroundColor: '#2d4d76',
        width: '6px',
        height: '6px',
        top: '3px',
        left: '3px',
        display: 'block',
        borderRadius: '4px',
        boxShadow: 'inset 0px -2px 2px rgb(0 0 0 / 50%)',
      }}
    ></Box>
  )
}

const MobileWrapper = ({ children }) => {
  const builderDevice = useSelector(getBuilderDevice)
  if (builderDevice !== 'mobile') return children
  return (
    <Box w="100%" height="100%" bg="#dbe5f0" py="1rem" overflow="scroll">
      <Box
        width="50%"
        m="auto"
        pos="relative"
        // boxShadow="lg"
        height="100%"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="5rem"
        boxShadow="0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919, 0px 0px 0px 20px #111"
        _before={{
          top: '0px',
          width: '56%',
          height: '30px',
          backgroundColor: ' #1f1f1f',
          borderRadius: '0px 0px 40px 40px',
          content: "''",
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Speaker />
        <Camera />
        <Box
          h="100px"
          bg="gray.200"
          textAlign="center"
          fontSize="xl"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SerachBar />
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
