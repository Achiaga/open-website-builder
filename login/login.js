import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAccountCreated,
  getBuilderData,
  getBuilderDevice,
  setBuilderDevice,
  getTempDBData,
} from '../features/builderSlice'
import { saveData } from './helpers'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import PublishSuccessModal from './publishModal'
import Card from './card'
import SaveButton from './saveButton'
import AccountCreatedModal from './accountCreatedModal'
import OverwriteDBWarning from './overwriteDBWarning'

const logoutUrl =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:300'
    : 'https://antfolio.app'

const MenuItem = ({ children, onClick = () => {} }) => {
  return (
    <Button
      variant="ghost"
      colorScheme="primary"
      fontSize="sm"
      width="100%"
      justifyContent="start"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export function Login() {
  const { user } = useUser()
  const dispatch = useDispatch()
  const builderData = useSelector(getBuilderData)
  const accountCreated = useSelector(getAccountCreated)
  const tempData = useSelector(getTempDBData)

  const builderDevice = useSelector(getBuilderDevice)
  const router = useRouter()
  const [isPublish, setPublish] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  function handleLogin() {
    router.push('/api/auth/custom-login')
  }
  function handleLogout() {
    router.push(`/api/auth/logout?returnTo=${encodeURIComponent(logoutUrl)}`)
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
      {accountCreated && <AccountCreatedModal />}
      {tempData && <OverwriteDBWarning />}
      <SaveButton />
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
            <Box>
              <MenuItem>
                <a href="/preview" target="_blank">
                  Preview
                </a>
              </MenuItem>

              <MenuItem onClick={handleMobileVersion}>
                {builderDevice === 'mobile' ? 'Desktop' : 'Mobile'}
              </MenuItem>
            </Box>
            {user ? (
              <Box>
                <MenuItem onClick={handlePublish}>Publish</MenuItem>
                <MenuItem>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Box>
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
