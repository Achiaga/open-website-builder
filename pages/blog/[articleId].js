import Articles from '../../articles'

const Blog = ({ articleId }) => {
  const Article = Articles[articleId]
  return <Article />
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { articleId: 'article-1' } },
      { params: { articleId: 'alternatives-to-card' } },
    ],
    fallback: false, // See the "fallback" section below
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
