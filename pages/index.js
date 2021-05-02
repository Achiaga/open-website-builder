import { UserProvider } from '@auth0/nextjs-auth0'
import LandingPage from '../components/landing-page'

export default function Home() {
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  )
}
