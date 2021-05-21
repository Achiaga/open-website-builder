import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { HiMenu } from 'react-icons/hi'
import { AiOutlineReload, AiFillSignal } from 'react-icons/ai'
import { IoBatteryDead } from 'react-icons/io5'
import { getBuilderDevice } from '../../features/builderSlice'

const SearchBar = () => {
  return (
    <Box
      bg="#e4e5e7"
      w="90%"
      h="40px"
      d="flex"
      borderRadius="10px"
      alignItems="center"
      justifyContent="space-between"
      mt="2.5rem"
    >
      <Box p="1rem">
        <HiMenu size="20px" />
      </Box>
      <Box as="span" fontSize="lg">
        www.antfolio.app
      </Box>
      <Box p="1rem">
        <AiOutlineReload size="20px" />
      </Box>
    </Box>
  )
}

const Speaker = () => {
  return (
    <Box
      pos="absolute"
      top="4px"
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
      left="20%"
      top="3px"
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

export const MobileWrapper = ({ children }) => {
  const builderDevice = useSelector(getBuilderDevice)
  if (builderDevice !== 'mobile') return children
  return (
    <Box
      w="100%"
      height="100%"
      bg="#f6f6f9"
      py="2rem"
      overflow="scroll"
      overflowY="hidden"
    >
      <Box
        width="370px"
        m="auto"
        pos="relative"
        height="100%"
        overflow="hidden"
        borderRadius="3rem"
        boxShadow="0px 0px 0px 11px #1f1f1f, 0px 0px 0px 13px #191919, 0px 0px 0px 15px #111"
        _before={{
          top: '0px',
          width: '50%',
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
          bg="#f7f7f7"
          textAlign="center"
          fontSize="xl"
          d="flex"
          justifyContent="center"
          alignItems="center"
          borderBottom="1px solid #e6e6e6"
        >
          <Box
            d="flex"
            justifyContent="space-between"
            pos="absolute"
            w="80%"
            top="1rem"
          >
            <Box fontWeight="600" fontSize="sm">
              11:11
            </Box>
            <Box d="flex">
              <Box mr="0.5rem">
                <IoBatteryDead size="20px" />
              </Box>
              <AiFillSignal size="15px" />
            </Box>
          </Box>
          <SearchBar />
        </Box>
        {children}
      </Box>
    </Box>
  )
}
MobileWrapper.propTypes = {
  children: PropTypes.any,
}
