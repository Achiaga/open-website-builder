import { Box } from '@chakra-ui/react'
import Sidebar from './sidebar'
import Projects from './projects'
import Settings from './settings'
import { defaultRoute, projects, settings } from './routesVariables'

const Dashboard = ({ dashboardType }) => {
  // const redirectLogo = () => {
  //   router.push('/')
  // }

  // const handleEditTemplate = (id) => {
  //   router.push(`/builder?template=${id}`)
  // }

  // const handlePreviewTemplate = (id) => {
  //   router.push(`/preview/template/${id}`)
  // }
  function DashboardSelection() {
    switch (dashboardType) {
      case defaultRoute:
        return <Projects />
      case projects:
        return <Projects />
      case settings:
        return <Settings />
      default:
        return <Projects />
    }
  }

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
        <DashboardSelection />
      </Box>
    </Box>
  )
}

export default Dashboard
