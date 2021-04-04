import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBuilderData,
  getBuilderDevice,
  setBuilderDevice,
} from '../features/builderSlice'
import { saveData } from './helpers'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import PublishSuccessModal from './publishModal'
import Card from './card'

function Login() {
  const { user } = useUser()
  const dispatch = useDispatch()
  const builderData = useSelector(getBuilderData)
  const builderDevice = useSelector(getBuilderDevice)
  const router = useRouter()
  const [isPublish, setPublish] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  function handleSavePage() {
    if (user) {
      return saveData({ user, builderData })
    }
    return router.push('/api/auth/custom-login')
  }

  function handleLogin() {
    router.push('/api/auth/custom-login')
  }
  function handleLogout() {
    router.push('/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com')
  }
  async function handlePublish() {
    if (user) {
      await saveData({ user, builderData, publish: true })
      setPublish(true)
      setMenuOpen(false)
      return
    }
    return router.push('/api/auth/custom-login')
  }

  function handleMenuOption() {
    setMenuOpen((open) => !open)
  }
  function handleMobileVersion() {
    dispatch(
      setBuilderDevice(builderDevice === 'mobile' ? 'desktop' : 'mobile')
    )
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
            d="flex"
            flexDir="column"
            bg="white"
            borderRadius="10px"
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
            <Button
              onClick={handleMobileVersion}
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
            >
              {builderDevice === 'mobile' ? 'Desktop' : 'Mobile'}
            </Button>

            <Button variant="ghost" colorScheme="teal" fontSize="sm">
              Settings
            </Button>
            <Button
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="ghost"
              colorScheme="teal"
              fontSize="sm"
              onClick={handleLogout}
            >
              Resume Url
            </Button>
            <Button>
              <a href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com">
                logout
              </a>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Login
