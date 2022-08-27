import { ResumeWebsite } from '../builder/web-preview/preview'
import ErrorPage from '../components/error-page'
import ECommerceExtensions from '../components/integrations/ECommerceExtensions'
import NewPage from '../components/not-deploy-page'

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

function Resume({ websiteData, isPublish, resumeId }) {
  if (isEmpty(websiteData)) return <ErrorPage />
  if (!isPublish) return <NewPage />

  return (
    <>
      <ECommerceExtensions blocks={websiteData.blocks} />
      <ResumeWebsite
        userBlocksData={websiteData}
        projectId={resumeId}
        pageLoad
      />
    </>
  )
}

export default Resume
