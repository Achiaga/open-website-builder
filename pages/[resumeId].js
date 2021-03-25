import { ResumeWebsite } from '../builder/web-preview/preview'

import { getResumeById } from '../utils/user-data'

function isEmpty(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function Resume(resumeData) {
  if (isEmpty(resumeData)) return <div>upsy nothing to see here</div>
  return <ResumeWebsite userBlocksData={resumeData} />
}

// This function gets called at build time
// This gets called on every request
export async function getServerSideProps(context) {
  const { resumeId } = context.query
  let resumeData
  try {
    resumeData = await getResumeById(resumeId)
  } catch (err) {
    console.error(err)
    return { props: {} }
  }

  return { props: resumeData }
}

export default Resume
