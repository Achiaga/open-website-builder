import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserProvider, useUser } from '@auth0/nextjs-auth0'
import { getSessionData } from '../helpers/transport'
import { Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import CustomSpinner from '../components/custom-spinner'

const ResultsWrapper = () => {
  const router = useRouter()
  const { user } = useUser()
  const [data, setData] = useState(null)

  const sessionId = router.query.session_id

  async function redirectLogout(host) {
    try {
      await fetch(
        `/api/auth/logout?returnTo=${encodeURIComponent(
          `https${host}/dashboard`
        )}&client_id=ho7QSqXJ76ZpWkIkxvGunzq9fmVaD4ac`
      )
      router.push('/dashboard')
    } catch (err) {
      console.error('error', err)
    }
  }
  useEffect(() => {
    sessionId &&
      user &&
      getSessionData(sessionId || null, user)
        .then((data) => setData(data))
        .catch((err) => console.error('something went wrong', err))
  }, [sessionId, user])
  useEffect(() => {
    const host = window?.location?.host
    redirectLogout(host)
  }, [data])

  return (
    <>
      <Image
        pos="absolute"
        w="100vw"
        h="100vh"
        objectFit="cover"
        src="/confetti.png"
        alt="Celebration confetti"
        top="0"
        left="0"
      />

      <Box
        w="100vw"
        h="100vh"
        d="flex"
        justifyContent="center"
        alignItems="center"
        bg="linear-gradient(260.35deg, rgba(67, 226, 142, 0.2) 0%, rgba(80, 107, 240, 0.2) 100%);"
      >
        <Box
          bg="white"
          p="3rem"
          borderRadius="2rem"
          zIndex="1"
          pos="relative"
          mt="-10rem"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="4xl" d="flex">
            Adding{' '}
            <Text fontWeight="bold" color="primary.500" px="8px">
              Superpowers
            </Text>{' '}
            to your account 🥳
          </Text>
          <Box>
            <CustomSpinner />
            <Text w="100%" textAlign="center" color="primary.400">
              {data ? 'Redirecting to Dashboard...' : 'Working hard...'}
            </Text>
          </Box>

          <Image
            src="/Rocket.png"
            width="200px"
            heigh="200px"
            pos="absolute"
            bottom="-60%"
            left="50%"
            transform="translateX(-50%) rotate(45deg)"
          />
        </Box>
      </Box>
    </>
  )
}

const ResultPage = () => {
  return (
    <UserProvider>
      <ResultsWrapper />
    </UserProvider>
  )
}

export default ResultPage
