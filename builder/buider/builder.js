import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

import { WebBuilder } from '../web-builder'
import { BuilderSidebar } from '../sidebar'
import { getBuilderData, getIsLoadingData } from '../../features/builderSlice'
import { SettingsBar } from '../sidebar/settingsBar'
import MobileVersion from '../web-builder/mobile-version'
import { loadInitialData } from '../../features/builderSlice'

import { MobileWrapper } from './components'

function getParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const template = urlParams.get('template')
  const origin = urlParams.get('origin')
  return { template, origin }
}

const Builder = () => {
  const userBlocksData = useSelector(getBuilderData)
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
  console.log(user)
  if (!userBlocksData || isLoadingData) {
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
  return (
    <>
      <Box
        d={['none', 'flex']}
        m="auto"
        flexDir="row"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        height="500vw"
      >
        <SettingsBar />
        <BuilderSidebar />
        <MobileWrapper>
          <WebBuilder />
        </MobileWrapper>
      </Box>
      <MobileVersion />
    </>
  )
}

export default Builder
