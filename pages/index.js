import { UserProvider } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'

import { getWebsiteDataBySubdomain } from './api/db'

export function isFalsy(resumeId) {
  return !resumeId || resumeId === 'undefined' || resumeId === 'null'
}

const Website = ({ websiteData, subdomain }) => {
  const ResumeWebsite = dynamic(() => import('../builder/web-preview/preview'))
  return <ResumeWebsite userBlocksData={websiteData} projectId={subdomain} />
}

const LandingPageWrapper = () => {
  const LandingPage = dynamic(() => import('../components/landing-page'))
  return (
    <UserProvider>
      <LandingPage />
    </UserProvider>
  )
}

function Home({ websiteData, subdomain }) {
  if (websiteData && subdomain) {
    return <Website websiteData={websiteData} subdomain={subdomain} />
  }
  return <LandingPageWrapper />
}

export default Home

export async function getServerSideProps(context) {
  const isLocal = process.env.NODE_ENV === 'development'

  const host = context.req.headers.host
  const splittedHost = host.split('.')
  const hasSubdomain =
    splittedHost.length > 2 || (isLocal && splittedHost.length > 1)
  const subdomain = splittedHost[0]

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
