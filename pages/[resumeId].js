import { ResumeWebsite } from '../builder/web-preview/preview'

import data from '../mock.json'
import { getResumeById } from '../utils/user-data'

function Resume(resumeData) {
	return <ResumeWebsite userBlocksData={resumeData} />
}

// This function gets called at build time
// This gets called on every request
export async function getServerSideProps(context) {
	const { resumeId } = context.query
	console.log(context.resolvedUrl)
	let resumeData
	resumeData = await getResumeById(resumeId)
	console.log('resumeData', resumeData[0].resume_data)

	return { props: resumeData[0].resume_data }
}

export default Resume
