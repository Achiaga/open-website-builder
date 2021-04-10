import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { InitializeAnalytics } from '../utils/analytics'
import { Builder } from '../builder'

const BuilderPage = () => {
  useEffect(() => {
    try {
      InitializeAnalytics()
    } catch (err) {
      console.error(err)
    }
  }, [])
  return (
    <UserProvider>
      <Builder />
    </UserProvider>
  )
}

export default BuilderPage
