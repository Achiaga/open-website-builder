import ResumeWebsite from '../../../src/preview/web-preview/preview'
import { denormalizeBuilderData } from '../../../src/features/builderSlice'
import dynamic from 'next/dynamic'
const templates = dynamic(() => import('../../../templates'))

function TemplatePreview(blocksData) {
  if (!blocksData) return <div>Looks like this template does not exists</div>
  return <ResumeWebsite userBlocksData={blocksData} />
}

// This function gets called at build time
// This gets called on every request
export async function getServerSideProps(context) {
  const { templateId } = context.query
  return { props: denormalizeBuilderData(templates[templateId]) }
}

export default TemplatePreview
