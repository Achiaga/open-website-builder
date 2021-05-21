import { UserProvider } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'

const PricingPage = dynamic(() => import('../src/components/pricing'))

const Pricing = () => {
  return (
    <UserProvider>
      <PricingPage />
    </UserProvider>
  )
}

export default Pricing
