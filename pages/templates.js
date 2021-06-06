import TemplatePage from '../components/template-page'
import { UserProvider } from '@auth0/nextjs-auth0'

export default function Templates() {
  return (
    <UserProvider>
      <TemplatePage />
    </UserProvider>
  )
}
