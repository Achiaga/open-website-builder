import { Box, Button } from '@chakra-ui/react'
import { useState } from 'react'

const Template = ({ children }) => {
  const [isVisible, setVisible] = useState(false)
  const showBackdrop = () => {
    setVisible(true)
  }
  const hideBackdrop = () => {
    setVisible(false)
  }
  return (
    <Box w="100%" h="lg" pos="relative" borderRadius="10px">
      <Box
        role="group"
        pos="absolute"
        w="full"
        h="full"
        zIndex="10"
        borderRadius="10px"
        display="flex"
        // onMouseEnter={showBackdrop}
        // onMouseLeave={hideBackdrop}
        alignItems="center"
        justifyContent="center"
        bg="transparent"
        _hover={{ bg: '#2431411f' }}
      >
        <Box
          w="full"
          px="6rem"
          display="flex"
          alignContent="center"
          justifyContent="space-between"
          d="none"
          _groupHover={{ display: 'flex' }}
        >
          <Button
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
            fontSize="xl"
            color="white"
            bg="primary.500"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ bg: '#5e76ef', color: 'white' }}
          >
            Select
          </Button>
          <Button
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
            fontSize="xl"
            color="primary.500"
            fontWeight="bold"
            cursor="pointer"
            bg="#f3f3f3"
            _hover={{ bg: 'white', color: '#5956f5' }}
          >
            Preview
          </Button>
        </Box>
      </Box>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow:
            '0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)',
        }}
      >
        {children}
      </div>
    </Box>
  )
}

export default Template
