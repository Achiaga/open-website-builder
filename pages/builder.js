import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Builder } from '../builder'

const BuilderPage = () => {
  return (
    <UserProvider>
      <Head>
        <meta
          name="google-site-verification"
          content="UadvCpBK-LYrfPuloDtGWCqlJeQKDZUy3XtQH0wOZ8E"
        />
        <title>Antfolio - Build your online portfolio in 15 minutes</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.antfolio.app" />
      </Head>
      <Builder />
    </UserProvider>
  )
}

export default BuilderPage
