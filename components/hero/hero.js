import Link from 'next/link'

import { Box, Text, Button } from '@chakra-ui/react'

const Hero = () => {
  return (
    <Box
      position="relative"
      display="flex"
      w={'100vw'}
      pl={0}
      justifyContent="center"
      flexDir="column"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        fontWeight="extrabold"
        fontSize={['3.5rem', '7rem']}
        lineHeight="120%"
        h="100vh"
        textAlign="center"
      >
        <Text
          as="h1"
          background="linear-gradient(
            135deg
            ,  #43E28E  0%,#506bf0 100%)"
          backgroundClip="text"
          textFillColor="transparent"
        >
          Simple, Easy & Beautiful
        </Text>
        <Text as="h1" d="flex" fontSize={['3.5rem', '6rem']}>
          No-Code Website Builder
        </Text>

        <Box pos="relative" mt="4rem">
          <Box
            pos="absolute"
            left="0"
            transform={['translate(-80%, -50%)', 'translate(-100%, -10px)']}
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              height="100"
              width="80"
              viewBox="0 0 100 100"
              fill="#506bf0"
            >
              <path d="M54.1 108c-.5 0-.9-.2-1.2-.6-.5-.7-.3-1.6.4-2.1 1.5-1 9.5-5.5 14.6-8.3-17.4-.5-31.3-7.3-41.3-20C9.9 55.7 9.5 24.2 14.2 3.7c.2-.8 1-1.3 1.8-1.1.8.2 1.3 1 1.1 1.8-4.6 19.9-4.2 50.3 11.8 70.8 9.5 12.2 23 18.6 39.9 18.9h.3l-3.2-4c-1.4-1.7-2.7-3.3-4.1-5.1-.7-.9-1.5-1.9-2.3-2.9-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2 0 0 0 .1.1.1l6.4 7.9c.5.6.9 1.1 1.4 1.7 1.5 1.8 3.1 3.6 4.3 5.5 0 .1.1.1.1.2.1.2.1.3.2.5v.3c0 .2 0 .3-.1.5 0 .1-.1.1-.1.2-.1.2-.2.3-.3.4-.1.1-.2.1-.3.2 0 0-.1 0-.2.1-.9.4-16 8.6-18.2 10.1-.4 0-.7.1-1 .1z"></path>
            </svg>
          </Box>
          <Link href="/templates" prefetch>
            <a>
              <Button
                fontSize="2xl"
                minW="7.5rem"
                w="16rem"
                h={14}
                bg="gray.900"
                color="gray.50"
                _hover={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.500' }}
              >
                Start for Free
              </Button>
            </a>
          </Link>
        </Box>
      </Box>
      <Box w="100%" d="flex" justifyContent="center" pb="6rem" pt="-1rem">
        <Text
          as="h2"
          d="flex"
          fontSize="20px"
          fontWeight="semibold"
          color="gray.400"
          w={['90%', '60%']}
          textAlign={['justify', 'center']}
        >
          Antfolio combines the best website building experience with an
          obsessive focus on simplicity. Our platform enables anyone to create
          beautiful websites without any code knowledge.
        </Text>
      </Box>
    </Box>
  )
}

export default Hero
