import Articles from '../../articles'

const Blog = ({ articleId }) => {
  const Article = Articles[articleId]
  return <Article />
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { articleId: 'top-100-website-builder-comparison' } }],
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
