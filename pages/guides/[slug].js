import { guides } from '../../articles'
import { ResumeWebsite } from '../../builder/web-preview/preview'
import { denormalizeBuilderData } from '../../features/builderSlice'

const Blog = ({ slug }) => {
  const guideBlockData = guides[slug]
  return (
    <ResumeWebsite userBlocksData={denormalizeBuilderData(guideBlockData)} />
  )
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'guides-custom-domain' } },
      { params: { slug: 'guides-integration-flurly' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
      ...params,
    },
  }
}

export default Blog
