import GumroadTemplatePage from '../../components/gumroad-template-page'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function Templates() {
  return (
    <UserProvider>
      <GumroadTemplatePage />
    </UserProvider>
  )
}
