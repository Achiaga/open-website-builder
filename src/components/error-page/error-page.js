import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'

import LogoSvg from '../../../assets/logo'
import ErrorIcon from './error-icon'

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      position="relative"
      w="full"
      height="100vh"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        position="absolute"
        left="1rem"
        top="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid gray"
        borderColor="gray.50"
      >
        <Link href="/">
          <Button bg="transparent" _hover={{ bg: 'trasnparent' }}>
            <LogoSvg width="2.5rem" />
          </Button>
        </Link>
        <Text
          as="h1"
          pl="0rem"
          fontWeight="600"
          fontSize="1.25rem"
          fontFamily="Montserrat"
        >
          Antfolio
        </Text>
      </Box>
      <Box w="full">
        <ErrorIcon />
      </Box>
      <Box w="full">
        <Text as="h1" fontSize="3rem">
          404. Upsie!
        </Text>
        <Text as="p" fontSize="1.25rem" mt="1rem" mb="2rem" pr="10rem">
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </Text>
        <Link href="/">
          <Button
            size="lg"
            background="primary.600"
            color="white"
            fontWeight="bold"
            _hover={{
              background: 'primary.700',
            }}
          >
            HOME
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default ErrorPage
