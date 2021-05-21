import { Box, Spinner } from '@chakra-ui/react'
import Sidebar from './sidebar'
import Projects from './project'
import Settings from './settings'
import { settings } from './routesVariables'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'
import { loadUserInitialData } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
import Head from 'next/head'

const SelectedDashboard = ({ dashboardType, ...props }) => {
  if (dashboardType === settings) return <Settings />
  return <Projects {...props} />
}

const Dashboard = ({ dashboardType }) => {
  const { user } = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    user && dispatch(loadUserInitialData(user.sub))
  }, [user])

  if (!user) {
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
      <Head>
        <title>Antfolio - Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="full"
        height="full"
        minHeight="100vh"
      >
        <Sidebar dashboardType={dashboardType} />
        <Box
          width="full"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          height="100vh"
          overflowY="scroll"
        >
          <SelectedDashboard dashboardType={dashboardType} user={user} />
        </Box>
      </Box>
    </>
  )
}

export default withPageAuthRequired(Dashboard)
