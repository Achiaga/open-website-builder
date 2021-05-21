import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

import {
  getHasBuilderData,
  getIsLoadingData,
} from '../../features/builderSlice'
import { loadInitialData } from '../../features/builderSlice'

import dynamic from 'next/dynamic'

const WebBuilder = dynamic(() => import('../web-builder/web-builder'))
const MobileVersion = dynamic(() => import('../web-builder/mobile-version'))
const MobileWrapper = dynamic(() =>
  import('./components').then((mod) => mod.MobileWrapper)
)
const BuilderSidebar = dynamic(() =>
  import('../sidebar').then((mod) => mod.BuilderSidebar)
)
const SettingsBar = dynamic(() =>
  import('../sidebar/settingsBar').then((mod) => mod.SettingsBar)
)

function getParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const template = urlParams.get('template')
  const origin = urlParams.get('origin')
  return { template, origin }
}

const Loader = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" thickness="4px" color="primary.500" speed="0.65s" />
    </Box>
  )
}

const Builder = () => {
  const hasBuilderData = useSelector(getHasBuilderData)
  const isLoadingData = useSelector(getIsLoadingData)
  const router = useRouter()
  const { user, isLoading } = useUser()
  const dispatch = useDispatch()
  function confirmExit() {
    return ''
  }

  function loadData() {
    const params = getParams()
    dispatch(loadInitialData(user, params))
  }
  function removeURLQuery() {
    router.push(
      {
        pathname: '/builder',
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    if (user) {
      window.onbeforeunload = confirmExit
    }
  }, [user])

  useEffect(() => {
    if (!isLoading) {
      loadData()
      removeURLQuery()
    }
  }, [isLoading])

  return (
    <>
      <Box
        d={['none', 'flex']}
        m="auto"
        flexDir="row"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        height="1000vh"
      >
        <SettingsBar />
        <BuilderSidebar />
        {!hasBuilderData || isLoadingData ? (
          <Loader />
        ) : (
          <MobileWrapper>
            <WebBuilder />
          </MobileWrapper>
        )}
      </Box>
      <MobileVersion />
    </>
  )
}

export default Builder
