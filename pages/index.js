import { UserProvider } from '@auth0/nextjs-auth0'
import { ResumeWebsite } from '../builder/web-preview/preview'
import LandingPage from '../components/landing-page'
import { getWebsiteDataBySubdomain } from './api/db'
import { isFalsy } from './[resumeId]'
export default function Home({ websiteData, subdomain }) {
  if (websiteData && subdomain) {
    return <ResumeWebsite userBlocksData={websiteData} websiteId={subdomain} />
  }
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  )
}

export async function getServerSideProps(context) {
  const isLocal = process.env.NODE_ENV === 'development'

  const host = context.req.headers.host
  const hasSubdomain =
    host.split('.').length > 2 || (isLocal && host.split('.').length > 1)
  const subdomain = host.split('.')[0]

  if (!hasSubdomain) return { props: {} }
  try {
    if (isFalsy(subdomain)) return { props: {} }
    const { websiteData, isPublish } = await getWebsiteDataBySubdomain(
      subdomain
    )
    if (!isPublish) return { props: { isPublish } }
    return { props: { websiteData, isPublish, subdomain } }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}
