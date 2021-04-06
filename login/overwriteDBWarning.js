import { Box, Text } from '@chakra-ui/layout'
import { useDispatch } from 'react-redux'

import { denyOverwriteData, overwriteDBData } from '../features/builderSlice'
import { Button } from '@chakra-ui/button'

const OverwriteDBWarning = () => {
  const dispatch = useDispatch()

  function handleConfirm() {
    dispatch(overwriteDBData())
  }
  function handleDeny() {
    dispatch(denyOverwriteData())
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
    >
      <Box
        maxWidth="60vw"
        bg="white"
        p="4rem"
        pb="1rem"
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
          <Text fontSize="2xl" pb="1rem">
            Sorry for the incoveninece, but we have detected that you already
            have a portfolio save.
          </Text>
          <Text fontSize="2xl" pb="1rem">
            Do you want to save the new Portfolio and delete the old one?
          </Text>
          <Box d="flex" justifyContent="space-between" w="100%">
            <Button
              colorScheme="crimson"
              onClick={handleConfirm}
              variant="outline"
            >
              <b>Delete Old Portfolio </b>
              <Text as="span" ml="4px">
                and keep new one
              </Text>
            </Button>
            <Button
              colorScheme="primary"
              onClick={handleDeny}
              variant="outline"
            >
              <b>Keep Old portfolio </b>
              <Text as="span" ml="4px">
                and delete new one
              </Text>
            </Button>
          </Box>
          <Box
            mt="2rem"
            justifyContent="end"
            d="flex"
            flexDir="column"
            alignItems="center"
          >
            <Text fontSize="md" d="flex">
              If you want to keep both, you can{' '}
              <Text color="primary.500" fontWeight="500" ml="4px">
                upgrade to Premiun
              </Text>
              .
            </Text>
            <Text fontSize="md">
              Due to the hight database cost, we don&apos;t offer multiple
              portfolios for free users.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OverwriteDBWarning
