import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'
const Builder = dynamic(() => import('../builder').then((mod) => mod.Builder))

const BuilderPage = () => {
  return (
    <UserProvider>
      <Head>
        <title>Antfolio - Builder</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app/builder" />
      </Head>
      <Builder />
    </UserProvider>
  )
}

export default BuilderPage
