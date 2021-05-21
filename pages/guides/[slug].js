import { guides } from '../../articles'
import ResumeWebsite from '../../src/preview/web-preview/preview'
import { denormalizeBuilderData } from '../../src/features/builderSlice'

const Blog = ({ slug }) => {
  const guideBlockData = guides[slug]
  return (
    <ResumeWebsite userBlocksData={denormalizeBuilderData(guideBlockData)} />
  )
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'guides-custom-domain' } }],
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
