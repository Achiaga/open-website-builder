import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { publishResume } from '../utils/user-data'
import Button from '../components/commun/button'
// import { getUserResumeData } from '../pages/builder'
import { Box } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { getBuilderData, getResumeId } from '../features/builderSlice'

function Login() {
  const { user, error, isLoading } = useUser()
  const builderData = useSelector(getBuilderData)
  const resumeId = useSelector(getResumeId)
  const router = useRouter()

  async function saveData() {
    const userData = {
      id: resumeId,
      user_id: user.sub,
      user_email: user.email,
      resume_data: builderData,
    }
    await publishResume(userData)
  }

  function handlePublish() {
    if (user) return saveData()
    return router.push('/api/auth/custom-login')
  }
  function handleSavePage() {
    if (user) return saveData()
    return window.alert('pay you fucking fuck')
  }

  return (
    <Box pos="absolute" l="0" t="0" zIndex="9999">
      <Button onClick={handlePublish}>Publish</Button>
      <Button onClick={handleSavePage}>Save</Button>
      <Button>
        <a href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost:3000.com">
          logout
        </a>
      </Button>
    </Box>
  )
}

export default Login
