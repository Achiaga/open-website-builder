import { ResumeWebsite } from '../builder/web-preview/preview'

import { getResumeById } from '../utils/user-data'

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function Resume(resumeData) {
  if (isEmpty(resumeData)) return <div>upsy nothing to see here</div>
  return <ResumeWebsite userBlocksData={resumeData} />
}

export async function getServerSideProps(context) {
  const { resumeId } = context.query
  try {
    const websiteData = await getResumeById(resumeId)
    console.log({ websiteData })
    return { props: websiteData }
  } catch (err) {
    console.error(err)
    return { props: {} }
  }
}
export default Resume
