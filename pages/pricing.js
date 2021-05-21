import { UserProvider } from '@auth0/nextjs-auth0'
import PricingPage from '../src/components/pricing'

const TemplatePage = () => {
  return (
    <UserProvider>
      <PricingPage />
    </UserProvider>
  )
}

export default TemplatePage
