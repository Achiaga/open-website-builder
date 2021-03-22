import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { publishResume } from '../utils/user-data'
// import { getUserResumeData } from '../pages/builder'
import { Box } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { getBuilderData, getResumeId } from '../features/builderSlice'
import { saveData } from './helpers'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'

const Card = ({ children }) => {
  return (
    <Box
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
    >
      {children}
    </Box>
  )
}

function Login() {
  const { user, error, isLoading } = useUser()
  const builderData = useSelector(getBuilderData)
  const resumeId = useSelector(getResumeId)
  const router = useRouter()
  const [isMenuOpen, setMenuOpen] = useState(false)

  function handleSavePage() {
    if (user) return saveData({ user, resumeId, builderData })
    return router.push('/api/auth/custom-login')
  }

  function handleLogin() {
    router.push('/api/auth/custom-login')
  }
  function handlePublish() {}

  function handleMenuOption() {
    setMenuOpen((open) => !open)
  }

  return (
    <Box d="flex" cursor="pointer" flexDir="column">
      <Card>
        <Button onClick={handleSavePage} fontSize="md">
          Save
        </Button>
      </Card>
      <Card>
        <Button
          onClick={handleMenuOption}
          variant="ghost"
          colorScheme="teal"
          _focus={{ outline: 'none' }}
        >
          <IoMenu size={24} />
        </Button>
        {isMenuOpen && (
          <Box pos="absolute" mt="8px" d="flex" flexDir="column" top="30px">
            <Button
              onClick={handlePublish}
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
            >
              Publish
            </Button>
            <Button variant="ghost" colorScheme="teal" fontSize="sm">
              Restart
            </Button>
            <Button variant="ghost" colorScheme="teal" fontSize="sm">
              Logout
            </Button>
          </Box>
        )}
      </Card>

      {/* <Button>
        <a href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com">
          logout
        </a>
      </Button> */}
    </Box>
  )
}

export default Login
