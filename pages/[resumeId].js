import { ResumeWebsite } from '../builder/web-preview/preview'

import { getWebsiteData } from './api/db'

function isFalshy(resumeId) {
  return !resumeId || resumeId === 'undefined' || resumeId === 'null'
}

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function Resume(resumeData) {
  console.log('resumeData', resumeData)
  if (isEmpty(resumeData)) return <div>upsy nothing to see here</div>
  if (!resumeData.isPublish) return <div>Something is comming</div>
  return <ResumeWebsite userBlocksData={resumeData} />
}

export async function getServerSideProps(context) {
  const { resumeId } = context.query
  try {
    if (isFalshy(resumeId)) return { props: {} }
    const { websiteData, isPublish } = await getWebsiteData(resumeId)
    if (!isPublish) return { props: { isPublish } }
    return { props: websiteData }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}
export default Resume
