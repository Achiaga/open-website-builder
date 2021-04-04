import DashboardPage from '../../components/dashboard-page'

function Dashboard({ dashboardType }) {
  return <DashboardPage dashboardType={dashboardType} />
}

// // This function gets called at build time
// // This gets called on every request
export async function getServerSideProps(context) {
  const { dashboardType } = context.query
  return { props: { dashboardType } }
}

export default Dashboard
