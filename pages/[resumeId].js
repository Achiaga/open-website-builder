import Head from 'next/head'
import { ResumeWebsite } from '../builder/web-preview/preview'
import ErrorPage from '../components/error-page'
import NewPage from '../components/not-deploy-page'

import { getWebsiteData } from './api/db'

export function getSubdomain(req) {
  let host
  let sub
  if (req && req.headers.host) {
    host = req.headers.host
  }
  if (typeof window !== 'undefined') {
    host = window.location.host
  }
  if (host) {
    sub = host.split('localhost:3000')[0]
    if (sub) {
      return sub.split('.')[0]
    }
  }
}

export function isFalsy(resumeId) {
  return !resumeId || resumeId === 'undefined' || resumeId === 'null'
}

export function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export function hasFlurlyLink(blocks) {
  return JSON.stringify(blocks).includes('https://flurly.com')
}

function Resume({ websiteData, isPublish, resumeId }) {
  if (isEmpty(websiteData)) return <ErrorPage />
  if (!isPublish) return <NewPage />

  const hasFlurly = hasFlurlyLink(websiteData.blocks)
  return (
    <>
      {hasFlurly && (
        <Head>
          <script src="https://js.stripe.com/v3/"></script>
          <script src="https://flurly.com/flurly-checkout.js"></script>
        </Head>
      )}
      <ResumeWebsite
        userBlocksData={websiteData}
        projectId={resumeId}
        pageLoad
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const { resumeId } = context.query
  try {
    if (isFalsy(resumeId)) return { props: {} }
    const { websiteData, isPublish } = await getWebsiteData(resumeId)
    if (!isPublish) return { props: { isPublish } }
    return { props: { websiteData, isPublish, resumeId } }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}
export default Resume
