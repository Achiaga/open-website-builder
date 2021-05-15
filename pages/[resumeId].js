import { ResumeWebsite } from '../builder/web-preview/preview'
import ErrorPage from '../components/error-page'
import NewPage from '../components/not-deploy-page'

import { getWebsiteData } from './api/db'

function isFlashy(resumeId) {
  return !resumeId || resumeId === 'undefined' || resumeId === 'null'
}

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function Resume({ websiteData, isPublish, resumeId }) {
  if (isEmpty(websiteData)) return <ErrorPage />
  if (!isPublish) return <NewPage />

  return <ResumeWebsite userBlocksData={websiteData} websiteId={resumeId} />
}

export async function getServerSideProps(context) {
  const { resumeId } = context.query
  try {
    if (isFlashy(resumeId)) return { props: {} }
    const { websiteData, isPublish } = await getWebsiteData(resumeId)
    if (!isPublish) return { props: { isPublish } }
    return { props: { websiteData, isPublish, resumeId } }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}
export default Resume
