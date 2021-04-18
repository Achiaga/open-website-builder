import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAccountCreated,
  getBuilderDevice,
  setBuilderDevice,
  getTempDBData,
  publishWebsite,
  getPublishStatus,
} from '../features/builderSlice'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import PublishSuccessModal from './publishModal'
import Card from './card'
import SaveButton from './saveButton'
import AccountCreatedModal from './accountCreatedModal'
import OverwriteDBWarning from './overwriteDBWarning'
import { Spinner } from '@chakra-ui/spinner'

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
  const accountCreated = useSelector(getAccountCreated)
  const tempData = useSelector(getTempDBData)
  const publishStatus = useSelector(getPublishStatus)

  const builderDevice = useSelector(getBuilderDevice)
  const router = useRouter()
  const [isMenuOpen, setMenuOpen] = useState(false)

  function handleLogin() {
    router.push('/api/auth/custom-login')
  }
  function handleLogout() {
    router.push(`/api/auth/logout?returnTo=${encodeURIComponent(logoutUrl)}`)
  }
  async function handlePublish() {
    if (user) {
      await dispatch(publishWebsite(user))
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
      {publishStatus === 'success' && <PublishSuccessModal />}
      {accountCreated && <AccountCreatedModal />}
      {tempData && <OverwriteDBWarning />}
      <SaveButton />
      <Box w="full">
        <Card alignItems="center" onClick={handleMenuOption}>
          <IoMenu size={24} />
        </Card>
        {isMenuOpen && (
          <Box
            pos="absolute"
            d="flex"
            flexDir="column"
            bg="white"
            borderRadius="10px"
            boxShadow="0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)"
          >
            <Box>
              <a href="/preview" target="_blank">
                <MenuItem>Preview</MenuItem>
              </a>

              <MenuItem onClick={handleMobileVersion}>
                {builderDevice === 'mobile' ? 'Desktop' : 'Mobile'}
              </MenuItem>
            </Box>
            {user ? (
              <Box>
                <MenuItem onClick={handlePublish}>
                  {publishStatus === 'loading' ? <Spinner /> : 'Publish'}
                </MenuItem>
                <Link href="/dashboard" passHref>
                  <MenuItem>
                    <a>Dashboard</a>
                  </MenuItem>
                </Link>
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
