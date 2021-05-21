import { UserProvider } from '@auth0/nextjs-auth0'
import DashboardPage from '../../src/components/dashboard-page'

function Dashboard() {
  return (
    <UserProvider>
      <DashboardPage />
    </UserProvider>
  )
}

export default Dashboard
