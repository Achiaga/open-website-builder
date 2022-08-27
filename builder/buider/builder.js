import { useSelector } from 'react-redux'
import { Box, Spinner } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { WebBuilder } from '../web-builder'
import { BuilderSidebar } from '../sidebar'
import {
  getHasBuilderData,
  getIsLoadingData,
} from '../../features/builderSlice'
import MobileVersion from '../web-builder/mobile-version'
import { SettingsBar } from '../sidebar/settingsBar'

import { loadInitialData } from '../../features/builderSlice'

import { MobileWrapper } from './components'

function getParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const template = urlParams.get('template')
  const origin = urlParams.get('origin')
  const projectId = urlParams.get('project')
  return { template, origin, projectId }
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
  const dispatch = useDispatch()

  function loadData() {
    const params = getParams()
    dispatch(loadInitialData(false, params))
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
    return (window.onbeforeunload = '')
  }, [])

  useEffect(() => {
    loadData()
    removeURLQuery()
  }, [])

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
