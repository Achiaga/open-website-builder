import { ResumeWebsite } from '../builder/web-preview/preview'

import data from '../mock.json'

function Resume({ data }) {
	return <ResumeWebsite userBlocksData={data} />
}

// This function gets called at build time
// This gets called on every request
export async function getServerSideProps() {
	return { props: { data } }
}

export default Resume
