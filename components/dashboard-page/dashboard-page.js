import { Box } from '@chakra-ui/react'
import Sidebar from './sidebar'
import Projects from './projects'
import Settings from './settings'
import { settings } from './routesVariables'
import { useUser } from '@auth0/nextjs-auth0'
import { useEffect, useState } from 'react'
import { requestUser } from '../../utils/user-data'

const SelectedDashboard = ({ dashboardType, ...props }) => {
  if (dashboardType === settings) return <Settings />
  return <Projects {...props} />
}

const Dashboard = ({ dashboardType }) => {
  const { user, isLoading } = useUser()

  const [userWebsites, setUserWebsites] = useState()
  // const redirectLogo = () => {
  //   router.push('/')
  // }

  // const handleEditTemplate = (id) => {
  //   router.push(`/builder?template=${id}`)
  // }

  // const handlePreviewTemplate = (id) => {
  //   router.push(`/preview/template/${id}`)
  // }

  async function getUser() {
    const { websitesData } = await requestUser(user.sub)
    console.log(websitesData)
    setUserWebsites(websitesData)
  }

  useEffect(() => {
    user && getUser()
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
          userWebsites={userWebsites}
        />
      </Box>
    </Box>
  )
}

export default Dashboard
