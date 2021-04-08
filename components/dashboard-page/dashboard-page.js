import { Box } from '@chakra-ui/react'
import Sidebar from './sidebar'
import Projects from './projects'
import Settings from './settings'
import { settings } from './routesVariables'
import { useUser } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'
import { loadUserInitialData, getUserProjects } from '../../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const SelectedDashboard = ({ dashboardType, ...props }) => {
  if (dashboardType === settings) return <Settings />
  return <Projects {...props} />
}

const Dashboard = ({ dashboardType }) => {
  const { user } = useUser()
  const dispatch = useDispatch()
  const userProjects = useSelector(getUserProjects)

  useEffect(() => {
    user && dispatch(loadUserInitialData(user.sub))
  }, [user])

  return (
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
        minHeight="100vh"
        height="full"
      >
        <SelectedDashboard
          dashboardType={dashboardType}
          userWebsites={userProjects}
        />
      </Box>
    </Box>
  )
}

export default Dashboard
