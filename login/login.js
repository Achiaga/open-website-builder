import Link from 'next/link'
import { Box } from '@chakra-ui/layout'
import { useDispatch, useSelector } from 'react-redux'
import { GiSmartphone } from 'react-icons/gi'
import {
  getAccountCreated,
  getBuilderDevice,
  setBuilderDevice,
  getTempDBData,
  getPublishStatus,
  setInitialBuilderData,
  getBuilderData,
} from '../features/builderSlice'
import { IoMenu } from 'react-icons/io5'
import { useState } from 'react'
import { Button } from '@chakra-ui/button'
import PublishSuccessModal from './publishModal'
import Card from './card'
import AccountCreatedModal from './accountCreatedModal'
import OverwriteDBWarning from './overwriteDBWarning'
import { removeLocalData } from '../builder/web-builder/helpers'
import templates from '../templates'

// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV === 'development'

export const logoutUrl = isDev
  ? 'http://localhost:3000'
  : 'https://antfolio.app'

const MenuItem = ({ children, onClick = () => {}, warning }) => {
  return (
    <Button
      variant="ghost"
      colorScheme={warning ? 'crimson' : 'primary'}
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
  const dispatch = useDispatch()
  const accountCreated = useSelector(getAccountCreated)
  const tempData = useSelector(getTempDBData)
  const publishStatus = useSelector(getPublishStatus)
  const websiteData = useSelector(getBuilderData)
  const builderDevice = useSelector(getBuilderDevice)
  const [isMenuOpen, setMenuOpen] = useState(false)

  function downloadData() {
    var dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(websiteData))
    var downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'test' + '.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  function handleMenuOption() {
    setMenuOpen((open) => !open)
  }
  function handleMobileVersion() {
    dispatch(
      setBuilderDevice(builderDevice === 'mobile' ? 'desktop' : 'mobile')
    )
  }
  function handleRemove() {
    removeLocalData().then(() => {
      dispatch(setInitialBuilderData(templates.fallback))
    })
  }

  return (
    <Box d="flex" flexDir="column">
      {publishStatus === 'success' && <PublishSuccessModal />}
      {accountCreated && <AccountCreatedModal />}
      {tempData && <OverwriteDBWarning />}
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
            <MenuItem onClick={handleMobileVersion}>
              {builderDevice === 'mobile' ? (
                'Desktop View'
              ) : (
                <Box d="flex" justifyContent="space-between">
                  <GiSmartphone /> Mobile View
                </Box>
              )}
            </MenuItem>
            <Box borderBottom="1px solid" borderColor="gray.200" />
            <Box>
              <a href="/preview" target="_blank">
                <MenuItem>Preview</MenuItem>
              </a>
              <Box borderBottom="1px solid" borderColor="gray.200" />
              <Link href="/templates">
                <a>
                  <MenuItem>Templates</MenuItem>
                </a>
              </Link>
            </Box>
            <Box>
              <Box borderBottom="1px solid" borderColor="gray.200" />
              <MenuItem onClick={handleRemove} warning>
                Clear Builder
              </MenuItem>
            </Box>
            {isDev && (
              <>
                <MenuItem onClick={downloadData}>Download Data</MenuItem>
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}
