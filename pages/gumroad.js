import { UserProvider } from '@auth0/nextjs-auth0'
import { useEffect } from 'react'
import GumroadLandingPage from '../gumroad-landing'

export default function Gumroad() {
  useEffect(() => {
    localStorage.setItem('isGumroad', true)
  }, [])
  return (
    <UserProvider>
      <GumroadLandingPage />
    </UserProvider>
  )
}
