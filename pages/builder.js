import { UserProvider } from '@auth0/nextjs-auth0'
import { Builder } from '../builder'

const BuilderPage = () => {
  return (
    <UserProvider>
      <Builder />
    </UserProvider>
  )
}

export default BuilderPage
