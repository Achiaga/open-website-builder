import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { publishResume } from '../utils/user-data'
import { Box, Text } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { getBuilderData, getResumeId } from '../features/builderSlice'
import { saveData } from './helpers'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import Fireworks from '../components/fireworks'

const PublishSuccessModal = ({ setPublish }) => {
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
      onClick={() => setPublish(false)}
    >
      <Box
        maxWidth="60vw"
        bg="white"
        p="4rem"
        px="6.5rem"
        borderRadius="10px"
        box-shadow="0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)"
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          color="primary.500"
          fontFamily="Montserrat"
          paddingBottom={'2'}
          mb="1rem"
          textAlign="center"
          d="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="h1" fontWeight="bold" fontSize={'40px'}>
            Congratulations! 🎉
          </Text>
          <Text
            as="span"
            fontSize={'35px'}
            textAlign="center"
            pt="6"
            color="black"
            d="flex"
            fontWeight="semibold"
          >
            Your Portfolio/Resume is now
          </Text>
          <Text
            as="span"
            fontSize={'35px'}
            textAlign="center"
            color="black"
            d="flex"
            pb="3"
            fontWeight="bold"
          >
            <Text color="green.500" ml="0.75rem">
              Published
            </Text>
          </Text>
          <Text as="span" fontSize={'35px'}>
            🥳 🚀 ✨
          </Text>
        </Box>
        <Text
          as="h3"
          color="black"
          fontFamily="Montserrat"
          fontSize={'24px'}
          paddingBottom={'3'}
          fontWeight="semibold"
        >
          This is your resume Url:
        </Text>
        <Text
          as="h3"
          color="black"
          fontFamily="Montserrat"
          fontSize={'20px'}
          cursor="pointer"
          paddingBottom={'4'}
        >
          - https://www.yourUrl.antfolio.app
        </Text>
        <Text
          as="h3"
          color="black"
          fontFamily="Montserrat"
          fontSize={'20px'}
          paddingBottom={'0'}
        >
          - Change it on your settings{' '}
          <Link href="/">
            <Text
              as="u"
              cursor="pointer"
              color="primary.500"
              fontWeight="semibold"
            >
              here
            </Text>
          </Link>
        </Text>
      </Box>
      <Fireworks />
    </Box>
  )
}

const Card = ({ children, ...props }) => {
  return (
    <Button
      d="flex"
      w="fit-content"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow="0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)"
      border="1px solid transparent"
      borderRadius="10px"
      backgroundColor="#ffffff42"
      cursor="pointer"
      mb="0.5rem"
      pos="relative"
      width="4.35rem"
      _hover={{
        bg: 'white',
        border: '1px solid black',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

function Login() {
  const { user, error, isLoading } = useUser()
  const builderData = useSelector(getBuilderData)
  const resumeId = useSelector(getResumeId)
  const router = useRouter()
  const [isPublish, setPublish] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  function handleSavePage() {
    if (user) return saveData({ user, resumeId, builderData })
    return router.push('/api/auth/custom-login')
  }

  function handleLogin() {
    router.push('/api/auth/custom-login')
  }
  function handleLogout() {
    router.push('/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com')
  }
  function handlePublish() {
    setPublish(true)
    setMenuOpen(false)
  }

  function handleMenuOption() {
    setMenuOpen((open) => !open)
  }

  return (
    <Box d="flex" flexDir="column">
      {isPublish && <PublishSuccessModal setPublish={setPublish} />}
      <Card onClick={handleSavePage} fontSize="md">
        Save
      </Card>
      <Box w="full">
        <Card onClick={handleMenuOption}>
          <IoMenu size={24} />
        </Card>
        {isMenuOpen && (
          <Box
            pos="absolute"
            mt="16px"
            d="flex"
            flexDir="column"
            top="30px"
            bg="white"
          >
            <a href="/preview" target="_blank">
              <Button variant="ghost" colorScheme="teal" fontSize="sm" w="100%">
                Preview
              </Button>
            </a>
            <Button
              onClick={handlePublish}
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
            >
              Publish
            </Button>
            <Button variant="ghost" colorScheme="teal" fontSize="sm">
              Settings
            </Button>
            <Button
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
              onClick={handleLogout}
            >
              Resume Url
            </Button>
          </Box>
        )}
      </Box>

      {/* <Button>
        <a href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com">
          logout
        </a>
      </Button> */}
    </Box>
  )
}

export default Login
