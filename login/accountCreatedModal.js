import { Box, Text } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'

import { IoCheckmark } from 'react-icons/io5'
import { setAccountCreated } from '../features/builderSlice'
import { IoClose } from 'react-icons/io5'

const AccountCreatedModal = () => {
  const dispatch = useDispatch()

  function handleClose() {
    dispatch(setAccountCreated(false))
  }

  return (
    <Box
      left="0"
      top="0"
      pos="fixed"
      w="100vw"
      h="100vh"
      d="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="center"
      bg="#0000001f"
      onClick={handleClose}
    >
      <Box
        maxWidth="60vw"
        bg="white"
        p="4rem"
        px="6.5rem"
        borderRadius="10px"
        box-shadow="0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)"
        onClick={(e) => e.stopPropagation()}
        pos="relative"
      >
        <Box
          color="gray.500"
          paddingBottom={'2'}
          mb="1rem"
          textAlign="center"
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            pos="absolute"
            top="1rem"
            right="1rem"
            _hover={{
              background: 'gray.100',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={handleClose}
          >
            <IoClose size="30px" />
          </Box>
          <Box
            borderRadius="50%"
            border="2px solid"
            borderColor="#3fab3f"
            mb="3rem"
            p="1rem"
          >
            <IoCheckmark color="#3fab3f" size="88px" />
          </Box>
          <Text fontSize="2xl" pb="1rem">
            Account created
          </Text>
          <Text fontSize="lg">
            Your Portfolio is now <b>saved</b>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default AccountCreatedModal
