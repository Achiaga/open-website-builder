import { ResumeWebsite } from '../../../builder/web-preview/preview'
import { denormalizeBuilderData } from '../../../features/builderSlice'
import templates from '../../../templates'

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
