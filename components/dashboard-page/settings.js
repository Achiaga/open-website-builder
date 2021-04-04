import { Box, Text, Button, background } from '@chakra-ui/react'

const Settings = () => {
  return (
    <Box marginLeft="7rem" marginTop="5rem">
      <Text as="h1" fontSize="2.3rem" fontWeight="400" fontFamily="Montserrat">
        Settings
      </Text>
      <Box width="full" mb="1.25rem">
        <Text
          as="h2"
          mt="3rem"
          fontSize="1.35rem"
          fontWeight="400"
          fontFamily="Montserrat"
        >
          User
        </Text>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        flexDirection="column"
      >
        <Text mb="1rem">
          Your account:{' '}
          <Text as="span" fontWeight="semibold">
            test@gmail.com
          </Text>
        </Text>
        <Box mt="1rem">
          <Button
            marginRight="1rem"
            variant="outline"
            borderColor="primary.700"
            color="primary.700"
            mb="1.5rem"
            _hover={{
              background: 'primary.700',
              color: 'white',
            }}
          >
            Change Email
          </Button>
          <Button
            marginRight="1rem"
            variant="outline"
            borderColor="primary.700"
            color="primary.700"
            mb="1.5rem"
            _hover={{
              background: 'primary.700',
              color: 'white',
            }}
          >
            Change Password
          </Button>

          <Button
            marginRight="1rem"
            variant="outline"
            borderColor="black"
            color="black"
            mb="1.5rem"
            _hover={{
              borderColor: 'red.700',
              background: 'red.700',
              color: 'white',
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Settings
