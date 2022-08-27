import { ResumeWebsite } from '../builder/web-preview/preview'
import ECommerceExtensions from '../components/integrations/ECommerceExtensions'
import LandingPage from '../landing'
import { getWebsiteDataBySubdomain } from './api/db'
import { isFalsy } from './[resumeId]'

export default function Home({ websiteData, subdomain }) {
  if (websiteData && subdomain) {
    return (
      <>
        <ECommerceExtensions blocks={websiteData.blocks} />
        <ResumeWebsite userBlocksData={websiteData} projectId={subdomain} />
      </>
    )
  }
  return <LandingPage />
}

export async function getServerSideProps(context) {
  // eslint-disable-next-line no-undef
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
