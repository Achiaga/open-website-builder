import { UserProvider } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { ResumeWebsite } from '../builder/web-preview/preview'
import LandingPage from '../landing'
import { getWebsiteDataBySubdomain } from './api/db'
import { isFalsy, hasFlurlyLink } from './[resumeId]'

export default function Home({ websiteData, subdomain }) {
  if (websiteData && subdomain) {
    const hasFlurly = hasFlurlyLink(websiteData.blocks)
    return (
      <>
        {hasFlurly && (
          <Head>
            <script src="https://js.stripe.com/v3/"></script>
            <script src="https://flurly.com/flurly-checkout.js"></script>
          </Head>
        )}
        <ResumeWebsite userBlocksData={websiteData} projectId={subdomain} />
      </>
    )
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
