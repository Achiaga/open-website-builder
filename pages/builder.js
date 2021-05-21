import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'
const Builder = dynamic(() =>
  import('../src/builder').then((mod) => mod.Builder)
)

const BuilderPage = () => {
  return (
    <UserProvider>
      <Head>
        <title>Antfolio - Builder</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app/builder" />
        <meta
          name="description"
          content="Antfolio's website builder. Create a simple, easy, beautiful no-code website in minutes with our drag and drop functionality"
        ></meta>
      </Head>
      <Builder />
    </UserProvider>
  )
}

export default BuilderPage
