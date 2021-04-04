import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import Sidebar from './sidebar'
import Projects from './projects'

const Dashboard = () => {
  const router = useRouter()

  // const redirectLogo = () => {
  //   router.push('/')
  // }

  // const handleEditTemplate = (id) => {
  //   router.push(`/builder?template=${id}`)
  // }

  // const handlePreviewTemplate = (id) => {
  //   router.push(`/preview/template/${id}`)
  // }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="full"
      height="full"
      minHeight="100vh"
    >
      <Sidebar />
      <Box
        width="full"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        minHeight="100vh"
        height="full"
      >
        <Projects />
      </Box>
    </Box>
  )
}

export default Dashboard
